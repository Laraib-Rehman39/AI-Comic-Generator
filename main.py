from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import urllib.parse
import time
from typing import List, Optional
from database import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    save_comic,
    get_user_comics,
    delete_comic,
    get_database_stats
)
from email_service import (
    generate_otp,
    send_verification_email,
    store_otp,
    verify_otp,
    is_email_verified,
    clear_otp
)

app = FastAPI(title="AI Comic Generator Backend")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class ComicRequest(BaseModel):
    story: str
    panels: int = 4
    user_id: Optional[int] = None  

class Panel(BaseModel):
    id: int
    imageUrl: str

class ComicResponse(BaseModel):
    success: bool
    panels: List[Panel]

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class VerifyOTPRequest(BaseModel):
    email: str
    otp: str    

# Simple in-memory user storage (for demo)
users_db = {}

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "AI Comic Generator Backend API",
        "version": "1.0",
        "status": "running"
    }

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Main comic generation endpoint
@app.post("/api/generate-comic", response_model=ComicResponse)
async def generate_comic(request: ComicRequest):
    """Generate comic and save to database"""
    try:
        print(f"Generating {request.panels} panels...")
        
        # Split story into scenes
        scenes = split_story_into_scenes(request.story, request.panels)
        print(f"Scenes created: {len(scenes)}")
        
        # Generate images for each scene
        panels = []
        for i, scene in enumerate(scenes):
            print(f"Generating image for panel {i + 1}...")
            image_url = generate_panel_image(scene, i + 1)
            panels.append({
                "id": i + 1,
                "imageUrl": image_url
            })
        
        # Save to database if user_id provided
        if request.user_id:
            try:
                comic_id = save_comic(request.user_id, request.story, panels)
                print(f"✅ Comic saved with ID: {comic_id}")
            except Exception as save_error:
                print(f"⚠️ Could not save comic: {save_error}")
        
        print("Comic generation complete!")
        return {
            "success": True,
            "panels": panels
        }
    
    except Exception as e:
        print(f"❌ Error generating comic: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def split_story_into_scenes(story: str, panel_count: int) -> List[str]:
    """
    Split story into scenes based on panel count
    Simple algorithm - splits by sentences
    """
    # Remove extra whitespace
    story = story.strip()
    
    # Split by periods, question marks, exclamation marks
    import re
    sentences = re.split(r'[.!?]+', story)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    if len(sentences) == 0:
        return [story] * panel_count
    
    # Calculate sentences per panel
    sentences_per_panel = max(1, len(sentences) // panel_count)
    
    scenes = []
    for i in range(panel_count):
        start_idx = i * sentences_per_panel
        end_idx = start_idx + sentences_per_panel
        
        # For the last panel, include all remaining sentences
        if i == panel_count - 1:
            end_idx = len(sentences)
        
        scene_sentences = sentences[start_idx:end_idx]
        scene = '. '.join(scene_sentences)
        
        if scene:
            scenes.append(scene)
    
    # If we don't have enough scenes, duplicate the last one
    while len(scenes) < panel_count:
        scenes.append(scenes[-1] if scenes else story)
    
    return scenes[:panel_count]

def generate_panel_image(scene_description: str, panel_number: int) -> str:
    """
    Generate comic panel image using Pollinations.ai (FREE!)
    No API key needed!
    """
    try:
        # SUPER STRICT prompt - absolutely NO TEXT allowed
        prompt = f"artwork only, illustration, NO TEXT, NO WORDS, NO LETTERS, NO WRITING, comic panel style, vibrant colorful cartoon art: {scene_description}. Professional digital art, clean composition"
        
        # URL encode the prompt
        encoded_prompt = urllib.parse.quote(prompt)
        
        # Pollinations.ai FREE API
        image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&model=flux&enhance=true&nologo=true"
        
        print(f"Generated image URL for panel {panel_number}")
        return image_url
    
    except Exception as e:
        print(f"Error generating image for panel {panel_number}: {e}")
        return f"https://via.placeholder.com/1024x1024/8B5CF6/ffffff?text=Panel+{panel_number}"

# Authentication endpoints
@app.post("/api/auth/signup")
async def signup(request: SignupRequest):
    """User signup - sends OTP to email"""
    try:
        # Check if email already exists
        existing_user = get_user_by_email(request.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Generate OTP
        otp = generate_otp()
        
        # Send OTP email
        email_sent = send_verification_email(request.email, otp)
        
        if not email_sent:
            raise HTTPException(status_code=500, detail="Failed to send verification email")
        
        # Store OTP temporarily
        store_otp(request.email, otp)
        
        # Store user data temporarily (don't create user yet)
        # We'll use otp_storage to store name and password too
        from email_service import otp_storage
        otp_storage[request.email]["name"] = request.name
        otp_storage[request.email]["password"] = request.password
        
        return {
            "success": True,
            "message": "Verification code sent to your email",
            "email": request.email
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Signup error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/auth/login")
async def login(request: LoginRequest):
    """User login with SQL database"""
    try:
        # Get user from database
        user = get_user_by_email(request.email)
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        if user.password != request.password:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        return {
            "success": True,
            "token": f"user_{user.id}",
            "user_id": user.id,
            "name": user.name,
            "email": user.email
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Login error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/my-comics/{user_id}")
async def get_my_comics(user_id: int):
    """Get all comics for a user"""
    try:
        comics = get_user_comics(user_id)
        return {
            "success": True,
            "comics": comics,
            "count": len(comics)
        }
    except Exception as e:
        print(f"❌ Error getting comics: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/comics/{comic_id}")
async def delete_comic_endpoint(comic_id: int):
    """Delete a comic"""
    try:
        success = delete_comic(comic_id)
        if success:
            return {
                "success": True,
                "message": "Comic deleted successfully"
            }
        else:
            raise HTTPException(status_code=404, detail="Comic not found")
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error deleting comic: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stats")
async def get_stats():
    """Get database statistics"""
    try:
        stats = get_database_stats()
        return {
            "success": True,
            "stats": stats
        }
    except Exception as e:
        print(f"❌ Error getting stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/api/auth/verify-otp")
async def verify_otp_endpoint(request: VerifyOTPRequest):
    """Verify OTP and create user"""
    try:
        # Verify OTP
        result = verify_otp(request.email, request.otp)
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["message"])
        
        # Get stored user data
        from email_service import otp_storage
        if request.email not in otp_storage:
            raise HTTPException(status_code=400, detail="Session expired. Please signup again.")
        
        user_data = otp_storage[request.email]
        
        # Create user in database
        user_id = create_user(
            name=user_data["name"],
            email=request.email,
            password=user_data["password"]
        )
        
        # Update user as verified
        # (In production, set email_verified = 1 in database)
        
        # Clear OTP
        clear_otp(request.email)
        
        return {
            "success": True,
            "message": "Email verified! Account created successfully.",
            "user_id": user_id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Verify OTP error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/auth/resend-otp")
async def resend_otp(request: dict):
    """Resend OTP"""
    try:
        email = request.get("email")
        
        if not email:
            raise HTTPException(status_code=400, detail="Email required")
        
        # Check if OTP exists
        from email_service import otp_storage
        if email not in otp_storage:
            raise HTTPException(status_code=400, detail="No signup session found. Please signup again.")
        
        # Generate new OTP
        otp = generate_otp()
        
        # Send email
        email_sent = send_verification_email(email, otp)
        
        if not email_sent:
            raise HTTPException(status_code=500, detail="Failed to send email")
        
        # Update stored OTP
        store_otp(email, otp)
        # Restore user data
        user_data = otp_storage[email]
        otp_storage[email]["name"] = user_data.get("name")
        otp_storage[email]["password"] = user_data.get("password")
        
        return {
            "success": True,
            "message": "New verification code sent"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Resend OTP error: {e}")
        raise HTTPException(status_code=500, detail=str(e))        

# Run server
if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting AI Comic Generator Backend...")
    print("📍 Server running at: http://localhost:5000")
    print("📖 API docs at: http://localhost:5000/docs")
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)


    
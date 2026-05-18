from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import json

# ============================================
# DATABASE CONFIGURATION
# ============================================

# SQLite database file (will be created automatically)
DATABASE_URL = "sqlite:///./comic_generator.db"

# Create engine
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# ============================================
# DATABASE MODELS (Tables)
# ============================================

class User(Base):
    """Users table"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(100), nullable=False)
    email_verified = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now)
    
    # Relationship: One user can have many comics
    comics = relationship("Comic", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User {self.email}>"


class Comic(Base):
    """Comics table"""
    __tablename__ = "comics"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    story = Column(Text, nullable=False)
    panels = Column(Text, nullable=False)  # Stored as JSON string
    panel_count = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    
    # Relationship: Each comic belongs to one user
    user = relationship("User", back_populates="comics")
    
    def __repr__(self):
        return f"<Comic {self.id} by User {self.user_id}>"


# ============================================
# CREATE TABLES
# ============================================

def init_database():
    """Initialize database and create all tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized! Tables created.")

# Initialize on import
init_database()

# ============================================
# DATABASE OPERATIONS
# ============================================

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        return db
    finally:
        pass


# ---------- USER OPERATIONS ----------

def create_user(name: str, email: str, password: str):
    """
    Create a new user
    Returns: user_id (int)
    """
    db = SessionLocal()
    try:
        # Check if email already exists
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            raise ValueError(f"Email {email} already exists!")
        
        user = User(name=name, email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"✅ User created: {user.email} (ID: {user.id})")
        return user.id
    except Exception as e:
        db.rollback()
        print(f"❌ Error creating user: {e}")
        raise e
    finally:
        db.close()


def get_user_by_email(email: str):
    """
    Get user by email
    Returns: User object or None
    """
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        return user
    finally:
        db.close()


def get_user_by_id(user_id: int):
    """
    Get user by ID
    Returns: User object or None
    """
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        return user
    finally:
        db.close()


def get_all_users():
    """
    Get all users
    Returns: List of User objects
    """
    db = SessionLocal()
    try:
        users = db.query(User).all()
        return users
    finally:
        db.close()


def delete_user(user_id: int):
    """
    Delete user (and all their comics due to cascade)
    Returns: True if deleted, False if not found
    """
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            db.delete(user)
            db.commit()
            print(f"✅ User {user_id} deleted")
            return True
        return False
    except Exception as e:
        db.rollback()
        print(f"❌ Error deleting user: {e}")
        raise e
    finally:
        db.close()


# ---------- COMIC OPERATIONS ----------

def save_comic(user_id: int, story: str, panels: list):
    """
    Save a comic to database
    panels: list of dicts like [{"id": 1, "imageUrl": "..."}]
    Returns: comic_id (int)
    """
    db = SessionLocal()
    try:
        # Convert panels list to JSON string
        panels_json = json.dumps(panels)
        
        comic = Comic(
            user_id=user_id,
            story=story,
            panels=panels_json,
            panel_count=len(panels)
        )
        db.add(comic)
        db.commit()
        db.refresh(comic)
        print(f"✅ Comic saved: ID {comic.id} for User {user_id}")
        return comic.id
    except Exception as e:
        db.rollback()
        print(f"❌ Error saving comic: {e}")
        raise e
    finally:
        db.close()


def get_user_comics(user_id: int):
    """
    Get all comics by a user
    Returns: List of comic dicts
    """
    db = SessionLocal()
    try:
        comics = db.query(Comic).filter(Comic.user_id == user_id).order_by(Comic.created_at.desc()).all()
        
        # Convert to list of dicts
        result = []
        for comic in comics:
            result.append({
                "id": comic.id,
                "story": comic.story,
                "panels": json.loads(comic.panels),  # Parse JSON string back to list
                "panel_count": comic.panel_count,
                "created_at": comic.created_at.isoformat()
            })
        
        print(f"✅ Found {len(result)} comics for User {user_id}")
        return result
    finally:
        db.close()


def get_comic_by_id(comic_id: int):
    """
    Get comic by ID
    Returns: Comic dict or None
    """
    db = SessionLocal()
    try:
        comic = db.query(Comic).filter(Comic.id == comic_id).first()
        if comic:
            return {
                "id": comic.id,
                "user_id": comic.user_id,
                "story": comic.story,
                "panels": json.loads(comic.panels),
                "panel_count": comic.panel_count,
                "created_at": comic.created_at.isoformat()
            }
        return None
    finally:
        db.close()


def delete_comic(comic_id: int):
    """
    Delete comic by ID
    Returns: True if deleted, False if not found
    """
    db = SessionLocal()
    try:
        comic = db.query(Comic).filter(Comic.id == comic_id).first()
        if comic:
            db.delete(comic)
            db.commit()
            print(f"✅ Comic {comic_id} deleted")
            return True
        print(f"❌ Comic {comic_id} not found")
        return False
    except Exception as e:
        db.rollback()
        print(f"❌ Error deleting comic: {e}")
        raise e
    finally:
        db.close()


def get_all_comics():
    """
    Get all comics from all users
    Returns: List of comic dicts
    """
    db = SessionLocal()
    try:
        comics = db.query(Comic).order_by(Comic.created_at.desc()).all()
        result = []
        for comic in comics:
            result.append({
                "id": comic.id,
                "user_id": comic.user_id,
                "story": comic.story[:50] + "...",  # Truncate for display
                "panel_count": comic.panel_count,
                "created_at": comic.created_at.isoformat()
            })
        return result
    finally:
        db.close()


# ============================================
# UTILITY FUNCTIONS
# ============================================

def count_users():
    """Count total users"""
    db = SessionLocal()
    try:
        count = db.query(User).count()
        return count
    finally:
        db.close()


def count_comics():
    """Count total comics"""
    db = SessionLocal()
    try:
        count = db.query(Comic).count()
        return count
    finally:
        db.close()


def get_database_stats():
    """Get database statistics"""
    return {
        "total_users": count_users(),
        "total_comics": count_comics()
    }


# ============================================
# TEST FUNCTION (Optional - for testing)
# ============================================

def test_database():
    """Test database operations"""
    print("\n🧪 Testing Database...")
    
    try:
        # Test user creation
        user_id = create_user("Test User", "test@example.com", "password123")
        print(f"Created user with ID: {user_id}")
        
        # Test get user
        user = get_user_by_email("test@example.com")
        print(f"Retrieved user: {user.name}")
        
        # Test comic creation
        test_panels = [
            {"id": 1, "imageUrl": "http://example.com/1.jpg"},
            {"id": 2, "imageUrl": "http://example.com/2.jpg"}
        ]
        comic_id = save_comic(user_id, "Test story", test_panels)
        print(f"Created comic with ID: {comic_id}")
        
        # Test get comics
        comics = get_user_comics(user_id)
        print(f"User has {len(comics)} comics")
        
        # Test stats
        stats = get_database_stats()
        print(f"Database stats: {stats}")
        
        print("✅ All tests passed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")


# Uncomment to run tests
if __name__ == "__main__":
 test_database()
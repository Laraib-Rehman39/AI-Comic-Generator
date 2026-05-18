import smtplib
import random
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# Email configuration
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

# Store OTPs temporarily (in production, use Redis or database)
otp_storage = {}

def generate_otp():
    """Generate 6-digit OTP"""
    return str(random.randint(100000, 999999))

def send_verification_email(to_email, otp):
    """Send OTP verification email"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "AI Comic Generator - Email Verification"
        msg['From'] = EMAIL_USER
        msg['To'] = to_email

        # HTML email body
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #7c3aed; text-align: center;">AI Comic Generator</h2>
              <h3 style="color: #333;">Email Verification</h3>
              <p style="color: #666; font-size: 16px;">
                Thank you for signing up! Please use the following OTP to verify your email address:
              </p>
              <div style="background-color: #f0f0f0; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
                <h1 style="color: #7c3aed; font-size: 36px; letter-spacing: 5px; margin: 0;">
                  {otp}
                </h1>
              </div>
              <p style="color: #666; font-size: 14px;">
                This OTP will expire in <strong>10 minutes</strong>.
              </p>
              <p style="color: #666; font-size: 14px;">
                If you didn't request this, please ignore this email.
              </p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              
            </div>
          </body>
        </html>
        """

        # Attach HTML
        part = MIMEText(html, 'html')
        msg.attach(part)

        # Send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)

        print(f"OTP sent to {to_email}")
        return True

    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return False

def store_otp(email, otp):
    """Store OTP with expiry time"""
    expiry = datetime.now() + timedelta(minutes=2)
    otp_storage[email] = {
        "otp": otp,
        "expiry": expiry,
        "verified": False
    }
    print(f"📝 OTP stored for {email}: {otp} (expires at {expiry})")

def verify_otp(email, otp):
    """Verify OTP"""
    if email not in otp_storage:
        return {"success": False, "message": "No OTP found. Please request a new one."}
    
    stored_data = otp_storage[email]
    
    # Check if expired
    if datetime.now() > stored_data["expiry"]:
        del otp_storage[email]
        return {"success": False, "message": "OTP expired. Please request a new one."}
    
    # Check if OTP matches
    if stored_data["otp"] != otp:
        return {"success": False, "message": "Invalid OTP. Please try again."}
    
    # Mark as verified
    otp_storage[email]["verified"] = True
    print(f"✅ Email verified: {email}")
    
    return {"success": True, "message": "Email verified successfully!"}

def is_email_verified(email):
    """Check if email is verified"""
    if email in otp_storage:
        return otp_storage[email].get("verified", False)
    return False

def clear_otp(email):
    """Clear OTP after successful signup"""
    if email in otp_storage:
        del otp_storage[email]
        print(f"🗑️ OTP cleared for {email}")
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';
import { verifyOTP, resendOTP } from '../services/api'; // <-- IMPORTING YOUR REAL API FUNCTIONS

function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  // GET THE REAL EMAIL FROM THE SIGNUP PAGE
  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
    if (newOtp.length === 6) {
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    if (!email) {
      alert("Email not found. Please go back to signup.");
      navigate('/signup');
      return;
    }

    setLoading(true);
    
    try {
      // CALLING THE REAL BACKEND API FROM api.js
      const data = await verifyOTP(email, otpValue);

      if (data.success) {
        // SAVE THE TOKEN! This is what ProtectedRoute needs
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        
        alert('✅ Email verified successfully!');
        navigate('/generator');
      } else {
        alert('❌ Verification failed: ' + (data.message || 'Invalid OTP'));
      }
    } catch (error) {
      console.error('Verification Error:', error);
      // If backend throws an error, axios wraps it in error.response.data
      const msg = error.response?.data?.message || 'Network error. Is the backend running?';
      alert('❌ ' + msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setResending(true);
    
    try {
      // CALLING THE REAL BACKEND API FROM api.js
      const data = await resendOTP(email);
      
      if (data.success) {
        alert('✅ New code sent to your email!');
        setTimer(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      } else {
        alert('Failed to resend: ' + data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Network error.';
      alert('❌ ' + msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg shadow-emerald-500/50">
            <Mail className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Verify Your Email</h1>
          <p className="text-slate-400 text-sm">
            We've sent a 6-digit code to <span className="text-emerald-400 font-semibold">{email}</span>
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-semibold mb-3 text-center">Enter Verification Code</label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 bg-slate-900/50 border-2 border-slate-700 rounded-lg text-center text-2xl font-bold text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            ))}
          </div>
        </div>

        {timer > 0 && (
          <div className="text-center mb-6">
            <p className="text-slate-400 text-sm">Code expires in <span className="text-emerald-400 font-semibold">{timer}s</span></p>
          </div>
        )}

        <button onClick={handleVerify} disabled={loading || otp.join('').length !== 6} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 py-3 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
          {loading ? (<><RefreshCw className="w-4 h-4 animate-spin" /> Verifying...</>) : (<><CheckCircle className="w-4 h-4" /> Verify Email</>)}
        </button>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm mb-3">Didn't receive the code?</p>
          <button onClick={handleResend} disabled={resending || timer > 0} className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {resending ? 'Sending...' : 'Resend Code'}
          </button>
        </div>

        <div className="my-6 border-t border-slate-700"></div>
        <div className="text-center">
          <button onClick={() => navigate('/signup')} className="inline-flex items-center gap-2 text-slate-400 text-sm hover:text-emerald-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Signup
          </button>
        </div>

        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-300 text-xs font-semibold mb-1">Quick Tip</p>
              <p className="text-slate-400 text-xs leading-relaxed">Check your spam folder if you don't see the email. The code is valid for 10 minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
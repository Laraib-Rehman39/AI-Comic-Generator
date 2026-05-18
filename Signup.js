import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, Loader2 } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Invalid email format!' };
    }

    return { valid: true };
  };

  const getPasswordStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validate email first
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.message);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    if (!agree) {
      setError('Please agree to Terms & Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      const result = await signupUser(name, email, password);
      
      if (result.success) {
        setSuccess('Verification code sent to your email.');
        navigate('/verify-otp', { state: { email: email } });
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      setError(
        error?.response?.data?.message ||
        'Backend not responding. Please check if backend is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <div className="grid md:grid-cols-2 bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden">

        {/* LEFT — BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/10">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI Comic Studio ✨
          </h2>
          <p className="text-slate-300 mb-6">
            Turn stories into stunning AI-generated comics in seconds.
          </p>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li>✔ AI-powered panels</li>
            <li>✔ Instant download</li>
            <li>✔ No design skills needed</li>
          </ul>
        </div>

        {/* RIGHT — FORM */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-slate-400 mb-6">
            Start your signature comic journey
          </p>

          <form onSubmit={handleSignup} className="space-y-4">

            {error && (
              <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* STRENGTH */}
            {password && (
              <p className="text-sm text-slate-400">
                Strength:{" "}
                <span
                  className={
                    getPasswordStrength() === "Strong"
                      ? "text-emerald-400"
                      : getPasswordStrength() === "Medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {getPasswordStrength()}
                </span>
              </p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full bg-slate-800 border px-4 py-3 rounded-xl focus:outline-none ${
                confirmPassword &&
                password !== confirmPassword
                  ? "border-red-500"
                  : "border-slate-700 focus:border-emerald-500"
              }`}
            />

            {confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-400">Passwords do not match</p>
            )}

            {/* TERMS */}
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4"
              />
              I agree to Terms & Privacy Policy
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || !agree || password !== confirmPassword}
              className="w-full group bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Sending Code...
                </>
              ) : (
                <>
                  Create Account <Sparkles size={18} />
                </>
              )}
            </button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-emerald-400 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
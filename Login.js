import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { AlertCircle, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  
  try {
    const result = await loginUser(email, password);
    
    if (result.success) {
      localStorage.setItem('userToken', result.token);
      localStorage.setItem('userId', result.user_id);
      localStorage.setItem('userName', result.name);
      localStorage.setItem('userEmail', result.email);
      
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      navigate('/generator');
    } else {
      setError(result.message || "Login failed. Please check your credentials.");
    }
    
  } catch (error) {
    console.error('Login error:', error);
    setError(
      error?.response?.data?.message ||
      "Backend not responding. Please check if backend is running on port 5000."
    );
  } finally {
    setLoading(false);
  }
};

  React.useEffect(() => {
    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <div className="grid md:grid-cols-2 bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden">

        {/* LEFT — BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome Back ✨
          </h2>
          <p className="text-slate-300 mb-6">
            Continue creating stunning AI-powered comics effortlessly.
          </p>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li>✔ Resume your projects</li>
            <li>✔ Access saved comics</li>
            <li>✔ Fast AI generation</li>
          </ul>
        </div>

        {/* RIGHT — LOGIN FORM */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Login
          </h1>
          <p className="text-slate-400 mb-6">
            Continue building standout comics
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}
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

            {/* ERROR MESSAGE */}
            {error && (
              <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between text-sm text-slate-400">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-emerald-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Logging in...
                </>
              ) : (
                <>
                  Login <Sparkles size={18} />
                </>
              )}
            </button>
          </form>

          {/* SIGNUP */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-emerald-400 hover:underline"
            >
              Create one
            </button>
          </p>

          {/* BACK */}
          <p className="text-center text-slate-500 text-xs mt-3">
            <button onClick={() => navigate("/")}>
              ← Back to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

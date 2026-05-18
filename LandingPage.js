import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Sparkles, Zap, Download, Wand2, Layout, Image, ArrowRight, Check, Star, Heart } from "lucide-react"

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()  // USE REACT ROUTER HOOK

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Top Navigation Bar - Glassmorphism */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-emerald-500/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex justify-between items-center">
          {/* Left: Logo/Brand */}
          <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md shadow-emerald-500/50">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            </div>
            <h1 className="text-lg font-bold text-white">
              AI Comic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Studio</span>
            </h1>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex gap-3 items-center">
            
            
            <button
              onClick={() => navigate("/about")}
              className="text-slate-300 hover:text-emerald-400 transition font-medium text-sm"
            >
              About
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 px-4 py-1.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Compact & Modern */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3 h-3" />
              <span>AI-Powered Comic Creation</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
              Transform Stories
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                Into Comics
              </span>
              <br />
              <span className="text-3xl text-slate-300">Instantly</span>
            </h1>

            <p className="text-base text-slate-400 mb-6 leading-relaxed max-w-lg">
              Create stunning comic strips with AI in seconds. No design skills required—just your imagination.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700 px-2.5 py-1.5 rounded-full shadow-sm">
                <div className="w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-slate-900" strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-slate-300">AI-Powered</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700 px-2.5 py-1.5 rounded-full shadow-sm">
                <div className="w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-slate-900" strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-slate-300">Multiple Layouts</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700 px-2.5 py-1.5 rounded-full shadow-sm">
                <div className="w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-slate-900" strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-slate-300">Instant Download</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2.5">
              <button
                onClick={() => navigate("/signup")}
                className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="bg-slate-800 border-2 border-slate-700 text-slate-300 px-5 py-2.5 rounded-lg text-sm font-bold hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Modern Showcase */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-slate-800 rounded-xl p-2 shadow-xl border border-slate-700">
                  <img
                    src="https://i.pinimg.com/1200x/10/80/ef/1080ef0aaf5cf474b52a09ee511987c9.jpg"
                    alt="Modern comic strip preview"
                    className="w-full rounded-lg"
                  />

                  {/* Floating Badge - AI Powered */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-900 px-3 py-1.5 rounded-lg shadow-lg font-bold text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>AI Generated</span>
                  </div>

                  {/* Stats Badge */}
                  <div className="absolute -bottom-2 -left-2 bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-700">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Generated in</p>
                    <p className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                      90s
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -z-10 top-1/4 -left-8 w-16 h-16 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div
                className="absolute -z-10 bottom-1/4 -right-8 w-20 h-20 bg-teal-500 rounded-full blur-2xl opacity-20 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-slate-900">
            <div>
              <p className="text-2xl font-black mb-0.5">10K+</p>
              <p className="text-slate-800 font-medium text-sm">Comics Created</p>
            </div>
            <div>
              <p className="text-2xl font-black mb-0.5">5K+</p>
              <p className="text-slate-800 font-medium text-sm">Happy Users</p>
            </div>
            <div>
              <p className="text-2xl font-black mb-0.5">90s</p>
              <p className="text-slate-800 font-medium text-sm">Avg. Generation</p>
            </div>
            <div>
              <p className="text-2xl font-black mb-0.5">99%</p>
              <p className="text-slate-800 font-medium text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/30 text-teal-400 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
              <Zap className="w-3 h-3" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">How It Works</h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto">
              Create professional comic strips in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 mx-12"></div>

            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Wand2 className="w-7 h-7 text-slate-900" />
                </div>
                <div className="absolute -top-1 -right-1 bg-slate-800 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center font-black text-sm shadow-lg border-2 border-emerald-500/50">
                  1
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">Write Your Story</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Type or paste your narrative into our intelligent text editor
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Layout className="w-7 h-7 text-slate-900" />
                </div>
                <div className="absolute -top-1 -right-1 bg-slate-800 text-teal-400 w-6 h-6 rounded-full flex items-center justify-center font-black text-sm shadow-lg border-2 border-teal-500/50">
                  2
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">Choose Layout</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Select your preferred panel configuration (2, 4, 6, or 8 panels)
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-cyan-500 to-blue-500 w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Image className="w-7 h-7 text-slate-900" />
                </div>
                <div className="absolute -top-1 -right-1 bg-slate-800 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center font-black text-sm shadow-lg border-2 border-cyan-500/50">
                  3
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">AI Generates</h3>
              <p className="text-slate-400 leading-relaxed text-sm">Watch as AI creates stunning comic artwork in real-time</p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center group">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-emerald-500 w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-7 h-7 text-slate-900" />
                </div>
                <div className="absolute -top-1 -right-1 bg-slate-800 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center font-black text-sm shadow-lg border-2 border-blue-500/50">
                  4
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">Download & Share</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Export in high quality and share with your audience instantly
              </p>
            </div>
          </div>
        </div>
      </div>

     {/* Use Cases Section */}
<div className="bg-gray-50 py-20">
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    
    <div>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Who Is AI Comic Studio For?
      </h2>
      <p className="text-gray-600 mb-10">
        Whether you are a beginner or a professional, AI Comic Studio helps you
        turn ideas into engaging comic stories.
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div className="group bg-slate-900 text-emerald-400 p-6 rounded-2xl 
hover:shadow-2xl hover:scale-105 transition-all duration-300
border border-emerald-500/20">
          <h4 className="font-bold mb-1 flex items-center gap-2 text-white">✍️ Writers</h4>
          <p className="text-sm text-white/80 ">
            Turn scripts into visual stories
          </p>
        </div>

        <div className="group bg-slate-900 text-emerald-400 p-6 rounded-2xl 
hover:shadow-2xl hover:scale-105 transition-all duration-300
border border-emerald-500/20">
          <h4 className="font-bold mb-1 flex items-center gap-2 text-white">🎓 Students</h4>
          <p className="text-sm text-white/80">
            Learn storytelling visually
          </p>
        </div>

        <div className="group bg-slate-900 text-emerald-400 p-6 rounded-2xl 
hover:shadow-2xl hover:scale-105 transition-all duration-300
border border-emerald-500/20">
          <h4 className="font-bold mb-1 flex items-center gap-2 text-white">🎨 Designers</h4>
          <p className="text-sm text-white/80">
            Speed up comic creation
          </p>
        </div>

        <div className="group bg-slate-900 text-emerald-400 p-6 rounded-2xl 
hover:shadow-2xl hover:scale-105 transition-all duration-300
border border-emerald-500/20">
          <h4 className="font-bold mb-1 flex items-center gap-2 text-white">📱 Creators</h4>
          <p className="text-sm text-white/80">
            Create shareable comic content
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="flex justify-center">
      <img
        src="/img/comic/main.png"
        alt="AI Comic Studio"
        className="max-h-[320px] rounded-3xl shadow-2xl"
      />
    </div>

  </div>
</div>


      {/* Features Section - Why Choose */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Why Choose AI Comic Studio?</h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">Everything you need to create professional comics</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Feature 1 */}
          <div className="group relative bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Wand2 className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Easy to Use</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Intuitive interface that anyone can master in minutes. No design experience required—just your
                creativity.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Powered</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Cutting-edge artificial intelligence creates professional-quality artwork that brings your stories to
                life.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Download className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Export</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Download in multiple formats and share across all social platforms with one click. Ready for print or
                web.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-slate-800/50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/30 text-teal-400 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
              <Heart className="w-3 h-3" />
              <span>User Love</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">What Our Users Say</h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto">Real stories from creators like you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 p-5 rounded-xl shadow-lg border border-slate-700">
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-emerald-400 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-3 text-sm">"AI Comic Studio turned my story into a masterpiece in minutes. Absolutely magical!"</p>
              <p className="text-xs font-semibold text-emerald-400">- Alex R.</p>
            </div>
            <div className="bg-slate-900/50 p-5 rounded-xl shadow-lg border border-slate-700">
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-emerald-400 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-3 text-sm">"The layouts are perfect, and the AI understands my vision perfectly."</p>
              <p className="text-xs font-semibold text-emerald-400">- Jamie L.</p>
            </div>
            <div className="bg-slate-900/50 p-5 rounded-xl shadow-lg border border-slate-700">
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-emerald-400 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-3 text-sm">"Best tool for comic creation. Saved me hours of work and the results are incredible!"</p>
              <p className="text-xs font-semibold text-emerald-400">- Morgan K.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            Ready to Create Amazing Comics?
          </h2>
          <p className="text-base text-slate-800 mb-6 max-w-2xl mx-auto">
            Join thousands of storytellers bringing their narratives to life with AI
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="group bg-slate-900 text-emerald-400 px-6 py-3 rounded-xl text-base font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold">AI Comic Studio</h3>
            </div>
            <p className="text-slate-400 mb-5 max-w-md text-sm">
              Transform your stories into stunning visual narratives with the power of AI
            </p>
            <div className="flex gap-5 mb-6">
              <button onClick={() => navigate("/")} className="text-slate-400 hover:text-emerald-400 transition text-sm">
                Home
              </button>
              <button onClick={() => navigate("/about")} className="text-slate-400 hover:text-emerald-400 transition text-sm">
                About
              </button>
              <button className="text-slate-400 hover:text-emerald-400 transition text-sm">Privacy</button>
              <button className="text-slate-400 hover:text-emerald-400 transition text-sm">Terms</button>
            </div>
            <div className="w-full border-t border-slate-800 pt-6">
              <p className="text-slate-500 text-xs">© 2026 AI Comic Studio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
       
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
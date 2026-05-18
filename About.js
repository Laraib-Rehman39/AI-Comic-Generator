import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Code, Palette, Brain, Database, Zap, ArrowRight, Users, Award, Target, Rocket } from 'lucide-react';

function About() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Navigation Bar - Matching Main */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-emerald-500/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex justify-between items-center">
          <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md shadow-emerald-500/50">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            </div>
            <h1 className="text-lg font-bold text-white">
              AI Comic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Studio</span>
            </h1>
          </div>

          <div className="flex gap-3 items-center">
            <button onClick={() => navigate("/")} className="text-slate-300 hover:text-emerald-400 transition font-medium text-sm">
              Home
            </button>
            <button onClick={() => navigate("/about")} className="text-emerald-400 font-semibold text-sm">
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

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Final Year Project 2022-26</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              AI Comic Studio
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            AI Comic Studio turns your written ideas into cinematic comic panels in minutes.
            No illustration background required, just your story and your style.
          </p>
        </div>
      </div>

      {/* Interactive Tabs Section - NEW! */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-2">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('mission')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'mission' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 shadow-lg' 
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'vision' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 shadow-lg' 
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <Rocket className="w-4 h-4 inline mr-2" />
              Our Vision
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'values' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 shadow-lg' 
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <Award className="w-4 h-4 inline mr-2" />
              Our Values
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'mission' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-slate-400 leading-relaxed">
                  Make high-quality comic creation accessible to everyone, from first-time creators
                  to experienced storytellers. We build tools that reduce friction between imagination
                  and visual storytelling.
                </p>
              </div>
            )}
            {activeTab === 'vision' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-slate-400 leading-relaxed">
                  Enable a future where anyone can direct and publish visual stories with AI as a creative
                  collaborator. We aim to make comic production faster, smarter, and more personal.
                </p>
              </div>
            )}
            {activeTab === 'values' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Innovation</p>
                      <p className="text-sm text-slate-400">Pushing boundaries with AI technology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Accessibility</p>
                      <p className="text-sm text-slate-400">Making comic creation easy for everyone</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What It Does Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/30 text-teal-400 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
            <Zap className="w-3 h-3" />
            <span>Key Features</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">What It Does</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Brain className="w-6 h-6 text-slate-900" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">AI-Powered</h3>
            <p className="text-slate-400 text-sm">Generates visual panels directly from your written story prompt</p>
          </div>

          <div className="group bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Sparkles className="w-6 h-6 text-slate-900" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Story Analysis</h3>
            <p className="text-slate-400 text-sm">Breaks long narratives into structured scenes with better pacing</p>
          </div>

          <div className="group bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Palette className="w-6 h-6 text-slate-900" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Multiple Layouts</h3>
            <p className="text-slate-400 text-sm">Supports 2, 4, 6, and 8 panel formats for different storytelling styles</p>
          </div>

          <div className="group bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Database className="w-6 h-6 text-slate-900" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Save & Download</h3>
            <p className="text-slate-400 text-sm">Store comics in your gallery and export high-quality images instantly</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
            <Users className="w-3 h-3" />
            <span>Our Team</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Meet The Creators</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Team Member 1 */}
          <div className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl font-black text-slate-900 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  L
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-1">Laraib Rehman</h4>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full text-xs font-semibold mb-2">
                    <Code className="w-3 h-3" />
                    Frontend Developer
                  </div>
                  <p className="text-slate-400 text-sm mb-2">BSCS51F22S077</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Designs and develops the user interface, builds responsive layouts,
                    and ensures a smooth product experience across devices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl font-black text-slate-900 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xl font-bold text-white">Abdullah Akram</h4>
                    <div className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs font-bold">
                      <Award className="w-3 h-3" />
                      Leader
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/30 text-teal-400 px-2 py-0.5 rounded-full text-xs font-semibold mb-2">
                    <Database className="w-3 h-3" />
                    Backend Developer
                  </div>
                  <p className="text-slate-400 text-sm mb-2">BSCS51F22S058</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Handles server-side APIs, AI orchestration, database management,
                    and comic generation workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Member 3 - Centered */}
        <div className="flex justify-center">
          <div className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl border-2 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden md:w-2/3">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl font-black text-slate-900 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  M
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-1">Muhammad Ahmed</h4>
                  <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-2 py-0.5 rounded-full text-xs font-semibold mb-2">
                    <Brain className="w-3 h-3" />
                    AI Integration Specialist
                  </div>
                  <p className="text-slate-400 text-sm mb-2">BSCS51F22S085</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Focuses on image generation integration, panel-level consistency,
                    and performance improvements such as caching and queue management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Stats - NEW! */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6 text-center">
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">2022-26</p>
            <p className="text-slate-400 font-medium">Academic Year</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6 text-center">
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-2">Final Year</p>
            <p className="text-slate-400 font-medium">Project Type</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6 text-center">
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">AI Powered</p>
            <p className="text-slate-400 font-medium">Technology</p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-10">
          <h2 className="text-3xl font-black text-white text-center mb-10">Technology Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Code className="w-5 h-5 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Frontend</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: '⚛️', name: 'React', desc: 'Component-based frontend framework' },
                  { icon: '🎨', name: 'Tailwind CSS', desc: 'Utility-first styling' },
                  { icon: '🔀', name: 'React Router', desc: 'Navigation system' },
                  { icon: '📡', name: 'Axios', desc: 'API communication layer' }
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <p className="text-white font-semibold">{tech.name}</p>
                      <p className="text-xs text-slate-400">{tech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Database className="w-5 h-5 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-teal-400">Backend</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: '🐍', name: 'Flask', desc: 'Backend API services' },
                  { icon: '🤖', name: 'OpenAI', desc: 'Story-to-image generation' },
                  { icon: '🗄️', name: 'SQLite', desc: 'Application data storage' },
                  { icon: '🖼️', name: 'Pillow', desc: 'Image post-processing' }
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-all duration-300">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <p className="text-white font-semibold">{tech.name}</p>
                      <p className="text-xs text-slate-400">{tech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-black text-white mb-4">Ready to Create Your Comic?</h2>
        <p className="text-lg text-slate-400 mb-8">Bring your next story to life with a modern AI comic workflow</p>
        <button
          onClick={() => navigate('/login')}
          className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-slate-900" />
            </div>
            <span className="text-lg font-bold text-white">AI Comic Studio</span>
          </div>
         
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default About;
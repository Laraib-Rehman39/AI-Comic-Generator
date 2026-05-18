import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { generateComic } from "../services/api";
import html2canvas from "html2canvas";
import {
  BadgeHelp,
  BookOpenText,
  Check,
  Copy,
  Download,
  Loader2,
  Palette,
  Save,
  Sparkles,
  Wand2
} from "lucide-react";

const STYLE_PRESETS = [
  { id: "cinematic", label: "Cinematic", hint: "dramatic framing and realistic lighting" },
  { id: "manga", label: "Manga", hint: "expressive linework and action rhythm" },
  { id: "retro", label: "Retro Pop", hint: "halftone textures and vintage inks" },
  { id: "minimal", label: "Clean Modern", hint: "minimal compositions and crisp tones" }
];

const STORY_TEMPLATES = [
  {
    id: "origin",
    label: "Hero Origin",
    value:
      "In a city where midnight storms hide secrets, a shy courier discovers an ancient artifact that awakens a mysterious power. As danger rises, they must choose between an ordinary life and becoming the guardian their city never knew it needed."
  },
  {
    id: "slice",
    label: "Slice Of Life Twist",
    value:
      "Two best friends open a tiny tea shop in a chaotic neighborhood. Every customer carries a strange request, and each cup reveals a hidden emotion. By sunset, one surprising conversation changes how they see each other forever."
  },
  {
    id: "scifi",
    label: "Sci-Fi Mystery",
    value:
      "On a floating research station above a silent planet, the crew receives messages from their own future selves. Each warning points to a different disaster. A young engineer races through the station to solve which timeline can still be saved."
  }
];

function ComicGenerator() {
  const navigate = useNavigate();
  const location = useLocation();  
  const [story, setStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [comicPanels, setComicPanels] = useState([]);
  const [step, setStep] = useState("input");
  const [selectedPanels, setSelectedPanels] = useState(4);
  const [copied, setCopied] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("minimal");
  const [tone, setTone] = useState("balanced");
  const [title, setTitle] = useState("");
  const [generationMessage, setGenerationMessage] = useState("Composing your scenes...");
  const [activeTemplate, setActiveTemplate] = useState("");
  
React.useEffect(() => {
  if (location.state?.comic) {
    const loadedComic = location.state.comic;

    setStory(loadedComic.story);
    setTitle(loadedComic.title || "");
    setSelectedStyle(loadedComic.style || "minimal");
    setTone(loadedComic.tone || "balanced");
    setComicPanels(loadedComic.panels);
    setSelectedPanels(loadedComic.panel_count || loadedComic.panels.length);
    setStep('preview');
    
    console.log('Comic loaded from gallery:', loadedComic);
    }
   }, [location.state]);

  React.useEffect(() => {
    if (!isGenerating) return undefined;

    const messages = [
      "Composing your scenes...",
      "Designing panel camera angles...",
      "Polishing visual consistency..."
    ];

    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setGenerationMessage(messages[idx]);
    }, 2200);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const selectedStyleObject = useMemo(
    () => STYLE_PRESETS.find((item) => item.id === selectedStyle),
    [selectedStyle]
  );

  const handleGenerate = async () => {
  if (story.trim().length < 50) {
    alert('Please enter at least 50 characters!');
    return;
  }

  setIsGenerating(true);
  setStep('generating');
  setGenerationMessage("Composing your scenes...");

  try {
    const result = await generateComic(story, selectedPanels);
    
    if (result.success && result.panels) {
      setComicPanels(result.panels);
      setStep('preview');
    } else {
      throw new Error('Invalid response from server');
    }
    
  } catch (error) {
    console.error('API Error:', error);
    alert('Backend not responding! Showing mock data for now.');
    
    const mockPanels = [];
    const colors = ['8B5CF6', 'EC4899', 'F59E0B', '10B981', '3B82F6', 'EF4444'];
    for (let i = 0; i < selectedPanels; i++) {
      mockPanels.push({
        id: i + 1,
        imageUrl: `https://via.placeholder.com/400x400/${colors[i]}/ffffff?text=Panel+${i + 1}`
      });
    }
    
    setComicPanels(mockPanels);
    setStep('preview');
  } finally {
    setIsGenerating(false);
  }
};

  const handleReset = () => {
    setStory("");
    setTitle("");
    setActiveTemplate("");
    setTone("balanced");
    setSelectedStyle("minimal");
    setSelectedPanels(4);
    setComicPanels([]);
    setStep("input");
  };

  const handleDownload = async () => {
    const comicElement = document.getElementById("comic-panels-container");
    if (!comicElement) return;

    const canvas = await html2canvas(comicElement, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `comic-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleSaveToGallery = () => {
    const comics = JSON.parse(localStorage.getItem("myComics") || "[]");
    comics.unshift({
      id: Date.now(),
      title: title.trim() || "Untitled Comic",
      style: selectedStyle,
      tone,
      story,
      panels: comicPanels,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("myComics", JSON.stringify(comics.slice(0, 20)));
    alert("Comic saved to gallery");
  };

  const handleCopyStory = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-400">
            AI Comic Studio
          </h1>
          <div className="flex gap-4 text-sm">
            <button onClick={() => navigate("/my-comics")} className="hover:text-emerald-400">
              My Comics
            </button>
            <button onClick={() => navigate('/generator')} className="hover:text-emerald-400">
              New Comic
            </button>
            <button onClick={handleLogout} className="text-red-400">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* INPUT */}
        {step === "input" && (
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold">Create Your Signature Comic</h2>
                <p className="text-slate-400 mt-2 text-sm">
                  Shape your unique visual style before generating.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-2 rounded-lg">
                <Wand2 size={14} />
                Guided creation mode
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-slate-300 block mb-2">Comic title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Example: Neon Alley Incident"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 block mb-2">Narrative tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                >
                  <option value="balanced">Balanced</option>
                  <option value="dark">Dark and dramatic</option>
                  <option value="playful">Playful and light</option>
                  <option value="epic">Epic and intense</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Palette size={16} className="text-emerald-300" />
                <p className="text-sm font-medium text-slate-200">Visual direction</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {STYLE_PRESETS.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`text-left p-4 rounded-xl border transition ${
                      selectedStyle === style.id
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 hover:border-emerald-400"
                    }`}
                  >
                    <p className="font-semibold">{style.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{style.hint}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpenText size={16} className="text-emerald-300" />
                <p className="text-sm font-medium text-slate-200">Story templates</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {STORY_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setStory(template.value);
                      setActiveTemplate(template.id);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm border transition ${
                      activeTemplate === template.id
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-700 text-slate-300 hover:border-emerald-400"
                    }`}
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 focus:outline-none focus:border-emerald-500"
              placeholder="Write your story..."
            />

            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>{story.length} / 2000</span>
              <button onClick={handleCopyStory} className="hover:text-emerald-400 flex items-center gap-1">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy Story"}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-6">
              {[2, 4, 6, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedPanels(num)}
                  className={`p-4 rounded-xl border transition ${
                    selectedPanels === num
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-slate-700 hover:border-emerald-400"
                  }`}
                >
                  {num} Panels
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
              <BadgeHelp size={12} />
              Tip: 4 panels works best for dramatic pacing.
            </p>

            <button
              onClick={handleGenerate}
              disabled={story.length < 50}
              className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 py-4 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50"
            >
              Generate Signature Comic <Sparkles size={18} />
            </button>
          </div>
        )}

        {/* GENERATING */}
        {step === "generating" && (
          <div className="bg-slate-900 rounded-3xl p-16 text-center">
            <Loader2 className="animate-spin mx-auto mb-6" size={48} />
            <h2 className="text-2xl font-bold">Building your comic world...</h2>
            <p className="text-slate-400 mt-2">{generationMessage}</p>
            <div className="mt-6 max-w-sm mx-auto h-2 rounded bg-slate-800 overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {step === "preview" && (
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold">{title.trim() || "Your Comic"}</h2>
                <p className="text-sm text-slate-400 mt-1">
                  {selectedStyleObject?.label || "Custom"} style • {tone} tone • {comicPanels.length} panels
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('input')}
                  className="px-6 py-2 border border-slate-600 text-slate-200 rounded-lg font-semibold hover:bg-slate-800 transition"
                >
                  ← Edit Story
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-emerald-500 text-emerald-300 rounded-lg font-semibold hover:bg-emerald-500/10 transition"
                >
                  Create New
                </button>
                <button
                  onClick={handleSaveToGallery}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>

            <div
              id="comic-panels-container"
              className="grid grid-cols-2 gap-4 mb-6 bg-white p-4 rounded-xl"
            >
              {comicPanels.map((panel, i) => (
                <div key={panel.id} className="relative group">
                  <img src={panel.imageUrl} alt="" className="rounded-lg" />
                  <span className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    Panel {i + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700 pt-6">
              <h3 className="font-bold mb-2">Original Story</h3>
              <p className="text-slate-300 bg-slate-800 p-4 rounded-lg">
                {story}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ComicGenerator;

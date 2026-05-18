import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search, Sparkles } from 'lucide-react';

function MyComics() {
  const navigate = useNavigate();
  const [savedComics, setSavedComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [styleFilter, setStyleFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('myComics');
    if (saved) setSavedComics(JSON.parse(saved));
  }, []);

  const handleDelete = (comicId) => {
    const confirmed = window.confirm('Are you sure you want to delete this comic?');
    if (confirmed) {
      const updated = savedComics.filter(comic => comic.id !== comicId);
      setSavedComics(updated);
      localStorage.setItem('myComics', JSON.stringify(updated));
    }
  };

  const handleViewComic = (comic) => {
    navigate('/generator', { state: { comic } });
  };

  // Filter & sort
  const filteredComics = savedComics
    .filter((comic) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        comic.story?.toLowerCase().includes(query) ||
        comic.title?.toLowerCase().includes(query) ||
        comic.style?.toLowerCase().includes(query);
      const matchesStyle = styleFilter === 'all' || comic.style === styleFilter;
      return matchesSearch && matchesStyle;
    })
    .sort((a, b) => sortOrder === 'newest'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-emerald-500/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/50">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            </div>
            <h1 className="text-lg font-bold text-white">AI Comic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Studio</span></h1>
          </div>

          <div className="flex gap-3 items-center">
            <button onClick={() => navigate('/')} className="text-slate-300 hover:text-emerald-400 transition font-medium text-sm">Home</button>
            <button onClick={() => navigate('/generator')} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 px-4 py-1.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">Create New</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {savedComics.length === 0 ? (
          <div className="bg-slate-800/50 rounded-3xl shadow-2xl p-16 text-center border border-emerald-500/20">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-3xl font-bold text-white mb-4">No Comics Yet!</h2>
            <p className="text-slate-400 mb-8">You haven't created any comics yet. Start your first masterpiece!</p>
            <button
              onClick={() => navigate('/generator')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 px-8 py-3 rounded-full font-bold hover:from-emerald-600 hover:to-teal-600 transition"
            >
              Create Your First Comic 🚀
            </button>
          </div>
        ) : (
          <>
            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, story or style..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-900 text-white border border-slate-700"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={styleFilter}
                  onChange={(e) => setStyleFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg outline-none cursor-pointer bg-slate-900 text-white border border-slate-700"
                >
                  <option value="all">All Styles</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="manga">Manga</option>
                  <option value="retro">Retro Pop</option>
                  <option value="minimal">Clean Modern</option>
                </select>
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 rounded-lg outline-none cursor-pointer bg-slate-900 text-white border border-slate-700"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Comics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComics.map((comic) => (
                <div key={comic.id} className="group relative bg-slate-800/50 rounded-2xl shadow-xl overflow-hidden border border-slate-700 hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300">
                  
                  {/* Comic Preview */}
                  <div className="aspect-square relative">
                    {comic.panels && comic.panels[0] ? (
                      <img src={comic.panels[0].imageUrl} alt="Comic preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-6xl">🎨</span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                      {comic.panels?.length || 0} Panels
                    </div>

                    {/* Hover Actions Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">
                      <button
                        onClick={() => handleViewComic(comic)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(comic.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Comic Info */}
                  <div className="p-4">
                    <p className="text-sm font-semibold text-white mb-1">
                      {comic.title || 'Untitled Comic'}
                    </p>
                    <p className="text-slate-300 text-sm mb-3">
                      {(comic.story || '').substring(0, 90)}
                      {(comic.story || '').length > 90 ? '...' : ''}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs mb-2">
                      <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-300">
                        {(comic.style || 'custom').toUpperCase()}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                        Tone: {comic.tone || 'balanced'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">Created: {new Date(comic.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyComics;
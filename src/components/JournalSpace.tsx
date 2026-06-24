import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import { Sparkles, Save, Trash2, BookOpen, Feather, MessageSquare, AlertCircle, RefreshCw, Lock, User, Mail, Key, LogOut, ArrowRight } from 'lucide-react';

const THEMES = [
  { value: 'Walking in Purpose', label: 'Walking in Purpose' },
  { value: 'The Journey Within', label: 'The Journey Within' },
  { value: 'Step Into Your Next Season', label: 'Step Into Your Next Season' },
  { value: 'Rise and Climb', label: 'Rise and Climb' },
  { value: 'Heal & Wholeness', label: 'Heal & Wholeness' },
  { value: 'Presence and Alignment', label: 'Presence and Alignment' }
];

const WRITING_PROMPTS = [
  "What is one difficult season you are currently rebuilding from, and what has it taught you?",
  "Where in your life do you want to show up with complete presence and alignment today?",
  "In what ways are you stepping boldly into your identity without seeking permission to exist?",
  "What is one area of your life you want to cultivate more intentional growth in?",
  "Who in your community could benefit from your service, compassion, or a kind word today?"
];

export default function JournalSpace() {
  // Authentication Guard States
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(THEMES[0].value);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  
  // AI reflection state
  const [companionReflection, setCompanionReflection] = useState<string>('');
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);
  const [reflectionError, setReflectionError] = useState('');
  const [viewingReflectionForId, setViewingReflectionForId] = useState<string | null>(null);

  // Load journal entries and user from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('girls_talk_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user info", e);
      }
    }

    const saved = localStorage.getItem('girls_talk_journals');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing journals", e);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('girls_talk_user');
    setUser(null);
    const toastEvent = new CustomEvent('girls_talk_toast', {
      detail: { 
        message: "You have signed out successfully.", 
        type: 'info' 
      }
    });
    window.dispatchEvent(toastEvent);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup' && !authName.trim()) {
      setAuthError('Please provide your name.');
      return;
    }

    const userData = {
      name: authMode === 'signup' ? authName : authEmail.split('@')[0],
      email: authEmail
    };

    localStorage.setItem('girls_talk_user', JSON.stringify(userData));
    setUser(userData);

    const toastEvent = new CustomEvent('girls_talk_toast', {
      detail: { 
        message: authMode === 'signup' ? `Welcome to the sisterhood, ${userData.name}! Your account has been created.` : `Welcome back, ${userData.name}!`, 
        type: 'success' 
      }
    });
    window.dispatchEvent(toastEvent);

    setAuthName('');
    setAuthEmail('');
    setAuthPassword('');
  };

  const saveJournalToStorage = (updated: JournalEntry[]) => {
    localStorage.setItem('girls_talk_journals', JSON.stringify(updated));
    setEntries(updated);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      title,
      content,
      category
    };

    const updated = [newEntry, ...entries];
    saveJournalToStorage(updated);
    
    // Dispatch custom Toast Event
    const toastEvent = new CustomEvent('girls_talk_toast', {
      detail: { 
        message: `Your journal reflection "${title}" has been successfully saved to your list!`, 
        type: 'success' 
      }
    });
    window.dispatchEvent(toastEvent);
    
    // Reset form
    setTitle('');
    setContent('');
    setCompanionReflection('');
    setViewingReflectionForId(null);
  };

  const handleDeleteEntry = (id: string) => {
    const entryToDelete = entries.find(e => e.id === id);
    const updated = entries.filter(e => e.id !== id);
    saveJournalToStorage(updated);
    if (viewingReflectionForId === id) {
      setViewingReflectionForId(null);
      setCompanionReflection('');
    }

    // Dispatch custom Toast Event
    const toastEvent = new CustomEvent('girls_talk_toast', {
      detail: { 
        message: `Journal entry "${entryToDelete?.title || 'Reflection'}" has been deleted.`, 
        type: 'info' 
      }
    });
    window.dispatchEvent(toastEvent);
  };

  const handleRotatePrompt = () => {
    setActivePromptIndex((prev) => (prev + 1) % WRITING_PROMPTS.length);
  };

  const handleApplyPrompt = () => {
    setTitle(`Reflection on: ${WRITING_PROMPTS[activePromptIndex].substring(0, 30)}...`);
    setContent(`Prompt: ${WRITING_PROMPTS[activePromptIndex]}\n\n`);
  };

  // Request Gemini supportive response via the backend api
  const handleRequestReflection = async (entry: JournalEntry) => {
    setIsLoadingReflection(true);
    setReflectionError('');
    setCompanionReflection('');
    setViewingReflectionForId(entry.id);

    try {
      const response = await fetch('/api/reflection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: entry.title,
          content: entry.content,
          category: entry.category,
        }),
      });

      if (!response.ok) {
        throw new Error('Could not reach the reflection guide server. Please verify your GEMINI_API_KEY is configured.');
      }

      const data = await response.json();
      if (data.reflection) {
        setCompanionReflection(data.reflection);
      } else {
        throw new Error('Invalid response formatting from the reflection server.');
      }
    } catch (err: any) {
      console.error(err);
      setReflectionError(err.message || 'An error occurred while connecting to the reflection companion.');
    } finally {
      setIsLoadingReflection(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-purple-100 p-8 shadow-xs space-y-6 animate-fade-in w-full" id="journal-auth-gate">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100/50 shadow-3xs">
            <Lock className="w-5 h-5 text-brand-gold animate-pulse" />
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-medium text-brand-deep">
            Private Journal Space
          </h2>
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            Your self-reflection journal is a private, sacred space. Create an account or sign in to access your saved notes and generate AI reflection companion guidance.
          </p>
        </div>

        {authError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-purple-300 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Kgomotso"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs md:text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-300 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                placeholder="sister@example.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs md:text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500">Secure Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-purple-300 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs md:text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-deep hover:bg-brand-plum text-white py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-2 mt-2"
          >
            {authMode === 'signup' ? 'Create Free Account' : 'Sign In Now'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-purple-50 text-center text-xs text-gray-500">
          {authMode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                className="font-semibold text-brand-plum hover:text-brand-gold underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className="font-semibold text-brand-plum hover:text-brand-gold underline cursor-pointer"
              >
                Sign Up (Free)
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="journal-space-component">
      {/* User welcome header banner */}
      <div className="lg:col-span-12 flex justify-between items-center bg-purple-50/40 border border-purple-100/50 rounded-2xl p-4 animate-fade-in shadow-3xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-deep text-white flex items-center justify-center font-bold font-serif text-sm border border-purple-100">
            {user.name ? user.name[0].toUpperCase() : 'S'}
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-light leading-none">Journal Sanctuary</p>
            <p className="text-sm font-semibold text-brand-deep mt-0.5">Welcome, {user.name}!</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="text-xs text-brand-plum hover:text-brand-gold font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Writer Column */}
      <div className="lg:col-span-7 space-y-6">
        {/* Prompt Card */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100/70 shadow-2xs relative overflow-hidden">
          <div className="absolute right-[-10px] top-[-10px] opacity-10">
            <Feather className="w-24 h-24 text-brand-deep" />
          </div>

          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-plum uppercase tracking-wider">
              <Feather className="w-3.5 h-3.5" />
              Inspirational Spark
            </div>
            <button 
              onClick={handleRotatePrompt}
              className="text-xs text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Next Prompt
            </button>
          </div>

          <p className="font-serif text-sm md:text-base text-brand-text font-medium italic leading-relaxed mb-4">
            &ldquo;{WRITING_PROMPTS[activePromptIndex]}&rdquo;
          </p>

          <button
            onClick={handleApplyPrompt}
            className="bg-white/80 backdrop-blur-xs text-brand-plum text-xs px-3 py-1.5 rounded-lg border border-purple-200/50 hover:bg-white hover:shadow-xs transition-all font-medium"
          >
            Use this prompt
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveEntry} className="bg-white rounded-2xl border border-purple-100/80 p-6 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-medium text-brand-deep border-b border-gray-100 pb-2">Record a New Reflection</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Theme/Topic</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-brand-bg/20 rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400"
              >
                {THEMES.map(theme => (
                  <option key={theme.value} value={theme.value}>{theme.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Title of Entry</label>
              <input
                type="text"
                placeholder="E.g., Walking with confidence, healing season..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Your Sacred Thoughts</label>
            <textarea
              placeholder="This is your safe space. Be authentic, honest, and loving with yourself..."
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full p-4 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-sans leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-brand-deep text-white text-sm font-medium py-2.5 px-5 rounded-xl hover:bg-brand-plum transition-all flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              Save to My Journal
            </button>
          </div>
        </form>
      </div>

      {/* History and Companion Column */}
      <div className="lg:col-span-5 space-y-6">
        {/* Companion Reflection View */}
        {viewingReflectionForId && (
          <div className="bg-purple-950 text-white rounded-2xl p-6 shadow-md border border-purple-800/50 animate-fade-in relative overflow-hidden">
            <div className="absolute right-[-10px] bottom-[-10px] opacity-10">
              <Sparkles className="w-32 h-32 text-amber-200" />
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-amber-400/20 p-1.5 rounded-lg border border-amber-400/30">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-amber-200">Heart-to-Heart Companion</h4>
                  <p className="text-[10px] text-purple-200">Empowering response powered by AI</p>
                </div>
              </div>
              <button 
                onClick={() => { setViewingReflectionForId(null); setCompanionReflection(''); }}
                className="text-xs text-purple-300 hover:text-white"
              >
                Close
              </button>
            </div>

            {isLoadingReflection ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-200 animate-spin" />
                <p className="text-xs text-purple-200 italic font-light">Kgomotso\'s AI companion is reading your words and formulating a heart-centered response...</p>
              </div>
            ) : reflectionError ? (
              <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-xl flex items-start gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Connection Issue</p>
                  <p>{reflectionError}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-purple-200 italic font-light border-l-2 border-purple-500 pl-3">
                  In response to: &ldquo;{entries.find(e => e.id === viewingReflectionForId)?.title}&rdquo;
                </p>
                <div className="text-xs md:text-sm font-light leading-relaxed text-purple-100 whitespace-pre-wrap font-sans max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {companionReflection}
                </div>
                <div className="pt-3 border-t border-purple-800 flex justify-end">
                  <span className="font-serif italic text-xs text-amber-200">— Your Girls Talk Companion</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Entries List */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
            <BookOpen className="w-4 h-4 text-brand-deep" />
            <h4 className="font-serif text-base font-semibold text-brand-deep">Your Saved Reflections</h4>
            <span className="text-xs bg-purple-50 text-brand-plum font-semibold px-2 py-0.5 rounded-full border border-purple-100">
              {entries.length}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <Feather className="w-8 h-8 mx-auto text-gray-300 mb-2.5" />
              <p className="text-xs font-light">No journal entries recorded yet.</p>
              <p className="text-[10px] text-gray-300 mt-1 max-w-[200px] mx-auto">Use the templates and prompts on the left to start your reflection journey.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {entries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-xl border border-purple-100/60 bg-brand-bg/10 hover:bg-brand-bg/30 transition-all shadow-3xs relative group">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[10px] font-semibold text-brand-plum bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      {entry.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-light">{entry.date}</span>
                  </div>

                  <h5 className="font-semibold text-brand-deep text-sm mb-1">{entry.title}</h5>
                  <p className="text-xs text-brand-text/80 line-clamp-3 font-light leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>

                  <div className="mt-3.5 pt-2.5 border-t border-purple-100/40 flex justify-between items-center opacity-90">
                    <button
                      onClick={() => handleRequestReflection(entry)}
                      className="text-[11px] font-medium text-brand-plum hover:text-purple-900 flex items-center gap-1 transition-all"
                    >
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      Get Heart-to-Heart Reflection
                    </button>

                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

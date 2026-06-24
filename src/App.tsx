import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TabType } from './types';
import { Sparkles, Heart, Menu, X, ArrowRight, BookOpen, Clock, HeartHandshake, FileText, Compass, Send, ArrowUp, ArrowLeft, User, Share2, Flower2, Instagram, Facebook, Linkedin } from 'lucide-react';
import HomeTab from './components/HomeTab';
import AboutTab from './components/AboutTab';
import EventsTab from './components/EventsTab';
import WheelOfLife from './components/WheelOfLife';
import JournalSpace from './components/JournalSpace';
import ContactTab from './components/ContactTab';
import { BLOGS, BRAND_TAGLINE, FOUNDER_NAME } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesSubTab, setResourcesSubTab] = useState<'journal' | 'blog'>('journal');
  
  // Blog Post read view state
  const [selectedBlog, setSelectedBlog] = useState<typeof BLOGS[0] | null>(null);
  
  // Floating Scroll to Top state
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Custom Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll to top on tab change to feel like a real page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Read URL hash on mount for deep linking (e.g. #contact)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as TabType;
    if (['home', 'about', 'events', 'community', 'resources', 'contact'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Scroll event listener for showing scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global custom toast listener
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type: 'success' | 'info' | 'error' }>;
      if (customEvent.detail) {
        setToast({
          message: customEvent.detail.message,
          type: customEvent.detail.type
        });
      }
    };
    window.addEventListener('girls_talk_toast', handleToastEvent);
    return () => window.removeEventListener('girls_talk_toast', handleToastEvent);
  }, []);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleTabSelection = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab;
    setMobileMenuOpen(false);
    setSelectedBlog(null);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    // Simulate subscription process
    setNewsletterSubscribed(true);
    setNewsletterEmail('');

    // Delightful brand-colored confetti burst
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#3B0764', '#D8B4FE', '#C5A880', '#4C1D95', '#FFF1F2']
      });
    } catch (err) {
      console.warn("Confetti error:", err);
    }

    // Trigger toast notification
    const event = new CustomEvent('girls_talk_toast', {
      detail: { 
        message: "Welcome to the sisterhood! You have successfully subscribed to our newsletter.", 
        type: 'success' 
      }
    });
    window.dispatchEvent(event);

    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col justify-between selection:bg-purple-100 selection:text-brand-deep font-sans">
      
      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-purple-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Brand Emblem */}
          <button 
            onClick={() => handleTabSelection('home')}
            className="flex items-center gap-2.5 text-left group hover:opacity-95 transition-opacity"
            id="logo-brand-button"
          >
            <div className="bg-brand-deep text-white p-2.5 rounded-xl border border-purple-900/40 flex items-center justify-center shadow-xs">
              <Flower2 className="w-5 h-5 text-amber-200 animate-pulse" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg md:text-xl tracking-wide text-brand-deep uppercase block leading-none">
                Girls Talk
              </span>
              <span className="text-[10px] uppercase tracking-widest font-light text-brand-gold mt-1 block">
                with Kgomotso
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 font-medium text-xs md:text-sm">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'events', label: 'Events' },
              { id: 'community', label: 'Life Wheel' },
              { id: 'resources', label: 'Resources & Journal' },
              { id: 'contact', label: 'Contact' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelection(tab.id as TabType)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-semibold ${
                    isActive
                      ? 'bg-brand-deep text-white shadow-3xs'
                      : 'text-gray-500 hover:text-brand-deep hover:bg-brand-deep/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Action Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-deep hover:bg-brand-deep/5 rounded-xl transition-all"
            aria-label="Toggle navigation"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 border-b border-purple-100 animate-fade-in absolute w-full top-20 left-0 py-6 px-4 shadow-md space-y-2 flex flex-col">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'events', label: 'Events & Gathering' },
              { id: 'community', label: 'The Life Wheel' },
              { id: 'resources', label: 'Resources & Reflection Journal' },
              { id: 'contact', label: 'Contact' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelection(tab.id as TabType)}
                  className={`w-full text-left px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? 'bg-brand-deep text-white shadow-3xs'
                      : 'text-gray-600 hover:text-brand-deep hover:bg-brand-deep/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* 2. Main Page Content Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex-grow w-full">
        
        {/* Render Tab Views Dynamically */}
        {activeTab === 'home' && <HomeTab onTabChange={handleTabSelection} />}
        
        {activeTab === 'about' && <AboutTab />}
        
        {activeTab === 'events' && <EventsTab />}
        
        {activeTab === 'community' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-deep/5 px-3 py-1 rounded-md">
                Interactive Community Alignment
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-medium text-brand-deep">
                The Sacred Circle Space
              </h1>
              <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
                Empowering women through intentional alignment. Utilize our dynamic digital tools below to audit your life balance and explore supportive reflection.
              </p>
              <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
            </div>

            <WheelOfLife />
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-12 animate-fade-in">
            {/* Header section with toggle sub tabs */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-deep/5 px-3 py-1 rounded-md">
                Reflections & Reading
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-medium text-brand-deep">
                The Sacred Scroll
              </h1>
              <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
                A comforting collection of personal tools, guided reflections, and upcoming written teachings to nourish your healing and growth.
              </p>
              
              {/* Toggle controls */}
              <div className="inline-flex bg-purple-50 p-1.5 rounded-xl border border-purple-100/50 mt-4">
                <button
                  onClick={() => { setResourcesSubTab('journal'); setSelectedBlog(null); }}
                  className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    resourcesSubTab === 'journal'
                      ? 'bg-brand-deep text-white shadow-3xs'
                      : 'text-gray-500 hover:text-brand-deep'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Self-Reflection Journal
                </button>
                <button
                  onClick={() => { setResourcesSubTab('blog'); setSelectedBlog(null); }}
                  className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    resourcesSubTab === 'blog'
                      ? 'bg-brand-deep text-white shadow-3xs'
                      : 'text-gray-500 hover:text-brand-deep'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Teachings & Blogs
                </button>
              </div>
            </div>

            {/* Display correct view */}
            {resourcesSubTab === 'journal' ? (
              <JournalSpace />
            ) : selectedBlog ? (
              /* Selected Blog Full Reader View */
              <div className="bg-white rounded-3xl border border-purple-100 p-6 md:p-12 shadow-3xs space-y-8 animate-fade-in max-w-4xl mx-auto">
                {/* Back button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="flex items-center gap-2 text-brand-deep hover:text-brand-gold font-semibold text-sm transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Teachings & Blogs
                </button>

                {/* Hero / Header information */}
                <div className="space-y-4 border-b border-purple-50 pb-8">
                  <div className="flex flex-wrap gap-3 items-center text-xs md:text-sm">
                    <span className="font-bold text-brand-plum bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      {selectedBlog.category}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedBlog.readTime}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-brand-gold font-semibold uppercase tracking-wider">
                      {selectedBlog.date}
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl md:text-5xl font-medium text-brand-deep leading-tight">
                    {selectedBlog.title}
                  </h1>

                  <div className="flex items-center gap-3 pt-2 text-xs md:text-sm text-gray-500">
                    <div className="w-10 h-10 rounded-full bg-brand-deep text-white border border-purple-100 flex items-center justify-center font-bold font-serif text-sm">
                      KK
                    </div>
                    <div>
                      <p className="font-bold text-brand-deep">{FOUNDER_NAME}</p>
                      <p className="font-light text-[11px] uppercase tracking-wider text-brand-gold">Founder & Transformational Facilitator</p>
                    </div>
                  </div>
                </div>

                {/* Article Content Rendered beautifully */}
                <div className="prose prose-purple max-w-none space-y-4 text-gray-700 font-light text-sm md:text-base leading-relaxed">
                  {selectedBlog.content ? (
                    selectedBlog.content.split('\n').map((line, idx) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith('### ')) {
                        return <h3 key={idx} className="font-serif text-2xl md:text-3xl font-bold text-brand-deep mt-8 mb-4 tracking-tight">{trimmed.replace('### ', '')}</h3>;
                      }
                      if (trimmed.startsWith('#### ')) {
                        return <h4 key={idx} className="font-serif text-lg md:text-xl font-semibold text-brand-plum mt-6 mb-3">{trimmed.replace('#### ', '')}</h4>;
                      }
                      if (trimmed.startsWith('* **')) {
                        const match = trimmed.match(/^\*\s+\*\*(.*?)\*\*(.*)/);
                        if (match) {
                          return (
                            <li key={idx} className="ml-5 list-disc text-gray-700 text-sm md:text-base leading-relaxed my-2">
                              <strong>{match[1]}</strong>{match[2]}
                            </li>
                          );
                        }
                      }
                      if (trimmed.startsWith('* ')) {
                        return (
                          <li key={idx} className="ml-5 list-disc text-gray-700 text-sm md:text-base leading-relaxed my-2">
                            {trimmed.replace('* ', '')}
                          </li>
                        );
                      }
                      if (trimmed.startsWith('*')) {
                        return (
                          <li key={idx} className="ml-5 list-disc text-gray-700 text-sm md:text-base leading-relaxed my-2">
                            {trimmed.substring(1).trim()}
                          </li>
                        );
                      }
                      if (trimmed.startsWith('"') || trimmed.startsWith('*"')) {
                        const cleanQuote = trimmed.replace(/^\*?"|"\*?$/g, '');
                        return (
                          <blockquote key={idx} className="border-l-4 border-brand-gold bg-brand-deep/5 px-6 py-4 rounded-r-xl italic text-brand-deep my-6 text-sm md:text-base leading-relaxed">
                            {cleanQuote}
                          </blockquote>
                        );
                      }
                      if (trimmed === '') {
                        return <div key={idx} className="h-2" />;
                      }
                      return <p key={idx} className="text-gray-700 font-light text-sm md:text-base leading-relaxed my-4">{trimmed}</p>;
                    })
                  ) : (
                    <p>{selectedBlog.excerpt}</p>
                  )}
                </div>

                {/* Reader view footer with share option or subscribe */}
                <div className="border-t border-purple-50 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xs text-gray-400">
                    Thank you for reading the Girls Talk library. Share this wisdom with your sisterhood.
                  </div>
                  <button
                    onClick={() => {
                      const shareText = `"${selectedBlog.title}" - A powerful written teaching by ${FOUNDER_NAME} on Girls Talk.\nRead more here: ${window.location.href}`;
                      if (navigator.share) {
                        navigator.share({
                          title: selectedBlog.title,
                          text: shareText,
                          url: window.location.href
                        }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(shareText);
                        const event = new CustomEvent('girls_talk_toast', {
                          detail: { message: "Article link copied to clipboard!", type: 'success' }
                        });
                        window.dispatchEvent(event);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-deep hover:bg-brand-deep/90 text-white text-xs font-semibold cursor-pointer transition-all shadow-3xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share Article
                  </button>
                </div>
              </div>
            ) : (
              /* Blogs Grid List */
              <div className="space-y-10 animate-fade-in">
                {/* Clean Info Bar instead of Warning */}
                <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto text-xs md:text-sm text-brand-deep font-light shadow-3xs">
                  <BookOpen className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-0.5 text-brand-plum">Soul-Nourishing Teachings & Blogs</p>
                    <p className="text-gray-500">Welcome to the Girls Talk library. Explore deep written guidance from our founder Kgomotso Khalo to accompany your healing, restoration, and alignment journey.</p>
                  </div>
                </div>

                {/* Blogs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {BLOGS.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-2xl border border-purple-100 shadow-3xs overflow-hidden flex flex-col justify-between hover:shadow-2xs hover:border-purple-200/60 transition-all group">
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-brand-plum bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                            {blog.category}
                          </span>
                          <span className="text-brand-gold font-semibold uppercase tracking-wider flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.readTime}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-brand-deep leading-snug group-hover:text-brand-gold transition-colors">
                          {blog.title}
                        </h3>

                        <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="px-6 py-4 border-t border-purple-50 bg-brand-bg/10 flex justify-between items-center text-xs text-gray-400">
                        <span className="text-gray-400">{blog.date}</span>
                        <button
                          onClick={() => setSelectedBlog(blog)}
                          className="text-xs text-brand-plum font-semibold flex items-center gap-1 hover:text-brand-gold transition-colors cursor-pointer"
                        >
                          Read Article
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'contact' && <ContactTab />}

      </main>

      {/* 3. Footer */}
      <footer className="bg-brand-deep text-white border-t border-purple-950 pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-5 text-purple-200">
            <div className="flex items-center gap-2.5">
              <div className="bg-white text-brand-deep p-2 rounded-lg flex items-center justify-center shadow-xs">
                <Flower2 className="w-4 h-4 text-brand-gold" />
              </div>
              <span className="font-serif font-bold text-lg text-white tracking-wide uppercase">
                Girls Talk
              </span>
            </div>
            <p className="text-xs md:text-sm font-light leading-relaxed text-purple-100 max-w-sm">
              An empowering, heart-centered platform designed to help women create lives of purpose, confidence, and alignment through meaningful sisterhood, training workshops, and community outreach.
            </p>
            <p className="text-xs font-serif italic text-amber-200">
              "{BRAND_TAGLINE}"
            </p>
            
            {/* Social Media Footer Component */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-300 block">Follow Our Journey</span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-purple-950/50 hover:bg-brand-gold hover:text-brand-deep border border-purple-850 flex items-center justify-center transition-all duration-300 text-purple-200"
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-purple-950/50 hover:bg-brand-gold hover:text-brand-deep border border-purple-850 flex items-center justify-center transition-all duration-300 text-purple-200"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-purple-950/50 hover:bg-brand-gold hover:text-brand-deep border border-purple-850 flex items-center justify-center transition-all duration-300 text-purple-200"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-amber-100 text-sm font-semibold tracking-wider uppercase border-b border-purple-900 pb-2">
              Explore Paths
            </h4>
            <div className="flex flex-col gap-2 text-xs text-purple-200">
              <button onClick={() => handleTabSelection('home')} className="text-left hover:text-white transition-colors cursor-pointer">Home</button>
              <button onClick={() => handleTabSelection('about')} className="text-left hover:text-white transition-colors cursor-pointer">About</button>
              <button onClick={() => handleTabSelection('events')} className="text-left hover:text-white transition-colors cursor-pointer">Events</button>
              <button onClick={() => handleTabSelection('community')} className="text-left hover:text-white transition-colors cursor-pointer">Life Wheel</button>
              <button onClick={() => handleTabSelection('resources')} className="text-left hover:text-white transition-colors cursor-pointer">Reflections</button>
              <button onClick={() => handleTabSelection('contact')} className="text-left hover:text-white transition-colors cursor-pointer">Contact</button>
            </div>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-amber-100 text-sm font-semibold tracking-wider uppercase border-b border-purple-900 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-2 text-xs text-purple-200">
              <p className="break-all">Email: <a href="mailto:Kgomotsokhalo@tukuhospitality.africa" className="hover:text-amber-200 transition-colors">Kgomotsokhalo@tukuhospitality.africa</a></p>
              <p className="break-all">Alt: <a href="mailto:tuku40@yahoo.com" className="hover:text-amber-200 transition-colors">tuku40@yahoo.com</a></p>
              <p>Phone: <a href="tel:0760551994" className="hover:text-amber-200 transition-colors">0760551994</a></p>
              <p>Location: South Africa</p>
            </div>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-amber-100 text-sm font-semibold tracking-wider uppercase border-b border-purple-900 pb-2">
              Our Newsletter
            </h4>
            <p className="text-xs text-purple-200 font-light leading-relaxed">
              Stay connected with spiritual inspiration, upcoming outdoor picnics, hikes, and exclusive teachings.
            </p>
            {newsletterSubscribed ? (
              <div className="bg-purple-950/55 p-3 rounded-xl border border-purple-800/40 text-[11px] text-amber-200 italic font-light animate-fade-in">
                Thank you! You have been subscribed with love.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-purple-950/40 text-xs px-3 py-2.5 rounded-xl border border-purple-800/50 focus:outline-none focus:ring-1 focus:ring-purple-400 placeholder:text-purple-300 font-light pr-10 text-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bg-brand-gold text-brand-deep hover:bg-amber-300 p-1.5 rounded-lg transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[10px] text-purple-300 font-light block">We respect your privacy. Unsubscribe anytime.</span>
              </form>
            )}
          </div>

        </div>

        {/* Legal block */}
        <div className="max-w-7xl mx-auto border-t border-purple-900/60 mt-12 pt-8 text-center text-[10px] text-purple-300 font-light space-y-1.5">
          <p>© {new Date().getFullYear()} Girls Talk with Kgomotso. All Rights Reserved.</p>
          <p>Heal with faith. Grow with intention. Thrive with alignment. Give with love.</p>
        </div>
      </footer>

      {/* Floating Elements (Scroll to Top, Toast Notification) */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-brand-deep text-white p-3 rounded-full shadow-lg border border-purple-800/20 hover:bg-brand-plum transition-all hover:scale-105 active:scale-95 z-40 flex items-center justify-center cursor-pointer animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {toast && (
        <div 
          className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl backdrop-blur-md border animate-fade-in ${
            toast.type === 'success' 
              ? 'bg-emerald-900/95 text-white border-emerald-500/30' 
              : toast.type === 'error'
              ? 'bg-rose-950/95 text-white border-rose-500/30'
              : 'bg-brand-deep/95 text-white border-purple-500/30'
          }`}
        >
          {toast.type === 'success' ? (
            <div className="bg-emerald-500/20 p-1.5 rounded-lg text-emerald-300">
              <Sparkles className="w-4 h-4" />
            </div>
          ) : (
            <div className="bg-purple-500/20 p-1.5 rounded-lg text-amber-200">
              <Heart className="w-4 h-4" />
            </div>
          )}
          <p className="text-xs md:text-sm font-light text-white">{toast.message}</p>
        </div>
      )}

    </div>
  );
}

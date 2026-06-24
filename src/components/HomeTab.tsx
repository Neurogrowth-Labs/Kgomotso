import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import { ArrowRight, Sparkles, HeartHandshake, TrendingUp, Gift, Quote, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS, WHATSAPP_GROUP_LINK } from '../data';

interface HomeTabProps {
  onTabChange: (tab: TabType) => void;
}

export default function HomeTab({ onTabChange }: HomeTabProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-play interval for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Use the exact generated image paths!
  const kgomotsoImage = "/src/assets/images/kgomotso_portrait_1782250444532.jpg";
  const picnicImage = "/src/assets/images/girls_talk_picnic_1782250460316.jpg";
  const conferenceImage = "/src/assets/images/heart_conference_1782250491307.jpg";

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in" id="home-tab-view">
      
      {/* 1. Hero Section (Transformation Focus) */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-deep text-white py-16 md:py-24 px-6 md:px-12 shadow-md">
        {/* Background Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep via-brand-plum to-purple-900 opacity-90" />
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-lilac/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-amber-100">
            Empowering Women to <br className="hidden md:inline" />
            <span className="text-white relative inline-block">
              Grow, Lead & Thrive
            </span>
          </h1>

          <p className="text-purple-100 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Helping women create lives of purpose, confidence, and fulfilment through meaningful conversations, personal development, and transformative experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-brand-deep hover:bg-amber-100 px-6 py-3.5 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 text-sm md:text-base border border-amber-300/30"
            >
              Join the Community
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onTabChange('events')}
              className="bg-white/10 text-white hover:bg-white/20 px-6 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm md:text-base border border-white/20"
            >
              <Calendar className="w-4.5 h-4.5 text-amber-200" />
              Attend an Event
            </button>
            <button
              onClick={() => onTabChange('about')}
              className="text-amber-200 hover:text-white font-medium px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm md:text-base"
            >
              Meet Kgomotso
            </button>
          </div>
        </div>
      </section>

      {/* 2. Meet Kgomotso Quote Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-5 relative group">
          <div className="absolute inset-0 bg-brand-gold/20 rounded-2xl transform translate-x-2.5 translate-y-2.5 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform" />
          <div className="aspect-square rounded-2xl overflow-hidden border border-purple-100 shadow-sm bg-white">
            <img
              src={kgomotsoImage}
              alt="Kgomotso Khalo - Founder of Girls Talk"
              className="w-full h-full object-cover grayscale-xs hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-deep/5 px-3 py-1 rounded-md">
            The Visionary Behind the Movement
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-medium text-brand-deep">
            Meet Kgomotso
          </h2>

          <div className="relative">
            <Quote className="w-10 h-10 text-brand-gold/20 absolute -top-4 -left-3 -z-10" />
            <p className="font-serif text-lg md:text-xl lg:text-2xl text-brand-deep/90 italic leading-relaxed font-light pl-6">
              "I created Girls Talk because I believe every woman deserves a space to grow, be heard, and discover her true potential."
            </p>
          </div>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light pl-6">
            Girls Talk with Kgomotso is a movement dedicated to empowering women to live purposeful, balanced, and impactful lives, born from a personal journey of healing, faith, and transformation.
          </p>

          <div className="pt-2 pl-6">
            <button
              onClick={() => onTabChange('about')}
              className="text-brand-plum hover:text-brand-deep font-semibold text-sm flex items-center gap-1.5 group transition-colors"
            >
              Read Her Full Story
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Pillars Overview Section */}
      <section className="bg-white rounded-3xl border border-purple-100/50 p-8 md:p-12 shadow-2xs space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-brand-plum uppercase tracking-wider">Our Core Pillars</span>
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-deep">Four Pillars of Alignment</h3>
          <p className="text-gray-500 text-xs md:text-sm font-light">
            We structure our community experiences and content around four foundational paths of development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Heal */}
          <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 hover:bg-purple-50 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-purple-100 w-10 h-10 rounded-xl flex items-center justify-center text-purple-700">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-semibold text-brand-deep text-lg">Heal</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Healing is the foundation of growth. We create safe spaces for honest conversations, support, and restoration.
              </p>
            </div>
            <button onClick={() => onTabChange('events')} className="text-purple-700 hover:text-purple-900 font-semibold text-xs mt-6 flex items-center gap-1">
              Heart-to-Heart Conference <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 2: Grow */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 hover:bg-amber-50 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-amber-100 w-10 h-10 rounded-xl flex items-center justify-center text-amber-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-semibold text-brand-deep text-lg">Grow</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Growth is intentional. We encourage continuous development spiritually, personally, financially, and emotionally.
              </p>
            </div>
            <button onClick={() => onTabChange('community')} className="text-amber-700 hover:text-amber-900 font-semibold text-xs mt-6 flex items-center gap-1">
              Measure Your Life Wheel <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 3: Thrive */}
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100 hover:bg-rose-50 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center text-rose-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-semibold text-brand-deep text-lg">Thrive</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Living confidently and purposefully. Stepping boldly into your identity without seeking permission to exist.
              </p>
            </div>
            <button onClick={() => onTabChange('events')} className="text-rose-700 hover:text-rose-900 font-semibold text-xs mt-6 flex items-center gap-1">
              A Woman in Full Alignment <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Pillar 4: Give */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center text-emerald-700">
                <Gift className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-semibold text-brand-deep text-lg">Give</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                True growth extends beyond ourselves. We serve communities through outreach, meals, donation drives, and literacy.
              </p>
            </div>
            <button onClick={() => onTabChange('events')} className="text-emerald-700 hover:text-emerald-900 font-semibold text-xs mt-6 flex items-center gap-1">
              Girls Talk Gives Back <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Interactive Call to Action Panel */}
      <section className="bg-gradient-to-br from-brand-bg to-purple-50 rounded-3xl p-8 md:p-12 border border-purple-100 shadow-2xs grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-deep">
            How Balanced Is Your Wheel of Life?
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
            Take a moment to evaluate your current satisfaction across spiritual, health, career, financial, personal growth, and relationship realms. Get instant, tailored guidance written in Kgomotso\'s voice to support you in your current season.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onTabChange('community')}
              className="bg-brand-deep text-white hover:bg-brand-plum px-5 py-3 rounded-xl font-medium text-xs md:text-sm shadow-xs transition-all flex items-center gap-2"
            >
              Begin Free Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-purple-100 shadow-xs bg-white flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-deep/30 z-10" />
          <img
            src={picnicImage}
            alt="Girls Talk Picnic Gatherings"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute z-20 bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-purple-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-plum">Next Gathering</span>
              <p className="font-serif font-medium text-brand-deep text-xs md:text-sm">Girls Talk Picnic Series</p>
            </div>
            <button
              onClick={() => onTabChange('events')}
              className="text-[10px] bg-brand-deep text-white px-2.5 py-1.5 rounded-md hover:bg-brand-plum font-semibold transition-colors"
            >
              View Info
            </button>
          </div>
        </div>
      </section>

      {/* 5. Testimonial Showcase Carousel */}
      <section className="space-y-8 max-w-4xl mx-auto" id="testimonials-carousel-section">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-brand-plum uppercase tracking-wider block">Voices from our Sisterhood</span>
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-deep">What Our Sisters Say</h3>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative bg-white rounded-3xl border border-purple-100 p-8 md:p-14 shadow-3xs overflow-hidden flex flex-col md:flex-row items-center gap-6 min-h-[220px]">
          {/* Large decorative quotation mark background */}
          <Quote className="absolute -top-6 -left-6 w-32 h-32 text-purple-50/40 select-none pointer-events-none" />

          {/* Nav Arrows - Hidden on mobile, shown on desktop */}
          <div className="absolute inset-y-0 left-4 md:flex items-center hidden">
            <button
              onClick={handlePrevTestimonial}
              className="p-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-brand-deep hover:text-brand-gold transition-all border border-purple-100/50 cursor-pointer shadow-3xs"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 md:flex items-center hidden">
            <button
              onClick={handleNextTestimonial}
              className="p-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-brand-deep hover:text-brand-gold transition-all border border-purple-100/50 cursor-pointer shadow-3xs"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial Content Container */}
          <div key={activeTestimonial} className="relative w-full text-center md:text-left space-y-6 px-4 md:px-12 animate-fade-in flex flex-col justify-between h-full">
            <p className="font-serif text-lg md:text-xl lg:text-2xl text-brand-deep font-light leading-relaxed italic">
              &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-deep text-white border border-purple-100 flex items-center justify-center font-bold font-serif text-sm shadow-3xs">
                  {TESTIMONIALS[activeTestimonial].author.split(' ')[0][0]}
                  {TESTIMONIALS[activeTestimonial].author.split(' ')[1]?.[0] || ''}
                </div>
                <div className="text-left">
                  <h5 className="font-serif font-bold text-sm text-brand-deep">{TESTIMONIALS[activeTestimonial].author}</h5>
                  <span className="text-[11px] text-brand-gold font-light uppercase tracking-wider">{TESTIMONIALS[activeTestimonial].role}</span>
                </div>
              </div>

              {/* Mobile Arrows inside Card */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={handlePrevTestimonial}
                  className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 text-brand-deep transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 text-brand-deep transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots Indicators */}
        <div className="flex justify-center gap-2 pt-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                index === activeTestimonial ? 'w-8 bg-brand-deep' : 'w-2.5 bg-purple-100 hover:bg-purple-200'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

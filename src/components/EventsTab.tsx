import React, { useState } from 'react';
import { 
  Quote, Calendar, MapPin, Sparkles, Heart, Footprints, ShieldCheck, 
  Camera, X, ChevronLeft, ChevronRight, CreditCard, Send, CheckCircle2, 
  Loader2, Mail, Phone, Ticket, AlertCircle, Info, HelpCircle, Share2
} from 'lucide-react';

// Structured Event interface
interface EventItem {
  id: string;
  title: string;
  date: string;
  type: 'current' | 'upcoming' | 'past';
  priceType: 'free' | 'paid';
  price?: string;
  image: string;
  location: string;
  description: string;
  pillar: string;
  theme?: string;
  signatureExperiences?: string;
  galleryImages: string[];
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'current-alignment',
    title: "Presence in the Room: A Woman in Full Alignment",
    date: "July 11, 2026",
    type: 'current',
    priceType: 'paid',
    price: "R350",
    image: "/src/assets/images/journaling_workshop_1782251359503.jpg",
    location: "Pretoria, South Africa",
    description: "A transformational masterclass that empowers women to show up with confidence, elegance, and spiritual alignment. We focus on active self-reflection, physical poise, vocal resonance, and custom goal-mapping. Includes premium high-tea refreshments.",
    pillar: "Thrive",
    theme: "Presence in the Room",
    galleryImages: [
      "/src/assets/images/journaling_workshop_1782251359503.jpg",
      "/src/assets/images/sisterhood_support_1782251346013.jpg"
    ]
  },
  {
    id: 'current-picnic',
    title: "Girls Talk Outdoor Picnic Fellowship",
    date: "July 25, 2026",
    type: 'current',
    priceType: 'free',
    price: "Free",
    image: "/src/assets/images/girls_talk_picnic_1782250460316.jpg",
    location: "Johannesburg Botanical Gardens",
    description: "Connect hand-in-hand in a relaxed outdoor setting. An authentic and warm afternoon filled with deep sisterhood, custom picnic refreshments, storytelling, and shared prayers under the South African sky.",
    pillar: "Heal",
    theme: "Walking Hand-in-Hand",
    galleryImages: [
      "/src/assets/images/girls_talk_picnic_1782250460316.jpg",
      "/src/assets/images/sisterhood_support_1782251346013.jpg"
    ]
  },
  {
    id: 'upcoming-heart-conference',
    title: "Heart-to-Heart Annual Women's Conference",
    date: "October 17, 2026",
    type: 'upcoming',
    priceType: 'paid',
    price: "R550",
    image: "/src/assets/images/heart_conference_1782250491307.jpg",
    location: "Sandton Convention Centre, JHB",
    description: "Our signature annual flagship conference. A sacred and safe environment bringing together women from all walks of life for emotional restoration, powerful keynote sessions by Kgomotso Khalo, and live healing panel discussions.",
    pillar: "Heal & Grow",
    theme: "Restored to Lead",
    galleryImages: [
      "/src/assets/images/heart_conference_1782250491307.jpg"
    ]
  },
  {
    id: 'upcoming-hike',
    title: "Girls Talk Purpose & Renewal Mountain Hike",
    date: "November 14, 2026",
    type: 'upcoming',
    priceType: 'free',
    price: "Free",
    image: "/src/assets/images/girls_talk_hike_1782250476265.jpg",
    location: "Hartebeespoort, North West",
    description: "A restorative health and wellness walk combining light fitness, beautiful mountain views, structured outdoor meditation pauses, and group spiritual alignment talks. Perfect for clearing the mind for the upcoming season.",
    pillar: "Thrive",
    theme: "Rise & Climb",
    galleryImages: [
      "/src/assets/images/girls_talk_hike_1782250476265.jpg"
    ]
  },
  {
    id: 'past-retreat-2025',
    title: "Unveiling the True Self Sanctuary Retreat",
    date: "March 15, 2025",
    type: 'past',
    priceType: 'paid',
    price: "R1200",
    image: "/src/assets/images/sisterhood_support_1782251346013.jpg",
    location: "Drakensberg Mountains",
    description: "A profound 3-day quiet escape designed for spiritual clearing, soul-care journaling, and intensive group therapy. Guided entirely by Kgomotso Khalo, focusing on releasing generational baggage and walking in absolute grace.",
    pillar: "Heal",
    theme: "Unveiling the Sacred Woman",
    galleryImages: [
      "/src/assets/images/sisterhood_support_1782251346013.jpg",
      "/src/assets/images/journaling_workshop_1782251359503.jpg",
      "/src/assets/images/kgomotso_portrait_1782250444532.jpg"
    ]
  },
  {
    id: 'past-wheel-workshop',
    title: "The Wheel of Life Aligning Masterclass",
    date: "May 24, 2025",
    type: 'past',
    priceType: 'paid',
    price: "R250",
    image: "/src/assets/images/kgomotso_portrait_1782250444532.jpg",
    location: "Tuku Hospitality Base, Pretoria",
    description: "A highly practical workshop dedicated to evaluating personal goals, physical wellness, relationship safety, and career trajectories. Women designed physical vision boards and mapped their path of integrity.",
    pillar: "Grow",
    theme: "The Wheel of Alignment",
    galleryImages: [
      "/src/assets/images/kgomotso_portrait_1782250444532.jpg",
      "/src/assets/images/girls_talk_picnic_1782250460316.jpg",
      "/src/assets/images/heart_conference_1782250491307.jpg"
    ]
  }
];

export default function EventsTab() {
  // Classification tabs
  const [activeTab, setActiveTab] = useState<'current' | 'upcoming' | 'past'>('current');
  
  // Modal / Form state controls
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [formMode, setFormMode] = useState<'register' | 'payment' | 'success' | 'enquire' | 'gallery' | null>(null);

  // Form Inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regMessage, setRegMessage] = useState('');

  // Payment simulated inputs
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Gallery slider indexes
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Filtered list
  const filteredEvents = EVENTS_DATA.filter(evt => evt.type === activeTab);

  // Handlers
  const handleOpenAction = (evt: EventItem) => {
    setSelectedEvent(evt);
    if (evt.type === 'past') {
      setFormMode('gallery');
      setGalleryIndex(0);
    } else if (evt.type === 'upcoming') {
      setFormMode('enquire');
      // pre-fill clean values
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegMessage(`Hi, I'm interested in attending the "${evt.title}" upcoming event. Please keep me updated with registration dates and ticket prices.`);
    } else {
      // current event
      setFormMode('register');
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegMessage('');
    }
  };

  const handleShareEvent = (evt: EventItem) => {
    const shareText = `Join me at the "${evt.title}" on ${evt.date} located in ${evt.location}! Theme: "${evt.theme || ''}". Find out more and secure your spot on Girls Talk!`;
    if (navigator.share) {
      navigator.share({
        title: evt.title,
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      // Dispatch custom toast notification
      const toastEvent = new CustomEvent('girls_talk_toast', {
        detail: {
          message: "Event details and link copied to clipboard!",
          type: 'success'
        }
      });
      window.dispatchEvent(toastEvent);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (selectedEvent.priceType === 'free') {
      // Free event - direct finalized
      setFormMode('success');
      
      // Dispatch custom toast notification
      const toastEvent = new CustomEvent('girls_talk_toast', {
        detail: {
          message: `Success! Registered for "${selectedEvent.title}". Check your inbox.`,
          type: 'success'
        }
      });
      window.dispatchEvent(toastEvent);
    } else {
      // Paid event - redirect to payment
      setFormMode('payment');
      setCardHolder('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);

    setTimeout(() => {
      setPaymentProcessing(false);
      setFormMode('success');

      // Dispatch custom toast notification
      const toastEvent = new CustomEvent('girls_talk_toast', {
        detail: {
          message: `Payment successful! Ticket secured for "${selectedEvent?.title}".`,
          type: 'success'
        }
      });
      window.dispatchEvent(toastEvent);
    }, 2500);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormMode('success');

    // Dispatch custom toast notification
    const toastEvent = new CustomEvent('girls_talk_toast', {
      detail: {
        message: `Thank you for your inquiry about "${selectedEvent?.title}". We will respond soon!`,
        type: 'success'
      }
    });
    window.dispatchEvent(toastEvent);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setFormMode(null);
  };

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in" id="events-tab-view">
      
      {/* 1. Header Hero */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-deep/5 px-3 py-1 rounded-md">
          Gatherings & Fellowship
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-brand-deep">
          Empowering Experiences
        </h1>
        <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
          Step into curated physical and spiritual spaces. We invite you to join our community of sisters who walk with intention, healing, and absolute grace.
        </p>
        <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
      </section>

      {/* 2. Classification Tab Selector */}
      <section className="max-w-md mx-auto">
        <div className="flex bg-purple-50 p-1.5 rounded-2xl border border-purple-100/50 justify-between">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-3 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'current'
                ? 'bg-brand-deep text-white shadow-3xs'
                : 'text-gray-500 hover:text-brand-deep'
            }`}
          >
            Current Events
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'upcoming'
                ? 'bg-brand-deep text-white shadow-3xs'
                : 'text-gray-500 hover:text-brand-deep'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'past'
                ? 'bg-brand-deep text-white shadow-3xs'
                : 'text-gray-500 hover:text-brand-deep'
            }`}
          >
            Past Highlights
          </button>
        </div>
      </section>

      {/* 3. Event List Render Stage */}
      <section className="space-y-12">
        
        {/* Empty State Guard */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-purple-100/40 p-8 max-w-lg mx-auto">
            <Calendar className="w-12 h-12 text-purple-300 mx-auto mb-4 stroke-1 animate-pulse" />
            <h3 className="font-serif text-lg font-semibold text-brand-deep">No Gatherings Found</h3>
            <p className="text-gray-500 font-light text-xs md:text-sm mt-1">
              There are no {activeTab} events listed right now. Check back with us or follow our newsletter for live updates!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredEvents.map((evt) => (
              <div 
                key={evt.id} 
                className="bg-white rounded-3xl border border-purple-100/60 overflow-hidden shadow-3xs hover:shadow-2xs transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Event Thumbnail */}
                  <div className="h-52 md:h-60 relative overflow-hidden bg-purple-50">
                    <img 
                      src={evt.image} 
                      alt={evt.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-brand-deep/90 backdrop-blur-xs text-white text-[9px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full">
                        Pillar: {evt.pillar}
                      </span>
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                        evt.priceType === 'free' 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-amber-100 text-amber-950 border border-amber-300/30'
                      }`}>
                        {evt.priceType === 'free' ? 'Free Admission' : `Price: ${evt.price}`}
                      </span>
                    </div>

                    {evt.theme && (
                      <div className="absolute bottom-4 left-4 bg-black/55 backdrop-blur-xs text-amber-100 text-[10px] font-medium font-serif italic px-3 py-1 rounded-lg">
                        Theme: "{evt.theme}"
                      </div>
                    )}
                  </div>

                  {/* Core Text Info */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-brand-plum">
                        <Calendar className="w-3.5 h-3.5" />
                        {evt.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {evt.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-brand-deep leading-snug group-hover:text-brand-plum transition-colors">
                      {evt.title}
                    </h3>

                    <p className="text-gray-600 font-light text-xs md:text-sm leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>

                {/* Event Primary CTA Drawer */}
                <div className="p-6 border-t border-purple-50 bg-brand-bg/10 flex justify-between items-center gap-4">
                  <button
                    onClick={() => handleShareEvent(evt)}
                    className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-brand-plum hover:text-brand-deep transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-purple-100/50 shadow-3xs"
                    title="Share Event"
                  >
                    <Share2 className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Share</span>
                  </button>

                  {evt.type === 'current' && (
                    <button
                      onClick={() => handleOpenAction(evt)}
                      className="bg-brand-deep text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-plum hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs"
                    >
                      <Ticket className="w-3.5 h-3.5 text-amber-200" />
                      Register Now
                    </button>
                  )}

                  {evt.type === 'upcoming' && (
                    <button
                      onClick={() => handleOpenAction(evt)}
                      className="border border-brand-deep text-brand-deep hover:bg-brand-deep hover:text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      Enquire Details
                    </button>
                  )}

                  {evt.type === 'past' && (
                    <button
                      onClick={() => handleOpenAction(evt)}
                      className="bg-purple-50 text-brand-deep hover:bg-purple-100 text-xs font-semibold px-5 py-2.5 rounded-xl hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5 border border-purple-200/50"
                    >
                      <Camera className="w-3.5 h-3.5 text-brand-gold" />
                      View Gallery
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* 4. Beautiful Centered Inspirational Block */}
      <section className="max-w-4xl mx-auto bg-brand-deep/5 p-8 rounded-3xl border border-purple-100/50 text-center space-y-4 relative overflow-hidden">
        <Quote className="w-12 h-12 text-brand-gold/15 mx-auto absolute inset-0 m-auto -z-10" />
        <p className="font-serif text-base md:text-lg lg:text-xl text-brand-deep/90 italic font-light max-w-2xl mx-auto leading-relaxed">
          "A woman in full alignment does not seek permission to exist. She enters every room with confidence, grace, and the quiet assurance of knowing who she is."
        </p>
        <span className="block text-xs font-semibold tracking-wider text-brand-plum uppercase">— Theme: Presence in the Room</span>
      </section>

      {/* 5. Interactive Form Modal System */}
      {selectedEvent && formMode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in overflow-y-auto">
          
          <div 
            className="bg-white rounded-3xl max-w-xl w-full border border-purple-100 overflow-hidden relative shadow-2xl my-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header bar */}
            <div className="bg-brand-deep text-white px-6 py-5 flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase tracking-widest font-semibold text-amber-200 block">
                  {selectedEvent.type === 'current' ? 'Event Registration' : selectedEvent.type === 'upcoming' ? 'Event Inquiry' : 'Past Highlights'}
                </span>
                <h3 className="font-serif text-sm md:text-base font-semibold text-white leading-tight line-clamp-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-purple-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Flows */}
            <div className="p-6 md:p-8">

              {/* FLOW A: Registration Form (Name, Email, Phone, Message) */}
              {formMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100/40 text-xs text-brand-deep/95 space-y-1.5 font-light">
                    <p className="font-bold text-brand-plum flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Admission Mode
                    </p>
                    <p>
                      You are registering for a <strong>{selectedEvent.priceType}</strong> event. 
                      {selectedEvent.priceType === 'paid' 
                        ? ` After registration, you will be directed to pay the entry fee of ${selectedEvent.price} to finalize secure ticketing.` 
                        : " Once submitted, your free admission ticket will be stored and emailed to you directly."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="E.g., Nomsa Khumalo"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="E.g., nomsa@example.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="E.g., 076 055 1994"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Special Notes or Dietary Requirements (Optional)</label>
                      <textarea 
                        rows={3}
                        placeholder="Let us know if you have any questions or specifications..."
                        value={regMessage}
                        onChange={(e) => setRegMessage(e.target.value)}
                        className="w-full p-4 text-xs rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-purple-50">
                    <button 
                      type="button" 
                      onClick={handleCloseModal}
                      className="text-xs font-semibold text-gray-500 hover:text-brand-deep"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-brand-deep text-white text-xs md:text-sm font-semibold py-3 px-6 rounded-xl hover:bg-brand-plum transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {selectedEvent.priceType === 'paid' ? 'Proceed to Payment' : 'Complete Free Registration'}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* FLOW B: Paid Event Payment Simulation Screen */}
              {formMode === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  
                  {/* Secure banner */}
                  <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900 font-light">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-950">Secure Direct Checkout Simulator</p>
                      <p>Entering sandboxed credit card simulation mode for <strong>{selectedEvent.price}</strong> entry fee.</p>
                    </div>
                  </div>

                  {/* Summary of invoice */}
                  <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100/40 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Attendee:</span>
                      <span className="font-bold text-brand-deep">{regName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Event Ticket:</span>
                      <span className="font-medium text-brand-deep">{selectedEvent.title}</span>
                    </div>
                    <div className="flex justify-between border-t border-purple-100 pt-2 font-semibold text-sm">
                      <span className="text-brand-plum">Total Amount Due:</span>
                      <span className="text-brand-deep">{selectedEvent.price}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Cardholder Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="E.g., Nomsa Khumalo"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Card Number *</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required 
                          placeholder="4000 1234 5678 9010"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <CreditCard className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Expiry Date *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">CVV Code *</label>
                        <input 
                          type="password" 
                          required 
                          placeholder="•••"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-purple-50">
                    <button 
                      type="button" 
                      onClick={() => setFormMode('register')}
                      className="text-xs font-semibold text-brand-plum hover:text-brand-deep"
                    >
                      Back to details
                    </button>
                    <button 
                      type="submit"
                      disabled={paymentProcessing}
                      className="bg-emerald-600 text-white text-xs md:text-sm font-semibold py-3 px-6 rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                    >
                      {paymentProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing Secure Payment...
                        </>
                      ) : (
                        <>
                          Pay {selectedEvent.price} Now
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* FLOW C: Enquiry Form for Upcoming Events */}
              {formMode === 'enquire' && (
                <form onSubmit={handleEnquirySubmit} className="space-y-5">
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100/40 text-xs text-brand-deep/95 space-y-1.5 font-light">
                    <p className="font-bold text-brand-plum flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> Upcoming Event Inquiry
                    </p>
                    <p>
                      This event is upcoming. Fill in this quick interest form to receive early access tickets, speaker details, and schedule announcements directly to your inbox.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Your Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="E.g., Nomsa Khumalo"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="E.g., nomsa@example.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number (Optional)</label>
                        <input 
                          type="tel" 
                          placeholder="E.g., 076 055 1994"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Your Inquiry Message *</label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="What details would you like to know?"
                        value={regMessage}
                        onChange={(e) => setRegMessage(e.target.value)}
                        className="w-full p-4 text-xs rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-purple-50">
                    <button 
                      type="button" 
                      onClick={handleCloseModal}
                      className="text-xs font-semibold text-gray-500 hover:text-brand-deep"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-brand-deep text-white text-xs md:text-sm font-semibold py-3 px-6 rounded-xl hover:bg-brand-plum transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      Submit Inquiry
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* FLOW D: Success Final Confirmation Step */}
              {formMode === 'success' && (
                <div className="text-center py-6 space-y-6">
                  <div className="bg-purple-100 text-brand-deep w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-purple-200">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-bold text-brand-deep">
                      {selectedEvent.type === 'upcoming' ? 'Inquiry Submitted!' : 'Ticket Successfully Secured!'}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 font-light max-w-sm mx-auto leading-relaxed">
                      {selectedEvent.type === 'upcoming' 
                        ? `Thank you for expressing interest in "${selectedEvent.title}". Kgomotso and the team have saved your email and will be in touch with early updates.`
                        : `Congratulations, sister! Your reservation for "${selectedEvent.title}" is officially confirmed. A copy of your digital pass has been dispatched.`}
                    </p>
                  </div>

                  {/* Aesthetic digital ticket mockup */}
                  {selectedEvent.type !== 'upcoming' && (
                    <div className="bg-brand-bg rounded-2xl border border-purple-100 p-5 max-w-sm mx-auto text-left relative overflow-hidden font-sans border-dashed border-2">
                      <div className="absolute right-[-10px] top-[-10px] opacity-10">
                        <Ticket className="w-24 h-24 text-brand-gold" />
                      </div>
                      
                      <div className="border-b border-purple-100/80 pb-3 mb-3 space-y-1">
                        <span className="text-[9px] uppercase font-bold text-brand-gold tracking-wider">OFFICIAL EVENT PASS</span>
                        <h5 className="font-serif font-bold text-brand-deep text-xs md:text-sm line-clamp-1">{selectedEvent.title}</h5>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-[11px] mb-3">
                        <div>
                          <span className="text-gray-400 block font-light">Attendee</span>
                          <span className="font-semibold text-brand-deep">{regName || "Sister"}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Price tier</span>
                          <span className="font-semibold text-emerald-600 font-mono">{selectedEvent.priceType === 'free' ? 'Free' : selectedEvent.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Date</span>
                          <span className="font-semibold text-brand-plum">{selectedEvent.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Access Code</span>
                          <span className="font-mono text-brand-deep uppercase font-bold">GT-{Math.floor(1000 + Math.random() * 9000)}</span>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-purple-100 flex items-center gap-3 text-[10px] text-gray-500 font-light">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Bring a copy or show this pass on your phone at entry.</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-purple-50 flex justify-center">
                    <button 
                      onClick={handleCloseModal}
                      className="bg-brand-deep text-white text-xs font-semibold py-2.5 px-6 rounded-xl hover:bg-brand-plum transition-all cursor-pointer"
                    >
                      Back to Events list
                    </button>
                  </div>
                </div>
              )}

              {/* FLOW E: Past Events Gallery Carousel & details */}
              {formMode === 'gallery' && (
                <div className="space-y-6">
                  {/* Gallery viewport */}
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-purple-100/50 shadow-xs bg-black flex items-center justify-center select-none">
                    <img 
                      src={selectedEvent.galleryImages[galleryIndex]} 
                      alt={`Gallery Highlight ${galleryIndex + 1}`} 
                      className="max-h-full object-contain max-w-full"
                    />

                    {/* Nav triggers if multiple images */}
                    {selectedEvent.galleryImages.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryIndex((galleryIndex - 1 + selectedEvent.galleryImages.length) % selectedEvent.galleryImages.length);
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                          aria-label="Previous gallery image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryIndex((galleryIndex + 1) % selectedEvent.galleryImages.length);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                          aria-label="Next gallery image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Image indicator count badge */}
                    <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] px-2.5 py-1 rounded-md font-mono">
                      {galleryIndex + 1} / {selectedEvent.galleryImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  {selectedEvent.galleryImages.length > 1 && (
                    <div className="flex gap-2 justify-center">
                      {selectedEvent.galleryImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            galleryIndex === i ? 'border-brand-gold scale-105' : 'border-transparent opacity-60'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Past event data summary */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-serif text-lg font-bold text-brand-deep">{selectedEvent.title}</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs font-light text-gray-500 bg-purple-50/50 p-4 rounded-xl border border-purple-100/40">
                      <div>
                        <span className="block font-semibold text-brand-plum">Date Concluded</span>
                        <span>{selectedEvent.date}</span>
                      </div>
                      <div>
                        <span className="block font-semibold text-brand-plum">Location base</span>
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div>
                        <span className="block font-semibold text-brand-plum">Foundational Pillar</span>
                        <span>{selectedEvent.pillar}</span>
                      </div>
                      <div>
                        <span className="block font-semibold text-brand-plum">Signature Theme</span>
                        <span>{selectedEvent.theme || "Heart Fellowship"}</span>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-purple-50 flex justify-end">
                    <button 
                      onClick={handleCloseModal}
                      className="bg-brand-deep text-white text-xs font-semibold py-2.5 px-5 rounded-xl hover:bg-brand-plum transition-all cursor-pointer"
                    >
                      Close Gallery
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

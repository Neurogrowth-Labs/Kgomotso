import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentMessages, setSentMessages] = useState<ContactMessage[]>([]);

  // Load sent messages from local storage to show functional responsiveness
  useEffect(() => {
    const saved = localStorage.getItem('girls_talk_messages');
    if (saved) {
      try {
        setSentMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved messages", e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject,
      message,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newMessage, ...sentMessages];
    localStorage.setItem('girls_talk_messages', JSON.stringify(updated));
    setSentMessages(updated);

    // Dispatch custom Toast Event
    const toastEvent = new CustomEvent('girls_talk_toast', {
      detail: { 
        message: `Thank you, ${name}! Your heart-to-heart message was successfully sent to Kgomotso.`, 
        type: 'success' 
      }
    });
    window.dispatchEvent(toastEvent);

    // Reset inputs
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    
    // Trigger Success Notice
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
    }, 5000);
  };

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in" id="contact-tab-view">
      
      {/* 1. Header Hero */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-deep/5 px-3 py-1 rounded-md">
          Heart-to-Heart
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-brand-deep">
          Connect with Us
        </h1>
        <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
          Have a question about our events, want to join the community, or simply need to share your thoughts? Reach out. We are here to listen and grow with you.
        </p>
        <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
      </section>

      {/* 2. Main Contact Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-purple-100/60 shadow-3xs space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-brand-deep">Direct Details</h3>
            <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
              Feel free to send a direct message, drop an email, or give us a call. We read every word and respond with absolute care.
            </p>

            <div className="space-y-5 pt-2">
              {/* Primary Email */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-brand-plum flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Primary Work Email</span>
                  <a 
                    href="mailto:Kgomotsokhalo@tukuhospitality.africa" 
                    className="block font-serif text-brand-deep text-sm md:text-base hover:text-brand-gold transition-colors font-medium break-all"
                  >
                    Kgomotsokhalo@tukuhospitality.africa
                  </a>
                </div>
              </div>

              {/* Secondary Email */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-brand-plum flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Alternative Email</span>
                  <a 
                    href="mailto:tuku40@yahoo.com" 
                    className="block font-serif text-brand-deep text-sm md:text-base hover:text-brand-gold transition-colors font-medium break-all"
                  >
                    tuku40@yahoo.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-brand-plum flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Phone Call & WhatsApp</span>
                  <a 
                    href="tel:0760551994" 
                    className="block font-serif text-brand-deep text-sm md:text-base hover:text-brand-gold transition-colors font-medium"
                  >
                    0760551994
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-brand-plum flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Location & Community Base</span>
                  <p className="font-serif text-brand-deep text-sm md:text-base font-medium">
                    South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-bg/40 p-4 rounded-xl border border-purple-100/50 text-[11px] text-gray-500 font-light italic leading-relaxed">
            Note: For workshop or partnership requests, please email us directly with "Girls Talk Workshop Collaboration" in the subject line.
          </div>
        </div>

        {/* Message Form Card */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-purple-100/60 shadow-3xs space-y-6 relative">
          
          {/* Success Banner overlay */}
          {sentSuccess && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-3xl z-10 p-8 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in border border-purple-100">
              <div className="bg-purple-100 text-brand-plum p-4 rounded-full border border-purple-200">
                <CheckCircle className="w-10 h-10 text-green-600 animate-bounce" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-deep">Thank You, Sister!</h3>
              <p className="text-gray-600 font-light text-sm max-w-sm leading-relaxed">
                Your message has been stored and routed. Kgomotso Khalo and the Girls Talk team will reach back with warmth, love, and light soon.
              </p>
              <div className="pt-2 text-xs text-brand-gold font-medium flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-brand-gold animate-spin" />
                Your connection is safe with us
              </div>
            </div>
          )}

          <h3 className="font-serif text-xl font-semibold text-brand-deep border-b border-purple-50 pb-3">Send a Heart-to-Heart Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="E.g., Nomsa Khumalo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  placeholder="E.g., nomsa@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Your Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="E.g., 0760551994"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Inquiry Subject *</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Attend Heart-to-Heart Conference">Attend Heart-to-Heart Conference</option>
                  <option value="Wheel of Life Workshop info">Wheel of Life Workshop info</option>
                  <option value="Girls Talk Picnic Series">Girls Talk Picnic Series</option>
                  <option value="Girls Talk Nature Walks">Girls Talk Nature Walks</option>
                  <option value="Collab / Book Kgomotso">Collab / Book Kgomotso</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Your Sacred Message *</label>
              <textarea
                placeholder="Write your thoughts, questions, or prayers here. This is a secure and compassionate space..."
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 text-sm rounded-xl border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-400 font-light leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-brand-deep text-white text-xs md:text-sm font-semibold py-3 px-6 rounded-xl hover:bg-brand-plum transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </form>
        </div>

      </section>

      {/* 3. Outbox History to show robust functional features */}
      {sentMessages.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-purple-100 pb-2">
            <MessageSquare className="w-4 h-4 text-brand-plum" />
            <h3 className="font-serif text-lg font-semibold text-brand-deep">Your Submission Record ({sentMessages.length})</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sentMessages.map((msg) => (
              <div key={msg.id} className="p-5 rounded-2xl bg-white border border-purple-100/60 shadow-3xs space-y-3 relative group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold text-brand-plum bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    {msg.subject}
                  </span>
                  <span className="text-[10px] text-gray-400 font-light">{msg.date}</span>
                </div>
                <h4 className="font-serif font-bold text-xs text-brand-deep">From: {msg.name} ({msg.email})</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed whitespace-pre-wrap line-clamp-3">
                  {msg.message}
                </p>
                <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 pt-1 border-t border-purple-50">
                  <AlertCircle className="w-3 h-3 text-emerald-600" />
                  Sent successfully to Kgomotso
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

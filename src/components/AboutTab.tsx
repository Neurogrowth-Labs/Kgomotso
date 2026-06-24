import React, { useState } from 'react';
import { Quote, Sparkles, Target, Compass, Heart, ChevronDown } from 'lucide-react';
import { PILLARS } from '../data';

export default function AboutTab() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const kgomotsoImage = "/src/assets/images/kgomotso_portrait_1782250444532.jpg";

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in" id="about-tab-view">
      
      {/* 1. Header Hero */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-deep/5 px-3 py-1 rounded-md">
          The Movement & The Founder
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-brand-deep">
          Girls Talk with Kgomotso
        </h1>
        <p className="font-serif text-brand-plum text-lg md:text-xl tracking-wider font-light italic">
          Heal. Grow. Thrive. Give.
        </p>
        <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
      </section>

      {/* 2. Main Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-brand-deep/5 rounded-3xl transform -translate-x-3 -translate-y-3 -z-10" />
          <div className="aspect-square md:aspect-3/4 rounded-3xl overflow-hidden border border-purple-100 shadow-md bg-white">
            <img
              src={kgomotsoImage}
              alt="Kgomotso Khalo - Founder of Girls Talk"
              className="w-full h-full object-cover grayscale-3xs"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-deep">
              A Personal Journey of Faith & Transformation
            </h3>
            
            <p className="text-brand-text/95 font-light leading-relaxed text-sm md:text-base">
              <strong>Girls Talk with Kgomotso</strong> is a movement dedicated to empowering women to live purposeful, balanced, and impactful lives.
            </p>
            <p className="text-brand-text/90 font-light leading-relaxed text-sm md:text-base">
              Founded by Kgomotso Khalo, Girls Talk was born from a personal journey of healing, faith, and transformation. After overcoming one of the most difficult seasons of her life, Kgomotso discovered that healing often begins when we use our experiences to uplift others.
            </p>
            <p className="text-brand-text/90 font-light leading-relaxed text-sm md:text-base">
              Today, Girls Talk creates meaningful spaces where women can heal, grow, thrive, and give back to their communities. We believe that every woman has value, purpose, and the ability to create lasting impact in her family, community, and the world.
            </p>
          </div>

          <div className="bg-brand-deep/5 p-6 rounded-2xl border-l-4 border-brand-gold italic text-brand-deep/90 font-serif leading-relaxed text-base">
            <Quote className="w-6 h-6 text-brand-gold/40 mb-2" />
            "When women grow, families flourish, communities strengthen, and futures change."
            <span className="block text-xs font-sans font-semibold text-brand-plum mt-2 not-italic">— Kgomotso Khalo</span>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-purple-100 shadow-3xs space-y-4 relative overflow-hidden">
          <div className="absolute right-4 top-4 opacity-5">
            <Compass className="w-24 h-24 text-brand-deep" />
          </div>
          <div className="bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center text-purple-700">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-brand-deep">Our Vision</h3>
          <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
            To build a community of confident, purpose-driven women who are committed to personal growth, meaningful relationships, spiritual development, and positive impact.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-purple-100 shadow-3xs space-y-4 relative overflow-hidden">
          <div className="absolute right-4 top-4 opacity-5">
            <Target className="w-24 h-24 text-brand-deep" />
          </div>
          <div className="bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center text-purple-700">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-brand-deep">Our Mission</h3>
          <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
            To inspire and equip women to grow in every area of life through transformational conversations, practical tools, empowering experiences, and opportunities to serve others.
          </p>
        </div>
      </section>

      {/* 4. Pillars & Experiences Breakdown */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-plum">The Framework</span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-brand-deep">Our Foundations & Pillars</h2>
          <p className="text-gray-500 font-light text-xs md:text-sm">How we cultivate healing, development, and service.</p>
        </div>

        <div className="space-y-8">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="p-6 md:p-8 rounded-2xl bg-white border border-purple-100/70 shadow-3xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">Pillar</span>
                <h3 className="font-serif text-xl font-semibold text-brand-deep flex items-center gap-2">
                  {pillar.title}
                </h3>
                <p className="text-brand-plum text-xs italic font-medium leading-relaxed">{pillar.tagline}</p>
                <p className="text-gray-500 text-xs font-light leading-relaxed">{pillar.description}</p>
              </div>

              <div className="lg:col-span-8 bg-brand-bg/20 p-5 rounded-xl border border-purple-50 space-y-4">
                {pillar.signatureExperiences.map((exp, i) => (
                  <div key={i} className="space-y-1">
                    <h5 className="font-serif font-semibold text-brand-deep text-sm md:text-base">
                      {exp.title}
                      {exp.theme && <span className="block md:inline md:ml-2 text-xs text-brand-plum font-sans italic">Theme: {exp.theme}</span>}
                    </h5>
                    <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Personal Letter from Kgomotso */}
      <section className="bg-brand-deep rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-md">
        <div className="absolute right-[-10px] top-[-10px] opacity-10">
          <Heart className="w-48 h-48 text-amber-200" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold uppercase tracking-wider">
            <Quote className="w-4 h-4" />
            A Sacred Message from Kgomotso
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-medium text-amber-100 leading-snug">
            "I know what it feels like to rebuild..."
          </h3>

          <div className="font-serif text-base md:text-lg leading-relaxed text-purple-100 italic font-light space-y-4">
            <p>
              "I know what it feels like to rebuild. I know what it means to face difficult seasons and wonder if there is more ahead. Girls Talk was created because I believe every woman deserves a space where she can heal, grow, discover her value, and walk confidently in her purpose."
            </p>
            <p>
              "My prayer is that every woman who joins this community leaves feeling inspired, empowered, and reminded that her story is not over."
            </p>
            <p className="text-amber-100 font-semibold not-italic">
              "There is purpose within you. There is value within you. There is greatness within you. And together, we rise."
            </p>
          </div>

          <div className="pt-4 border-t border-purple-800 flex justify-between items-center text-xs md:text-sm text-amber-200 font-semibold font-serif">
            <span>— Kgomotso Khalo</span>
            <span className="text-[10px] uppercase font-sans font-light tracking-widest text-purple-300">Founder & Sister</span>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="space-y-8 max-w-3xl mx-auto" id="faq-accordion-section">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-deep/5 px-3 py-1 rounded-md">
            Common Inquiries
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-brand-deep">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 font-light text-xs md:text-sm">
            Everything you need to know about joining our sisterhood, assessments, and events.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "What is Girls Talk and who is it for?",
              answer: "Girls Talk with Kgomotso is a supportive sisterhood and personal development movement. It is designed for women of all ages and backgrounds who are looking to heal from past seasons, grow in their faith, thrive in their calling, and give back to their communities. Whether you are seeking deeper relationships or practical guidance, you belong here."
            },
            {
              question: "How can I join the community and attend gatherings?",
              answer: "Joining the community is free and simple! You can subscribe to our newsletter to receive written teachings and reflective prompts, or visit our Events tab to secure your ticket to our upcoming conferences, outdoor picnics, or wellness hikes. We welcome all women with open arms."
            },
            {
              question: "What is the Wheel of Life self-assessment?",
              answer: "The Wheel of Life is a dynamic reflective tool we offer to help women audit their current level of alignment and balance. It evaluates six core pillars: Faith & Spirit, Health & Vitality, Relationships & Circles, Career & Calling, Finances & Security, and Personal Growth. After scoring each area, you will receive tailored guidance written in Kgomotso's voice to help you focus on your current season of growth."
            },
            {
              question: "Are events open to international or virtual attendees?",
              answer: "While our signature experiences (like the Picnic Series and Nature Walks) are currently hosted in beautiful physical venues, we hold online virtual masterclasses, webinars, and live digital sessions to support our growing global sisterhood. Keep an eye on our newsletter for virtual announcements!"
            },
            {
              question: "How can I participate in 'Girls Talk Gives Back' outreach?",
              answer: "Our 'Give' pillar is very active! During our events and conferences, we collect donation drives, organize children's book reads, and support local community spaces. We regularly post details on donation drop-offs and volunteer opportunities during event updates and in our newsletter. It is a beautiful way for our sisters to serve hand-in-hand."
            }
          ].map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-purple-100 rounded-2xl overflow-hidden shadow-3xs hover:border-purple-200/80 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 hover:bg-purple-50/20 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-medium text-brand-deep text-sm md:text-base pr-2">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-purple-50 text-brand-plum transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] opacity-100 border-t border-purple-50/50' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-5 md:p-6 text-xs md:text-sm text-gray-600 font-light leading-relaxed bg-brand-bg/10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

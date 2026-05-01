'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    setSubmittedName(name);
    setSubmittedEmail(email);

    formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY!);
    formData.append('subject', 'New Website Inquiry');
    formData.append('from_name', 'Brandworks Website');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json,
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error("Failed to parse response:", err);
        throw new Error("Web3Forms returned an invalid format (not JSON).");
      }

      if (response.ok && data.success) {
        setStatus('success');
        form.reset();
      } else {
        console.error("Web3Forms API Error:", data);
        setErrorMessage(data.message || 'Web3Forms API rejected the request.');
        setStatus('error');
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      setErrorMessage(error.message || 'Network error occurred. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading>Let&apos;s Work Together</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        
        {/* Left: Info Panel */}
        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <GlassCard className="h-full p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-syne font-bold text-2xl text-white mb-8">Contact Information</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 text-gray-300">
                  <div className="mt-1 text-brand-red"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-white mb-1">Our Office</h4>
                    <p className="font-dm-sans text-sm leading-relaxed text-gray-400">
                      Office 21#, Mezzanine Floor,<br/>
                      Al Ritaz Complex,<br/>
                      Bin Khaldoun St., Hawally,<br/>
                      Kuwait
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-gray-300">
                  <div className="mt-1 text-brand-blue-light"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-white mb-1">Phone</h4>
                    <a href="tel:+971559981420" className="font-dm-sans text-sm text-gray-400 hover:text-white transition-colors">
                      +971 55 998 1420
                    </a> <br />
                    <a href="tel:+96550727586" className="font-dm-sans text-sm text-gray-400 hover:text-white transition-colors">
                      +965 507 27586
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-gray-300">
                  <div className="mt-1 text-brand-yellow"><Mail size={24} /></div>
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-white mb-1">Email</h4>
                    <a href="mailto:info@brandworkskwt.com" className="font-dm-sans text-sm text-gray-400 hover:text-white transition-colors">
                      info@brandworkskwt.com
                    </a><br />
                    <a href="mailto:mustafa@brandworkskwt.com" className="font-dm-sans text-sm text-gray-400 hover:text-white transition-colors">
                      mustafa@brandworkskwt.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div 
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <GlassCard className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-space-grotesk text-sm font-medium text-gray-300">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="bg-brand-surface border border-white/10 rounded-lg px-4 py-3 font-dm-sans text-white focus:outline-none focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-space-grotesk text-sm font-medium text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="bg-brand-surface border border-white/10 rounded-lg px-4 py-3 font-dm-sans text-white focus:outline-none focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="font-space-grotesk text-sm font-medium text-gray-300">Service Required</label>
                <select 
                  id="service" 
                  name="service"
                  required
                  className="bg-brand-surface border border-white/10 rounded-lg px-4 py-3 font-dm-sans text-white focus:outline-none focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light transition-all appearance-none"
                >
                  <option value="" disabled selected>Select a service...</option>
                  <option value="Signage">Signage</option>
                  <option value="Installation">Shop Installation</option>
                  <option value="Interiors">Interior Design</option>
                  <option value="Design">Branding & Design</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-space-grotesk text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  required
                  className="bg-brand-surface border border-white/10 rounded-lg px-4 py-3 font-dm-sans text-white focus:outline-none focus:border-brand-blue-light focus:ring-1 focus:ring-brand-blue-light transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'sending'}
                className="mt-2 w-full sm:w-auto self-end flex items-center gap-2 bg-brand-red text-white font-space-grotesk font-semibold py-3 px-8 rounded-full hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <Send size={18} className={status === 'sending' ? 'animate-pulse' : ''} />
              </button>

            </form>
          </GlassCard>
        </motion.div>

      </div>

      <AnimatePresence>
        {(status === 'success' || status === 'error') && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-full max-w-lg"
            >
              <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
                <button 
                  onClick={() => setStatus('idle')}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                
                {status === 'success' ? (
                  <div className="flex flex-col gap-4 text-center items-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-2">
                      <Send size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-2xl text-white">Thank you so much, {submittedName}!</h3>
                    <p className="font-dm-sans text-gray-300 leading-relaxed">
                      We’ve received your message and will contact you at <strong className="text-white">{submittedEmail}</strong> within 24 hours.
                    </p>
                    <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 w-full text-left">
                      <p className="font-dm-sans text-sm text-gray-400 mb-2">If you’re in a hurry, feel free to reach out to us directly via:</p>
                      <div className="flex flex-col gap-2">
                        <a href="mailto:info@brandworkskwt.com" className="font-dm-sans text-sm text-brand-blue-light hover:text-white transition-colors flex items-center gap-2">
                          <Mail size={16} /> info@brandworkskwt.com
                        </a>
                        <a href="tel:+96550727586" className="font-dm-sans text-sm text-brand-blue-light hover:text-white transition-colors flex items-center gap-2">
                          <Phone size={16} /> +965 507 27586
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 text-center items-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-2">
                      <X size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-2xl text-white">Hi {submittedName || "there"},</h3>
                    <p className="font-dm-sans text-gray-300 leading-relaxed">
                      Unfortunately, your message didn’t reach us.
                    </p>
                    <p className="font-dm-sans text-sm text-red-400">
                      Reason: {errorMessage}
                    </p>
                    <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 w-full text-left">
                      <p className="font-dm-sans text-sm text-gray-400 mb-2">Please contact us directly so we can assist you:</p>
                      <div className="flex flex-col gap-2">
                        <a href="mailto:info@brandworkskwt.com" className="font-dm-sans text-sm text-brand-blue-light hover:text-white transition-colors flex items-center gap-2">
                          <Mail size={16} /> info@brandworkskwt.com
                        </a>
                        <a href="tel:+96550727586" className="font-dm-sans text-sm text-brand-blue-light hover:text-white transition-colors flex items-center gap-2">
                          <Phone size={16} /> +965 507 27586
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

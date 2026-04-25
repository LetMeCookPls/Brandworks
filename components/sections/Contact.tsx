'use client';

import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');

    const mailtoLink = `mailto:hello@brandworks.kw?subject=Inquiry regarding ${service} from ${name}&body=${encodeURIComponent(message as string)}%0A%0AFrom: ${name} (%0AEmail: ${email})`;
    window.location.href = mailtoLink;
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
                    <h4 className="font-space-grotesk font-semibold text-white mb-1">Our Studio</h4>
                    <p className="font-dm-sans text-sm leading-relaxed text-gray-400">
                      Kuwait City,<br/>
                      Kuwait
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-gray-300">
                  <div className="mt-1 text-brand-blue-light"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-white mb-1">Phone</h4>
                    <a href="tel:+96500000000" className="font-dm-sans text-sm text-gray-400 hover:text-white transition-colors">
                      +965 XXXX XXXX
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-gray-300">
                  <div className="mt-1 text-brand-yellow"><Mail size={24} /></div>
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-white mb-1">Email</h4>
                    <a href="mailto:hello@brandworks.kw" className="font-dm-sans text-sm text-gray-400 hover:text-white transition-colors">
                      hello@brandworks.kw
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
                className="mt-2 w-full sm:w-auto self-end flex items-center gap-2 bg-brand-red text-white font-space-grotesk font-semibold py-3 px-8 rounded-full hover:bg-brand-red/90 transition-colors"
              >
                Send Message
                <Send size={18} />
              </button>

            </form>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
}

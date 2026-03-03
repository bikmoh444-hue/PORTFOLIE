import { motion, type Transition } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, Send, Phone, Twitter } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useProfile } from "@/pages/hooks/useProfile";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, delay, ease: "easeOut" } as Transition,
});

const Contact = () => {
  const { profile, loading: profileLoading } = useProfile();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getContactLinks = () => {
    if (!profile) return [];
    const links = [];
    if (profile.email)         links.push({ icon: Mail,      label: "Email",     value: profile.email, href: `mailto:${profile.email}` });
    if (profile.github_url)    links.push({ icon: Github,    label: "GitHub",    value: profile.github_url.replace(/https?:\/\/(www\.)?github\.com\//i, "@"),    href: profile.github_url });
    if (profile.linkedin_url)  links.push({ icon: Linkedin,  label: "LinkedIn",  value: profile.name,  href: profile.linkedin_url });
    if (profile.instagram_url) links.push({ icon: Instagram, label: "Instagram", value: profile.instagram_url.replace(/https?:\/\/(www\.)?instagram\.com\//i, "@"), href: profile.instagram_url });
    if (profile.twitter_url)   links.push({ icon: Twitter,   label: "Twitter",   value: profile.twitter_url.replace(/https?:\/\/(www\.)?twitter\.com\//i, "@").replace(/https?:\/\/(www\.)?x\.com\//i, "@"), href: profile.twitter_url });
    if (profile.phone)         links.push({ icon: Phone,     label: "Phone",     value: profile.phone, href: `tel:${profile.phone}` });
    return links;
  };

  const contactLinks = getContactLinks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([formData]);
      if (error) {
        console.error("Error:", error);
        alert("Error sending message");
      } else {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <section id="contact" className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/40 font-mono text-sm animate-pulse tracking-widest">SIGNAL SEARCHING...</p>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="min-h-screen bg-black py-20 px-6 relative overflow-hidden"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
        }}
      />

      {/* Static bg blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeUp(0)}>
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-black mb-4">
            CH 05 — Contact
          </p>
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 text-white leading-none"
            style={{ textShadow: "0 0 60px rgba(255,255,255,0.1)" }}
          >
            Get In Touch
          </h1>
          <p className="text-white/40 text-base md:text-lg">
            Have a project in mind? Let's work together and create something amazing.
          </p>
          <div className="w-24 h-px bg-white/20 mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">

          {/* Contact Info */}
          <motion.div
            className="relative bg-neutral-900 border border-white/10 hover:border-white/20 transition-colors duration-300 rounded-sm p-8 overflow-hidden"
            {...fadeUp(0.1)}
          >
            {/* Scanline on card */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
              }}
            />

            <h3 className="text-lg font-black mb-8 flex items-center gap-3 text-white tracking-widest uppercase">
              <div className="w-9 h-9 bg-white flex items-center justify-center rounded-sm shrink-0">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              Let's Connect
            </h3>

            {profile?.location && (
              <div className="mb-6 p-5 bg-neutral-800 border border-white/10 rounded-sm">
                <p className="text-[10px] text-white/30 font-black tracking-widest uppercase mb-1">Localisation</p>
                <p className="text-white font-black flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-white/50" />
                  {profile.location}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {contactLinks.length > 0 ? (
                contactLinks.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-neutral-800 border border-white/10 hover:border-white/25 transition-colors duration-200 rounded-sm group"
                    {...fadeUp(0.1 + index * 0.07)}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  >
                    <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm shrink-0">
                      <contact.icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white/30 font-black tracking-widest uppercase mb-0.5">{contact.label}</p>
                      <p className="text-sm font-black text-white/80 group-hover:text-white transition-colors duration-200 truncate">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                ))
              ) : (
                <p className="text-center py-10 text-white/20 text-sm font-black tracking-widest">
                  NO SIGNAL
                </p>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="relative bg-neutral-900 border border-white/10 hover:border-white/20 transition-colors duration-300 rounded-sm p-8 overflow-hidden"
            {...fadeUp(0.15)}
          >
            {/* Scanline on card */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
              }}
            />

            <h3 className="text-lg font-black mb-8 flex items-center gap-3 text-white tracking-widest uppercase">
              <div className="w-9 h-9 bg-white flex items-center justify-center rounded-sm shrink-0">
                <Send className="w-5 h-5 text-black" />
              </div>
              Send a Message
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-5 py-3.5 bg-neutral-800 border border-white/10 focus:border-white/40 focus:outline-none transition-colors duration-200 text-white placeholder:text-white/20 text-sm font-black tracking-wide rounded-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-5 py-3.5 bg-neutral-800 border border-white/10 focus:border-white/40 focus:outline-none transition-colors duration-200 text-white placeholder:text-white/20 text-sm font-black tracking-wide rounded-sm"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-5 py-3.5 bg-neutral-800 border border-white/10 focus:border-white/40 focus:outline-none transition-colors duration-200 resize-none text-white placeholder:text-white/20 text-sm font-black tracking-wide rounded-sm"
              />
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-8 py-4 bg-white text-black font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors duration-200 rounded-sm"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : success ? "Sent ✓" : "Send Message"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
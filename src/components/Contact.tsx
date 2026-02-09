import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, Send, Phone, Twitter } from "lucide-react";
import { useState } from "react";
import { supabase } from '@/lib/supabase';
import { useProfile } from "@/pages/hooks/useProfile";

const Contact = () => {
  const { profile, loading: profileLoading } = useProfile();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // إنشاء قائمة الروابط الاجتماعية من البيانات
  const getContactLinks = () => {
    if (!profile) return [];

    const links = [];

    if (profile.email) {
      links.push({
        icon: Mail,
        label: "Email",
        value: profile.email,
        href: `mailto:${profile.email}`,
      });
    }

    if (profile.github_url) {
      links.push({
        icon: Github,
        label: "GitHub",
        value: profile.github_url.replace(/https?:\/\/(www\.)?github\.com\//i, '@'),
        href: profile.github_url,
      });
    }

    if (profile.linkedin_url) {
      links.push({
        icon: Linkedin,
        label: "LinkedIn",
        value: profile.name,
        href: profile.linkedin_url,
      });
    }

    if (profile.instagram_url) {
      links.push({
        icon: Instagram,
        label: "Instagram",
        value: profile.instagram_url.replace(/https?:\/\/(www\.)?instagram\.com\//i, '@'),
        href: profile.instagram_url,
      });
    }

    if (profile.twitter_url) {
      links.push({
        icon: Twitter,
        label: "Twitter",
        value: profile.twitter_url.replace(/https?:\/\/(www\.)?twitter\.com\//i, '@').replace(/https?:\/\/(www\.)?x\.com\//i, '@'),
        href: profile.twitter_url,
      });
    }

    if (profile.phone) {
      links.push({
        icon: Phone,
        label: "Phone",
        value: profile.phone,
        href: `tel:${profile.phone}`,
      });
    }

    return links;
  };

  const contactLinks = getContactLinks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) {
        console.error('Error:', error);
        alert('Error sending message');
      } else {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (profileLoading) {
    return (
      <section id="contact" className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center py-20">
        <div className="text-gray-400 text-2xl font-bold animate-pulse">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-white">Get In </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] via-[#c77dff] to-[#e0aaff]">
              Touch
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Have a project in mind? Let's work together and create something amazing.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#d4a574] to-[#c77dff] rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Contact Info Section */}
          <motion.div
            className="bg-[#0d0d0d] rounded-3xl p-8 border border-[#1f1f1f] hover:border-[#c77dff]/40 transition-all duration-500"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d4a574] to-[#c77dff] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] to-[#c77dff]">
                Let's Connect
              </span>
            </h3>

            {profile?.location && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#c77dff]/20">
                <p className="text-sm text-gray-500 mb-2">Location</p>
                <p className="text-lg font-medium text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#c77dff]" />
                  {profile.location}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {contactLinks.length > 0 ? (
                contactLinks.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[#c77dff]/40 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#d4a574] to-[#c77dff] flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 mb-1">{contact.label}</p>
                      <p className="text-base font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#d4a574] group-hover:to-[#c77dff] transition-all duration-300 break-all">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No contact information available</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            className="bg-[#0d0d0d] rounded-3xl p-8 border border-[#1f1f1f] hover:border-[#c77dff]/40 transition-all duration-500"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d4a574] to-[#c77dff] flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] to-[#c77dff]">
                Send a Message
              </span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#c77dff] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/20 transition-all duration-300 text-white placeholder:text-gray-600"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#c77dff] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/20 transition-all duration-300 text-white placeholder:text-gray-600"
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#c77dff] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/20 transition-all duration-300 resize-none text-white placeholder:text-gray-600"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4a574] to-[#c77dff] text-white font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-[#c77dff]/40 transition-all duration-300"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                <Send className="w-5 h-5" />
                {loading ? 'Sending...' : success ? 'Sent Successfully! ✓' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
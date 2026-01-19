import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle, Sparkles, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = encodeURIComponent(
      `Hello! I'm ${formData.name}.\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    );
    const whatsappUrl = `https://wa.me/212779341208?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: '📱 Opening WhatsApp',
      description: 'Redirecting you to WhatsApp to send your message...',
    });
  };

  const contactInfo = [
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '+212 779 341 208',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/20 to-teal-500/20',
    },
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'biktamohmad26@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'Tagant, Guelmim, Morocco',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      value: '@medn_iro',
      link: 'https://www.instagram.com/medn_iro?igsh=MXh3Yjg2ZGoweWNseA%3D%3D&utm_source=qr',
      gradient: 'from-pink-500 via-purple-500 to-orange-500',
      bgGradient: 'from-pink-500/20 via-purple-500/20 to-orange-500/20',
    },
    { 
      icon: Facebook, 
      label: 'Facebook', 
      value: 'Bikta Mohamed',
      link: 'https://www.facebook.com/share/1BxxpW14jx/?mibextid=wwXIfr',
      gradient: 'from-blue-600 to-blue-400',
      bgGradient: 'from-blue-600/20 to-blue-400/20',
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        
        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm">Let's Connect</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 relative group"
          >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl opacity-0 blur-lg group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                Send a Message
              </h3>
              
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[150px] transition-all resize-none"
                  />
                </motion.div>

                {/* Enhanced WhatsApp Button */}
                <motion.button
                  onClick={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn relative w-full px-6 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 shadow-xl"
                >
                  {/* 3D layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-700 rounded-xl transform translate-y-1 group-hover/btn:translate-y-0.5 transition-transform"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  {/* Top shine */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl"></div>
                  
                  {/* Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-60 transition-opacity duration-500"></div>
                  
                  <span className="relative flex items-center justify-center gap-2 z-10">
                    <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    Send via WhatsApp
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.link || '#'}
                target={info.link ? '_blank' : undefined}
                rel={info.link ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative block cursor-pointer"
              >
                {/* Card glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${info.gradient} rounded-2xl opacity-0 blur-lg group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative glass-card p-6 flex items-center gap-4">
                  {/* Enhanced Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${info.bgGradient} flex items-center justify-center flex-shrink-0`}
                  >
                    {/* Icon glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-2xl blur-md opacity-50`} />
                    
                    <info.icon className="w-7 h-7 text-white relative z-10" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Send Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-8 text-center relative group overflow-hidden"
            >
              {/* Background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <p className="text-muted-foreground mb-5 text-lg">
                  Prefer to reach out directly?
                </p>
                
                <motion.button
                  onClick={() => window.open('mailto:biktamohmad26@gmail.com', '_blank')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/email relative px-6 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300"
                >
                  {/* Border gradient animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-cyan-500 to-primary bg-[length:200%_100%] rounded-xl p-[2px] animate-gradient">
                    <div className="absolute inset-[2px] bg-card rounded-xl" />
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-xl blur opacity-0 group-hover/email:opacity-50 transition-opacity duration-500" />
                  
                  <span className="relative flex items-center gap-2 text-primary z-10">
                    <Mail className="w-5 h-5" />
                    Send Email
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail, Zap, Cpu, Hexagon } from "lucide-react";
import { useProfile } from "@/pages/hooks/useProfile";

const Hero = () => {
  const { profile, loading } = useProfile();
  
  const defaultData = {
    greeting: "Hello, I'm",
    name: "mohamed bikta",
    title: "Full Stack Developer",
    description: "Crafting digital experiences with clean code and creative design. Let's build something amazing together.",
    photo_url: "/assets/profile-photo.jpg",
  };

  const getSocialLinks = () => {
    if (!profile) {
      return [
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
      ];
    }

    const links = [];
    if (profile.github_url) links.push({ icon: Github, href: profile.github_url, label: "GitHub" });
    if (profile.linkedin_url) links.push({ icon: Linkedin, href: profile.linkedin_url, label: "LinkedIn" });
    if (profile.instagram_url) links.push({ icon: Instagram, href: profile.instagram_url, label: "Instagram" });
    if (profile.twitter_url) links.push({ icon: Twitter, href: profile.twitter_url, label: "Twitter" });
    if (profile.email) links.push({ icon: Mail, href: `mailto:${profile.email}`, label: "Email" });

    return links.length > 0 ? links : [
      { icon: Github, href: "https://github.com", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
      { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
      { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
      { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
    ];
  };

  const socialLinks = getSocialLinks();
  const displayData = {
    greeting: profile?.greeting || defaultData.greeting,
    name: profile?.name || defaultData.name,
    title: profile?.title || defaultData.title,
    description: profile?.description || defaultData.description,
    photo_url: profile?.photo_url || defaultData.photo_url,
  };

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Smooth scroll to projects section
  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Smooth scroll to contact section
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Hexagons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          >
            <Hexagon className="w-20 h-20 text-white" />
          </motion.div>
        ))}
      </div>

      {/* Subtle Light Wave */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
        }}
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 py-20">
          
          {/* LEFT - 3D FLOATING CARD WITH IMAGE */}
          <motion.div
            className="relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative w-[300px] h-[380px] sm:w-[350px] sm:h-[430px] lg:w-[400px] lg:h-[480px]"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* 3D Card Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 backdrop-blur-xl shadow-2xl"
                style={{ 
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glowing Border Animation */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  animate={{ 
                    backgroundPosition: ['-200% 0%', '200% 0%']
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Circuit Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10h20v20h20v20h-20v20h-20z" fill="none" stroke="#ffffff" strokeWidth="1"/>
                        <circle cx="10" cy="10" r="2" fill="#ffffff"/>
                        <circle cx="30" cy="30" r="2" fill="#ffffff"/>
                        <circle cx="50" cy="50" r="2" fill="#ffffff"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)"/>
                  </svg>
                </div>

                {/* THE CIRCULAR IMAGE */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    
                    {/* Rotating Tech Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {[0, 90, 180, 270].map((angle) => (
                        <div
                          key={angle}
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white"
                          style={{
                            transform: `rotate(${angle}deg) translateY(-${typeof window !== 'undefined' && window.innerWidth < 640 ? 135 : typeof window !== 'undefined' && window.innerWidth < 1024 ? 155 : 175}px)`
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Pulsing Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-2xl"
                      style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))' }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Profile Image */}
                    <motion.div
                      className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/50 shadow-2xl"
                      style={{ 
                        boxShadow: '0 20px 60px rgba(255, 255, 255, 0.2)'
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {loading ? (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                          <Cpu className="w-12 h-12 text-white animate-spin" />
                        </div>
                      ) : (
                        <img
                          src={displayData.photo_url}
                          alt={displayData.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Ccircle cx="200" cy="200" r="200" fill="%23000000"/%3E%3Ctext fill="%23ffffff" font-family="system-ui" font-size="24" font-weight="600" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProfile%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Corner Accent - Top Left */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/50 rounded-tl-xl" />
                {/* Corner Accent - Bottom Right */}
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/50 rounded-br-xl" />

                {/* Status Indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/30">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ 
                      boxShadow: [
                        '0 0 0px rgba(255, 255, 255, 0.8)',
                        '0 0 15px rgba(255, 255, 255, 0.8)',
                        '0 0 0px rgba(255, 255, 255, 0.8)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white text-xs font-bold">ACTIVE</span>
                </div>
              </div>

              {/* Floating Particles Around Card */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white"
                  style={{
                    transformStyle: "preserve-3d",
                    translateZ: 50,
                  }}
                  animate={{
                    x: [0, Math.cos(i * Math.PI / 4) * 150, 0],
                    y: [0, Math.sin(i * Math.PI / 4) * 150, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT - TEXT CONTENT */}
          <motion.div
            className="space-y-6 text-center lg:text-left max-w-xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            
            {/* Tech Greeting Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/30 backdrop-blur-md bg-white/5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-white font-bold text-sm tracking-widest uppercase">
                {displayData.greeting}
              </span>
              <motion.div
                className="w-px h-4 bg-white/50"
              />
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-3 rounded-full bg-white"
                    animate={{ 
                      scaleY: [1, 1.5, 1]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="inline-block text-white relative" style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }}>
                {loading ? "Loading..." : displayData.name}
              </span>
            </motion.h1>

            {/* Title with Line */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <motion.div 
                  className="h-px w-12 bg-gradient-to-r from-transparent to-white"
                  animate={{ 
                    width: ['3rem', '4rem', '3rem']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {loading ? "..." : displayData.title}
                </h2>
                <motion.div 
                  className="h-px w-12 bg-gradient-to-l from-transparent to-white"
                  animate={{ 
                    width: ['3rem', '4rem', '3rem']
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-gray-400 leading-relaxed px-4 lg:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {loading ? "Loading..." : displayData.description}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="grid grid-cols-5 gap-3 max-w-sm mx-auto lg:mx-0 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-lg bg-black/80 border border-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 5,
                    borderColor: 'rgba(255, 255, 255, 0.6)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, type: "spring" }}
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
                  
                  <motion.div 
                    className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"
                  />
                  <social.icon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors relative z-10" />
                  
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-lg bg-white/20"
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              <motion.button 
                onClick={scrollToProjects}
                className="group relative px-8 py-4 rounded-lg font-bold overflow-hidden bg-white text-black cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  animate={{ 
                    backgroundPosition: ['-200% 0%', '200% 0%']
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <Cpu className="w-5 h-5" />
                  View Projects
                </span>
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black/20" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black/20" />
              </motion.button>
              
              <motion.button 
                onClick={scrollToContact}
                className="relative px-8 py-4 rounded-lg font-bold border-2 border-white/40 bg-white/5 hover:bg-white/10 text-white transition-all overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.8)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{ 
          y: ['0vh', '100vh']
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Bottom Tech Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </section>
  );
};

export default Hero;
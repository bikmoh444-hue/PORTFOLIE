import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Briefcase, GraduationCap, MapPin, Code, Award, Sparkles } from "lucide-react";
import { useProfile } from "@/pages/hooks/useProfile";
import { useRef } from "react";

const About = () => {
  const { profile, loading } = useProfile();
  const sectionRef = useRef(null);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  // Stats data with gold-purple colors
  const stats = profile ? [
    { 
      icon: Briefcase, 
      label: "Experience", 
      value: profile.experience_years || "5+ Years",
      color: "#f4a261"
    },
    { 
      icon: GraduationCap, 
      label: "Education", 
      value: profile.education || "CS Degree",
      color: "#c77dff"
    },
    { 
      icon: MapPin, 
      label: "Location", 
      value: profile.location || "San Francisco",
      color: "#e9c46a"
    },
    { 
      icon: Code, 
      label: "Projects", 
      value: profile.projects_completed || "50+ Done",
      color: "#f4a261"
    },
  ] : [
    { icon: Briefcase, label: "Experience", value: "5+ Years", color: "#f4a261" },
    { icon: GraduationCap, label: "Education", value: "CS Degree", color: "#c77dff" },
    { icon: MapPin, label: "Location", value: "San Francisco", color: "#e9c46a" },
    { icon: Code, label: "Projects", value: "50+ Done", color: "#f4a261" },
  ];

  if (loading) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
        <div className="text-gray-400 text-2xl font-bold animate-pulse">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen py-32 overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]"
    >
      
      {/* 3D Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#f4a261] via-[#e9c46a] to-transparent blur-3xl" />
        </motion.div>
        
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tl from-[#c77dff] via-[#e0aaff] to-transparent blur-3xl" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#f4a261' : '#c77dff'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, scale }}
      >
        
        {/* Minimal Header with 3D text */}
        <motion.div
          className="text-center mb-24 perspective-1000"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full backdrop-blur-xl border border-[#c77dff]/20"
            style={{
              background: 'rgba(212, 165, 116, 0.05)',
              boxShadow: '0 8px 32px rgba(199, 125, 255, 0.1)'
            }}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-[#f4a261]" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4a261] via-[#e9c46a] to-[#c77dff] font-medium text-sm tracking-wide">Get to know me</span>
          </motion.div>

          <motion.h2 
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
            style={{
              background: 'linear-gradient(135deg, #f4a261 0%, #e9c46a 25%, #c77dff 75%, #e0aaff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(244, 162, 97, 0.4)',
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="w-32 h-1.5 mx-auto rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#f4a261] via-[#e9c46a] via-[#c77dff] to-[#e0aaff]"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          
          {/* Floating Stats */}
          <div className="relative mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group relative"
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: 0.1 * index, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -20, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* 3D Card */}
                  <div 
                    className="relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#c77dff]/40"
                    style={{
                      boxShadow: `0 25px 50px -12px ${stat.color}10`,
                    }}
                  >
                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                      style={{ 
                        background: `radial-gradient(circle at 50% 50%, ${stat.color}20, transparent 70%)`
                      }}
                    />

                    {/* Icon */}
                    <motion.div
                      className="inline-flex p-4 rounded-2xl mb-6 relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]"
                      style={{
                        border: `1px solid ${stat.color}30`,
                        boxShadow: `0 10px 40px ${stat.color}20`
                      }}
                      whileHover={{ 
                        rotateY: 360,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      <stat.icon 
                        className="w-8 h-8" 
                        style={{ 
                          color: stat.color,
                          filter: `drop-shadow(0 0 10px ${stat.color})`
                        }}
                      />
                    </motion.div>

                    {/* Value */}
                    <h3 
                      className="text-4xl font-black mb-2 relative"
                      style={{ 
                        color: stat.color,
                        textShadow: `0 0 30px ${stat.color}40`
                      }}
                    >
                      {stat.value}
                    </h3>

                    {/* Label */}
                    <p className="text-sm text-gray-400 font-medium tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="relative p-12 md:p-16 lg:p-20 rounded-[3rem] backdrop-blur-2xl overflow-hidden bg-[#0d0d0d] border border-[#1f1f1f] hover:border-[#c77dff]/40 transition-all duration-500"
              style={{
                boxShadow: '0 40px 100px -20px rgba(199, 125, 255, 0.2)',
              }}
            >
              {/* Floating orbs inside */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f4a261]/5 rounded-full blur-3xl -z-10 opacity-50" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c77dff]/5 rounded-full blur-3xl -z-10 opacity-50" />

              <div className="relative space-y-10">
                {/* Title */}
                <motion.h3 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f4a261] via-[#e9c46a] via-[#c77dff] to-[#e0aaff]"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {profile?.about_title || "Passionate Developer & Creative Problem Solver"}
                </motion.h3>

                {/* Description */}
                <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed max-w-4xl">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {profile?.about_description_1 || 
                      "I'm a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences. With 5+ years of experience in web development, I specialize in building modern web applications using cutting-edge technologies."}
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    {profile?.about_description_2 || 
                      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing. I believe in continuous learning and staying up-to-date with the latest industry trends."}
                  </motion.p>
                </div>

                {/* CV Download Button */}
                {profile?.cv_url ? (
                  <motion.a
                    href={profile.cv_url}
                    download={profile.cv_filename || "cv.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-lg text-white overflow-hidden bg-gradient-to-r from-[#f4a261] via-[#e9c46a] to-[#c77dff] hover:shadow-2xl hover:shadow-[#f4a261]/40 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-6 h-6 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                    <span className="relative z-10 tracking-wide">Download CV</span>
                  </motion.a>
                ) : (
                  <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400">
                    <Award className="w-6 h-6 text-[#c77dff]" />
                    <span className="font-medium">CV not available</span>
                  </div>
                )}
              </div>

              {/* Floating Status Badge */}
              <motion.div 
                className="absolute top-8 right-8 flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-xl border border-[#c77dff]/30 bg-[#c77dff]/10"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full bg-[#c77dff]"
                  animate={{ 
                    boxShadow: [
                      '0 0 0px rgba(199, 125, 255, 0.8)',
                      '0 0 20px rgba(199, 125, 255, 1)',
                      '0 0 0px rgba(199, 125, 255, 0.8)'
                    ],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4a261] via-[#e9c46a] to-[#c77dff] text-sm font-bold tracking-wider">AVAILABLE</span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
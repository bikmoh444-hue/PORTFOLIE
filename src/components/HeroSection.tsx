import { motion } from 'framer-motion';
import { ChevronDown, MapPin, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import profileImage from '@/assets/profile.png';

const techStack = ['React', 'javaScript', ' CSS', 'PYTHON', 'Git'];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-20 bg-slate-950"
    >
      {/* Dark Background with Cyan/Pink Glow */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large cyan glow on left */}
        <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]" />
        {/* Pink glow on right */}
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px]" />
        {/* Center blend */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[100px]" />
        
        {/* Subtle stars/dots */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Cyan/Pink glow around image */}
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-3xl" />
              
              {/* Image container with cyan/pink border */}
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full p-1">
                  <div className="w-full h-full bg-slate-950 rounded-full p-2">
                    <img
                      src={profileImage}
                      alt="Bikta Mohamed"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Available badge - cyan/emerald like in image */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-6 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Available
              </motion.div>

              {/* Floating code badge - purple like in image */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left space-y-6"
          >
            {/* Small greeting with cyan dot */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-cyan-400 font-medium text-lg flex items-center justify-center lg:justify-start gap-2"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full" />
              Hello, I'm
            </motion.p>
            
            {/* Large cyan name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="text-cyan-400">
                Bikta Mohamed
              </span>
            </motion.h1>

            {/* Info with icons - gray text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 text-slate-400"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <GraduationCap className="w-5 h-5 text-slate-400" />
                <span>2ème année — ESTG Guelmim</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-cyan-400">&lt;/</span>
                <span>Génie Informatique • Full Stack Developer</span>
                <span className="text-cyan-400">&gt;</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-5 h-5 text-slate-400" />
                <span>Tagant, Guelmim, Morocco</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-slate-300 leading-relaxed"
            >
              Passionate about creating digital solutions and turning ideas into elegant, 
              functional web applications.
            </motion.p>

            {/* Tech Stack - dark pills with cyan/teal borders */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="px-5 py-2 bg-slate-900 border border-cyan-500/30 rounded-full text-cyan-400 font-medium hover:border-cyan-500/60 hover:bg-slate-800 transition-all"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Pink gradient CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="pt-4"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 mx-auto lg:mx-0"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Explore My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
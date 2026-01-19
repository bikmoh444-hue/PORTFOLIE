import { motion } from 'framer-motion';
import { ChevronDown, MapPin, GraduationCap, Sparkles, Rocket, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/profile.png';

const techStack = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Git'];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Background - Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
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
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image with Enhanced 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative group perspective-1000"
          >
            {/* Multi-layered glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-cyan-400 to-accent rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition-opacity duration-700" />
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-50 blur-lg group-hover:opacity-80 transition-opacity duration-500" />
            
            <motion.div
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shadow-primary/20"
              whileHover={{ 
                rotateY: 15, 
                rotateX: -10,
                scale: 1.08,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={profileImage}
                alt="Bikta Mohamed"
                className="w-full h-full object-cover"
              />
              {/* Image overlay on hover with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            {/* Enhanced Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/30"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Available
            </motion.div>

            {/* Floating code icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="absolute -top-2 -left-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white p-2.5 rounded-xl shadow-lg"
              
             
            >
              <Code2 className="w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-primary font-mono text-sm mb-2 flex items-center justify-center lg:justify-start gap-2"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Hello, I'm
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="gradient-text text-shadow-glow">Bikta Mohamed</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-2 mb-6 text-muted-foreground"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>2ème année — ESTG Guelmim</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="font-mono text-primary">{'</'}</span>
                <span>Génie Informatique • Full Stack Developer</span>
                <span className="font-mono text-primary">{'>'}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Tagant, Guelmim, Morocco</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-foreground/80 mb-6"
            >
              Passionate about creating digital solutions and turning ideas into elegant, 
              functional web applications.
            </motion.p>

            {/* Tech Stack Badges - Enhanced */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
            >
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  className="px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 rounded-full text-primary hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Enhanced Super 3D Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 shadow-2xl"
              >
                {/* Multiple 3D layers for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-700 to-red-700 rounded-2xl transform translate-y-2 group-hover:translate-y-1 transition-transform duration-200"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl transform translate-y-1 group-hover:translate-y-0.5 transition-transform duration-200"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl"></div>
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl animate-shimmer"></div>
                
                {/* Top shine effect */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl"></div>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Button content */}
                <span className="relative flex items-center gap-3 z-10 text-base">
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  Explore My Work
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
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
            className="text-muted-foreground flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
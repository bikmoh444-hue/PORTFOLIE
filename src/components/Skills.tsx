import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createClient } from '@supabase/supabase-js';
import * as SiIcons from 'react-icons/si';
import { Award, ChevronDown, Sparkles, Zap } from 'lucide-react';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  level: number;
  color: string;
  order_index: number;
}

// Enhanced 3D Tilt Card with depth
const TiltCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const scale = useTransform(y, [-100, 100], [1, 1.05]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100, rotateX: -30, z: -100 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.8,
        type: "spring",
        stiffness: 80
      }}
      whileHover={{ 
        z: 100,
        scale: 1.1,
        transition: { duration: 0.4, type: "spring" }
      }}
    >
      {children}
    </motion.div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools'];

  // Black/Yellow theme colors
  const categoryColors: Record<string, string> = {
    'Frontend': '#fbbf24',
    'Backend': '#f59e0b',
    'Database': '#eab308',
    'DevOps': '#facc15',
    'Tools': '#fde047',
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false })
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching skills:', error);
      } else {
        setSkills(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 10);
  const hasMore = filteredSkills.length > 10;

  const renderSkillIcon = (skill: Skill) => {
    try {
      const iconData = JSON.parse(skill.icon);
      
      if (iconData.iconName && iconData.color) {
        const IconComponent = (SiIcons as any)[iconData.iconName];
        
        if (IconComponent) {
          return (
            <IconComponent
              className="w-14 h-14"
              style={{ 
                color: '#fbbf24',
                filter: `drop-shadow(0 0 20px #fbbf2480)`,
              }}
            />
          );
        }
      }
    } catch (e) {
      if (skill.icon && !skill.icon.startsWith('{')) {
        return <span className="text-6xl">{skill.icon}</span>;
      }
    }
    
    return <Zap className="w-14 h-14 text-yellow-400" />;
  };

  if (loading) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <motion.div
            className="relative w-24 h-24 mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 border-r-yellow-500" />
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-transparent border-b-yellow-300 border-l-yellow-600"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <p className="text-yellow-400 text-lg font-semibold">Loading Skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="skills" 
      className="relative min-h-screen py-32 overflow-hidden bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
          animate={{
            x: [0, 150, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-500 via-yellow-600 to-transparent blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full opacity-10"
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1.2, 1, 1.2],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tl from-yellow-400 via-amber-500 to-transparent blur-3xl" />
        </motion.div>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-8 px-8 py-4 rounded-full backdrop-blur-xl"
            style={{
              background: 'rgba(251, 191, 36, 0.08)',
              border: '2px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 10px 40px rgba(251, 191, 36, 0.2), inset 0 2px 0 rgba(251, 191, 36, 0.1)'
            }}
            initial={{ scale: 0, rotate: -270 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.3, 
              type: "spring", 
              stiffness: 150,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.08,
              boxShadow: '0 15px 50px rgba(251, 191, 36, 0.3)',
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <span className="text-yellow-400/90 font-bold tracking-wider text-sm uppercase">
              Technical Expertise
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
            style={{
              background: 'linear-gradient(90deg, #fde047 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #b45309 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 100px rgba(251, 191, 36, 0.5)',
            }}
            initial={{ opacity: 0, y: 80, rotateX: -45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
          >
            My Skills
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Cutting-edge technologies and tools I master to build exceptional digital experiences
          </motion.p>

          {/* Animated underline */}
          <motion.div 
            className="relative w-40 h-2 mx-auto rounded-full overflow-hidden"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
            initial={{ scaleX: 0, rotateY: 90 }}
            whileInView={{ scaleX: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {categories.map((category, idx) => {
            const isSelected = selectedCategory === category;
            
            return (
              <motion.button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowAll(false);
                }}
                className="relative px-10 py-4 rounded-full font-bold transition-all duration-300 overflow-hidden text-base"
                style={
                  isSelected
                    ? {
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        boxShadow: '0 15px 50px rgba(251, 191, 36, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
                        color: '#000',
                        border: '2px solid rgba(251, 191, 36, 0.5)',
                      }
                    : {
                        background: 'rgba(251, 191, 36, 0.05)',
                        border: '2px solid rgba(251, 191, 36, 0.2)',
                        color: '#fbbf24',
                        backdropFilter: 'blur(10px)',
                      }
                }
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.4 + idx * 0.08,
                  type: "spring",
                  stiffness: 150
                }}
                whileHover={{ 
                  scale: 1.12,
                  y: -5,
                  rotateY: isSelected ? 0 : 10,
                  boxShadow: isSelected 
                    ? '0 20px 60px rgba(251, 191, 36, 0.6)'
                    : '0 15px 40px rgba(251, 191, 36, 0.3)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.92 }}
              >
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                  {category}
                  {category !== 'All' && (
                    <span className={`text-xs font-extrabold ${isSelected ? 'text-black/60' : 'text-yellow-400/60'}`}>
                      ({skills.filter(s => s.category === category).length})
                    </span>
                  )}
                </span>

                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 -z-10 blur-xl"
                  style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent 70%)' }}
                />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {displayedSkills.map((skill, index) => {
              return (
                <TiltCard key={skill.id} index={index}>
                  <div
                    className="group relative h-full p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 cursor-pointer"
                    style={{
                      background: 'rgba(251, 191, 36, 0.03)',
                      border: '2px solid rgba(251, 191, 36, 0.15)',
                      boxShadow: '0 25px 60px -15px rgba(251, 191, 36, 0.2), inset 0 2px 0 rgba(251, 191, 36, 0.1)',
                      transform: 'translateZ(40px)',
                    }}
                  >
                    {/* Mega glow on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-3xl"
                      style={{ 
                        background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.6), transparent 70%)'
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    {/* Gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                      }}
                    />
                    
                    <div className="relative text-center" style={{ transform: 'translateZ(60px)' }}>
                      {/* Icon with massive 3D effect */}
                      <motion.div
                        className="mb-8 flex items-center justify-center"
                        whileHover={{ 
                          rotateY: 360,
                          scale: 1.3,
                          z: 100,
                          transition: { duration: 0.9, type: "spring" }
                        }}
                      >
                        <motion.div
                          animate={{ 
                            y: [0, -12, 0],
                            rotateZ: [0, 5, 0, -5, 0],
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.15
                          }}
                        >
                          {renderSkillIcon(skill)}
                        </motion.div>
                      </motion.div>

                      {/* Skill Name */}
                      <motion.p 
                        className="font-black text-xl text-white mb-6 group-hover:text-yellow-400 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill.name}
                      </motion.p>

                      {/* Proficiency */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-gray-400">Level</span>
                          <motion.span 
                            className="font-black text-xl text-yellow-400"
                            whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        
                        {/* 3D Progress Bar */}
                        <div 
                          className="relative w-full rounded-full h-3 overflow-hidden"
                          style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '2px solid rgba(251, 191, 36, 0.3)',
                            boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <motion.div
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
                              boxShadow: '0 0 20px rgba(251, 191, 36, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.08,
                              ease: "easeOut" 
                            }}
                          >
                            {/* Animated shine */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 4,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <motion.div 
                        className="mt-6"
                        whileHover={{ scale: 1.15, rotateZ: [0, -3, 3, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <span 
                          className="inline-block text-xs px-5 py-2 rounded-full font-black backdrop-blur-sm"
                          style={{
                            backgroundColor: 'rgba(251, 191, 36, 0.2)',
                            color: '#fbbf24',
                            border: '1.5px solid rgba(251, 191, 36, 0.5)',
                            boxShadow: '0 5px 20px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          {skill.category}
                        </span>
                      </motion.div>
                    </div>

                    {/* Glowing corner dots */}
                    {[
                      { top: '12px', right: '12px' },
                      { top: '12px', left: '12px' },
                      { bottom: '12px', right: '12px' },
                      { bottom: '12px', left: '12px' },
                    ].map((position, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          ...position,
                          backgroundColor: '#fbbf24',
                          boxShadow: '0 0 15px #fbbf24',
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>
                </TiltCard>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        {hasMore && !showAll && (
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="group relative px-16 py-6 rounded-full font-black text-xl text-black overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
                boxShadow: '0 25px 70px rgba(251, 191, 36, 0.5)',
              }}
              whileHover={{ 
                scale: 1.08,
                rotateX: 10,
                boxShadow: '0 35px 90px rgba(251, 191, 36, 0.7)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.92 }}
            >
              {/* Shine animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
              />
              
              <span className="relative flex items-center gap-4">
                <Sparkles className="w-6 h-6" />
                View All Skills ({filteredSkills.length})
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-7 h-7" />
                </motion.div>
              </span>

              {/* Pulsing glow */}
              <motion.div 
                className="absolute -inset-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full blur-2xl opacity-60 -z-10"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        )}

        {/* Show Less */}
        {showAll && hasMore && (
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowAll(false)}
              className="px-12 py-5 rounded-full font-bold backdrop-blur-xl border-2 text-yellow-400 transition-all duration-300"
              style={{
                background: 'rgba(251, 191, 36, 0.05)',
                borderColor: 'rgba(251, 191, 36, 0.4)',
              }}
              whileHover={{ 
                scale: 1.08,
                borderColor: 'rgba(251, 191, 36, 0.8)',
                boxShadow: '0 15px 40px rgba(251, 191, 36, 0.4)',
              }}
              whileTap={{ scale: 0.92 }}
            >
              Show Less
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {displayedSkills.length === 0 && (
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ 
                rotateY: 360,
                y: [0, -15, 0]
              }}
              transition={{ 
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Award className="w-28 h-28 text-yellow-400/30 mx-auto mb-8" />
            </motion.div>
            <p className="text-gray-500 text-2xl font-bold">
              {selectedCategory === 'All' 
                ? 'No skills added yet' 
                : `No ${selectedCategory} skills found`
              }
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
          }}
        />
      </motion.div>
    </section>
  );
};

export default Skills;
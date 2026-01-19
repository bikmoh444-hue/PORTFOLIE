import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import anwalDeRome from '@/assets/projects/anwal-de-rome.png';
import dindeSahara from '@/assets/projects/dinde-sahara.png';

const projects = [
  {
    title: 'Anwal de Rome',
    description: 'A modern restaurant website featuring authentic Moroccan cuisine, bilingual support (Arabic/French), and an elegant UI with smooth animations.',
    image: anwalDeRome,
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    badgeColor: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    title: 'Dinde Sahara',
    description: 'E-commerce platform for a premium meat supplier, featuring product catalog, multi-language support, and modern red-themed design.',
    image: dindeSahara,
    tags: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    badgeColor: 'from-red-500 to-pink-500',
    gradient: 'from-red-500/10 to-pink-500/10',
  },
  {
    title: 'Portfolio Website',
    description: 'This personal portfolio built with modern technologies, featuring smooth animations, responsive design, glassmorphism effects, and a stunning dark theme.',
    image: null,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Git'],
    demoUrl: '#',
    githubUrl: '#',
    isCurrent: true,
    badgeColor: 'from-cyan-500 to-blue-500',
    gradient: 'from-cyan-500/10 to-blue-500/10',
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleDemoClick = (projectTitle: string) => {
    toast({
      title: '🚀 Demo Opening',
      description: `Loading ${projectTitle} live demo...`,
    });
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
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
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            My Work
          </motion.span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects I've worked on, showcasing my skills in web development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card with enhanced effects */}
              <div className="relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
                
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  {project.image ? (
                    <>
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 z-10 group-hover:opacity-60 transition-opacity`} />
                      
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-cyan-500/10 to-accent/20 flex items-center justify-center relative overflow-hidden">
                      {/* Animated grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl z-10"
                      >
                        ⚡
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    {project.featured && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.badgeColor} text-white text-xs font-bold shadow-lg`}
                      >
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </motion.div>
                    )}
                    {project.isCurrent && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.badgeColor} text-white text-xs font-bold shadow-lg`}
                      >
                        <Zap className="w-3 h-3" />
                        Current
                      </motion.div>
                    )}
                  </div>

                  {/* Hover overlay with icon buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.a
                      href={project.demoUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDemoClick(project.title);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-primary rounded-full text-primary-foreground shadow-lg hover:shadow-primary/50 transition-shadow"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-card border border-border rounded-full text-foreground shadow-lg hover:shadow-border/50 transition-shadow"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 border border-primary/30 rounded-full text-primary cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Bottom buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleDemoClick(project.title)}
                      className="flex-1 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-primary-foreground font-semibold gap-2 shadow-lg hover:shadow-primary/30 transition-shadow"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:bg-secondary gap-2"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </Button>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 shadow-2xl"
          >
            {/* 3D layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-700 rounded-2xl transform translate-y-2 group-hover:translate-y-1 transition-transform duration-200"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-2xl transform translate-y-1 group-hover:translate-y-0.5 transition-transform duration-200"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            
            {/* Top shine */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl"></div>
            
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <span className="relative flex items-center gap-3 z-10 text-base">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              View All Projects
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
      </div>
    </section>
  );
};

export default ProjectsSection;
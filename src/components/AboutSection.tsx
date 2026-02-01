import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code2, Users, Calendar } from 'lucide-react';

const timelineItems = [
  {
    year: '2023',
    title: 'Baccalauréat',
    description: 'Obtained Bac diploma with focus on sciences',
    icon: GraduationCap,
  },
  {
    year: '2023-Present',
    title: 'Ecole Supérieure de Technologies - Guelmim ',
    description: '2ème année - Génie Informatique',
    icon: Code2,
  },
  {
    year: 'Active',
    title: 'Associations',
    description: 'Active member in association la nouvelle generation sportive ',
    icon: Users,
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate computer science student dedicated to building impactful digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Who I Am
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm <span className="text-primary font-medium">Bikta Mohamed</span>, a second-year 
              computer science student at ESTG Guelmim, specializing in Web Development and 
              Software Engineering.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              My journey in tech started with curiosity and has grown into a passion for 
              creating solutions that make a difference. I love working with modern 
              technologies and am always eager to learn new things.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond coding, I'm actively involved in student associations, where I 
              collaborate with peers and contribute to community projects.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Education & Experience
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
              
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                  className="relative pl-12 pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="glass-card p-4">
                    <span className="text-xs font-mono text-primary">{item.year}</span>
                    <h4 className="font-semibold mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Heart } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
          
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-sm flex items-center gap-1"
          >
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{' '}
            <span className="gradient-text font-medium">Bikta Mohamed</span>
          </motion.div>

          {/* Year */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-sm"
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

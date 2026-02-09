import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "py-3" 
            : "py-5"
        }`}
        style={{
          background: scrolled 
            ? 'rgba(0, 0, 0, 0.95)' 
            : 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '2px solid rgba(251, 191, 36, 0.3)' : '2px solid rgba(251, 191, 36, 0.1)',
          boxShadow: scrolled 
            ? '0 10px 40px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(251, 191, 36, 0.1)' 
            : '0 5px 20px rgba(0, 0, 0, 0.3)',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            
            {/* Logo with 3D effect */}
            <motion.a
              href="#home"
              className="flex items-center z-10 relative"
              onClick={handleNavClick}
              initial={{ opacity: 0, x: -50, rotateY: -90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
              }}
            >
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl opacity-0"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent 70%)',
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.img 
                src="https://i.ibb.co/1G4PnVNq/logo-portfolio.png" 
                alt="Portfolio Logo" 
                className="h-12 sm:h-14 w-auto object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
                  transform: 'translateZ(20px)',
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
                    'drop-shadow(0 0 25px rgba(251, 191, 36, 0.8))',
                    'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.a>

            {/* Desktop Nav Links with 3D effects */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="relative px-6 py-3 font-bold transition-all duration-300 overflow-hidden rounded-xl group"
                    style={{
                      color: isActive ? '#000' : '#fbbf24',
                      transformStyle: 'preserve-3d',
                      perspective: 1000,
                    }}
                    initial={{ opacity: 0, y: -30, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.08,
                      y: -3,
                      rotateX: 5,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Background gradient on active/hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: isActive 
                          ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                          : 'transparent',
                        boxShadow: isActive 
                          ? '0 10px 30px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                          : '0 0 0 transparent',
                        transform: 'translateZ(-10px)',
                      }}
                      whileHover={!isActive ? {
                        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15))',
                        boxShadow: '0 5px 20px rgba(251, 191, 36, 0.2)',
                      } : {}}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Animated shine effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    {/* Text with 3D depth */}
                    <span 
                      className="relative z-10 text-sm"
                      style={{
                        transform: 'translateZ(20px)',
                        textShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
                      }}
                    >
                      {item.label}
                    </span>

                    {/* Active indicator line */}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-1/2 h-1 bg-black rounded-full"
                        style={{
                          transform: 'translateX(-50%) translateZ(30px)',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                        }}
                        layoutId="activeNav"
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 -z-10 blur-xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3), transparent 70%)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Button with 3D */}
            <div className="lg:hidden flex items-center z-10">
              <motion.button 
                className="p-3 rounded-xl relative overflow-hidden"
                style={{
                  background: mobileMenuOpen 
                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
                    : 'rgba(251, 191, 36, 0.1)',
                  border: '2px solid rgba(251, 191, 36, 0.3)',
                  boxShadow: mobileMenuOpen 
                    ? '0 10px 30px rgba(251, 191, 36, 0.4)'
                    : '0 5px 15px rgba(251, 191, 36, 0.2)',
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9, rotateZ: 90 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
                aria-label="Toggle mobile menu"
                initial={{ opacity: 0, rotateZ: -180 }}
                animate={{ opacity: 1, rotateZ: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" style={{ color: '#000' }} />
                  ) : (
                    <Menu className="w-6 h-6 text-yellow-400" />
                  )}
                </motion.div>

                {/* Glow pulse */}
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-50 -z-10 blur-lg"
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu with 3D effects */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: 'rgba(0, 0, 0, 0.98)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Animated background orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #fbbf24, transparent)',
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-24 left-0 right-0 bottom-0 overflow-y-auto"
              initial={{ y: -50, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.5, type: "spring" }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
              }}
            >
              <div className="container mx-auto px-4 py-8">
                <div 
                  className="rounded-3xl p-8 space-y-3"
                  style={{
                    background: 'rgba(251, 191, 36, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(251, 191, 36, 0.2)',
                    boxShadow: '0 20px 60px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(251, 191, 36, 0.1)',
                  }}
                >
                  {/* Navigation Links */}
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.slice(1);
                    
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={handleNavClick}
                        className="block px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-300 relative overflow-hidden"
                        style={{
                          background: isActive 
                            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
                            : 'rgba(251, 191, 36, 0.05)',
                          color: isActive ? '#000' : '#fbbf24',
                          border: `2px solid ${isActive ? 'rgba(251, 191, 36, 0.5)' : 'rgba(251, 191, 36, 0.2)'}`,
                          boxShadow: isActive 
                            ? '0 10px 30px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                            : '0 5px 15px rgba(0, 0, 0, 0.2)',
                          transformStyle: 'preserve-3d',
                        }}
                        initial={{ opacity: 0, x: -100, rotateY: -90 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{
                          scale: 1.05,
                          x: 10,
                          rotateY: 5,
                          boxShadow: '0 15px 40px rgba(251, 191, 36, 0.5)',
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Shine effect */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          />
                        )}

                        <span 
                          className="relative z-10"
                          style={{
                            transform: 'translateZ(20px)',
                            textShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
                          }}
                        >
                          {item.label}
                        </span>

                        {/* Active indicator dot */}
                        {isActive && (
                          <motion.div
                            className="absolute right-6 top-1/2 w-3 h-3 rounded-full bg-black"
                            style={{
                              transform: 'translateY(-50%) translateZ(30px)',
                              boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
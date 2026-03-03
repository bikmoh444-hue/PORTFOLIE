import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

const navItems = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((i) => i.href.slice(1));
      const current = sections.find((s) => {
        const el = document.getElementById(s);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const close = () => setMobileMenuOpen(false);

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
        style={{
          background: scrolled ? "rgba(0,0,0,0.97)" : "rgba(0,0,0,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Courier New', monospace",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" } as Transition}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <motion.a
              href="#home"
              onClick={close}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="https://i.ibb.co/SDvgWSQ7/LOGO-BIKTA.png"
                alt="Portfolio Logo"
                className="h-12 sm:h-14 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))" }}
              />
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative px-5 py-2.5 text-xs font-black tracking-widest uppercase transition-colors duration-200 rounded-sm ${
                      isActive
                        ? "bg-white text-black"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2.5 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-sm"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen
                ? <X    className="w-5 h-5 text-white" />
                : <Menu className="w-5 h-5 text-white" />
              }
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 } as Transition}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={close}
            />

            {/* Menu panel */}
            <motion.div
              className="absolute top-20 left-4 right-4"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" } as Transition}
            >
              <div
                className="rounded-sm border border-white/15 bg-neutral-900 overflow-hidden"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={close}
                      className={`flex items-center justify-between px-6 py-4 text-sm font-black tracking-widest uppercase transition-colors duration-150 border-b border-white/5 last:border-0 ${
                        isActive
                          ? "bg-white text-black"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={`text-[10px] ${isActive ? "text-black/40" : "text-white/20"}`}>
                        CH 0{index + 1}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
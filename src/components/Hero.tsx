import { motion, type Transition } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail, Zap, Cpu } from "lucide-react";
import { useProfile } from "@/pages/hooks/useProfile";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" } as Transition,
});

const Hero = () => {
  const { profile, loading } = useProfile();

  const defaultData = {
    greeting: "Hello, I'm",
    name: "Hecham Arjdal",
    title: "Full Stack Developer",
    description:
      "Crafting digital experiences with clean code and creative design. Let's build something amazing together.",
    photo_url: "/assets/profile-photo.jpg",
  };

  const getSocialLinks = () => {
    if (!profile) {
      return [
        { icon: Github,    href: "https://github.com",          label: "GitHub"    },
        { icon: Linkedin,  href: "https://linkedin.com",        label: "LinkedIn"  },
        { icon: Instagram, href: "https://instagram.com",       label: "Instagram" },
        { icon: Twitter,   href: "https://twitter.com",         label: "Twitter"   },
        { icon: Mail,      href: "mailto:hello@example.com",    label: "Email"     },
      ];
    }
    const links = [];
    if (profile.github_url)    links.push({ icon: Github,    href: profile.github_url,           label: "GitHub"    });
    if (profile.linkedin_url)  links.push({ icon: Linkedin,  href: profile.linkedin_url,         label: "LinkedIn"  });
    if (profile.instagram_url) links.push({ icon: Instagram, href: profile.instagram_url,        label: "Instagram" });
    if (profile.twitter_url)   links.push({ icon: Twitter,   href: profile.twitter_url,          label: "Twitter"   });
    if (profile.email)         links.push({ icon: Mail,      href: `mailto:${profile.email}`,    label: "Email"     });
    return links.length > 0 ? links : [
      { icon: Github,    href: "https://github.com",       label: "GitHub"    },
      { icon: Linkedin,  href: "https://linkedin.com",     label: "LinkedIn"  },
      { icon: Instagram, href: "https://instagram.com",    label: "Instagram" },
      { icon: Twitter,   href: "https://twitter.com",      label: "Twitter"   },
      { icon: Mail,      href: "mailto:hello@example.com", label: "Email"     },
    ];
  };

  const socialLinks = getSocialLinks();
  const displayData = {
    greeting:    profile?.greeting    || defaultData.greeting,
    name:        profile?.name        || defaultData.name,
    title:       profile?.title       || defaultData.title,
    description: profile?.description || defaultData.description,
    photo_url:   profile?.photo_url   || defaultData.photo_url,
  };

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Static grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Static radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 50%, rgba(100,100,100,0.05) 0%, transparent 50%)",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 py-20">

          {/* LEFT — Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" } as Transition}
          >
            {/* Subtle float — only the image, one loop */}
            <motion.div
              className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" } as Transition}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Cpu className="w-12 h-12 text-gray-400 animate-spin" />
                  </div>
                ) : (
                  <img
                    src={displayData.photo_url}
                    alt={displayData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Ccircle cx="200" cy="200" r="200" fill="%23374151"/%3E%3Ctext fill="%239CA3AF" font-family="system-ui" font-size="24" font-weight="600" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProfile%3C/text%3E%3C/svg%3E';
                    }}
                  />
                )}
              </div>

              {/* Static glow behind image */}
              <div
                className="absolute inset-0 rounded-full blur-3xl -z-10 opacity-30"
                style={{ background: "radial-gradient(circle, rgba(100,100,100,0.4), transparent)" }}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT — Text Content */}
          <div className="space-y-6 text-center lg:text-left max-w-xl">

            {/* Greeting Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-600/40 backdrop-blur-md bg-gray-800/30"
              {...fadeUp(0.1)}
            >
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 font-bold text-sm tracking-widest uppercase">
                {displayData.greeting}
              </span>
              <div className="w-px h-4 bg-gray-600" />
              {/* Simple static dots */}
              <div className="flex gap-1 items-end">
                {[0.6, 1, 0.7].map((h, i) => (
                  <div key={i} className="w-1 rounded-full bg-gray-400" style={{ height: `${h * 12}px` }} />
                ))}
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white"
              style={{ textShadow: "0 0 30px rgba(156,163,175,0.3)" }}
              {...fadeUp(0.2)}
            >
              {loading ? "Loading..." : displayData.name}
            </motion.h1>

            {/* Title */}
            <motion.div className="flex items-center gap-3 justify-center lg:justify-start" {...fadeUp(0.3)}>
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-500" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-300">
                {loading ? "..." : displayData.title}
              </h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-500" />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-gray-400 leading-relaxed px-4 lg:px-0"
              {...fadeUp(0.4)}
            >
              {loading ? "Loading..." : displayData.description}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="grid grid-cols-5 gap-3 max-w-sm mx-auto lg:mx-0 pt-4"
              {...fadeUp(0.5)}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group aspect-square rounded-lg bg-gray-800/60 border border-gray-600/40 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.12, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.92 }}
                >
                  <social.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 pt-6" {...fadeUp(0.6)}>
              <motion.button
                onClick={scrollTo("projects")}
                className="relative px-8 py-4 rounded-lg font-bold bg-gray-300 text-gray-900 cursor-pointer"
                whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(156,163,175,0.25)" }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="flex items-center gap-2 justify-center">
                  <Cpu className="w-5 h-5" />
                  View Projects
                </span>
              </motion.button>

              <motion.button
                onClick={scrollTo("contact")}
                className="px-8 py-4 rounded-lg font-bold border-2 border-gray-600/50 bg-gray-800/30 hover:bg-gray-700/40 text-gray-300 transition-colors cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Contact Me
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Static bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent" />
    </section>
  );
};

export default Hero;
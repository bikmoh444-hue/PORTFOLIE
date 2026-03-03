import { motion, type Transition } from "framer-motion";
import { Download, Briefcase, GraduationCap, MapPin, Code, Award, Sparkles } from "lucide-react";
import { useProfile } from "@/pages/hooks/useProfile";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, delay, ease: "easeOut" } as Transition,
});

const About = () => {
  const { profile, loading } = useProfile();

  const stats = profile
    ? [
        { icon: Briefcase, label: "Experience", value: profile.experience_years || "5+ Years", ch: "CH 01" },
        { icon: GraduationCap, label: "Education", value: profile.education || "CS Degree", ch: "CH 02" },
        { icon: MapPin, label: "Localisation", value: profile.location || "San Francisco", ch: "CH 03" },
        { icon: Code, label: "Projects", value: profile.projects_completed || "50+ Done", ch: "CH 04" },
      ]
    : [
        { icon: Briefcase, label: "Experience", value: "5+ Years", ch: "CH 01" },
        { icon: GraduationCap, label: "Education", value: "CS Degree", ch: "CH 02" },
        { icon: MapPin, label: "Location", value: "San Francisco", ch: "CH 03" },
        { icon: Code, label: "Projects", value: "50+ Done", ch: "CH 04" },
      ];

  if (loading) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white/40 font-mono text-sm animate-pulse tracking-widest">SIGNAL SEARCHING...</p>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 overflow-hidden bg-black"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
        }}
      />

      {/* Static bg blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 border border-white/20 bg-white/5 backdrop-blur-xl rounded-sm"
            {...fadeUp(0)}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white/80 font-black text-xs tracking-[0.3em] uppercase">Get to know me</span>
          </motion.div>

          <motion.h2
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none text-white"
            style={{ textShadow: "0 0 60px rgba(255,255,255,0.1)" }}
            {...fadeUp(0.1)}
          >
            About Me
          </motion.h2>

          <motion.div
            className="w-32 h-px mx-auto bg-white/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 } as Transition}
          />
        </div>

        <div className="max-w-7xl mx-auto">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative"
                {...fadeUp(0.08 * index)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative p-6 bg-neutral-900 border border-white/10 hover:border-white/25 transition-colors duration-300 rounded-sm overflow-hidden">
                  {/* CH label */}
                  <span className="absolute top-3 right-3 text-white/20 text-[10px] font-black tracking-widest">
                    {stat.ch}
                  </span>

                  {/* Scanline on card */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
                    }}
                  />

                  <div className="inline-flex p-3 mb-5 bg-neutral-800 border border-white/10 rounded-sm">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-3xl font-black mb-1 text-white leading-none">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-white/40 font-black tracking-widest uppercase">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            className="relative p-10 md:p-14 bg-neutral-900 border border-white/10 hover:border-white/20 transition-colors duration-300 rounded-sm overflow-hidden"
            {...fadeUp(0.2)}
          >
            {/* Scanline on card */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
              }}
            />

            {/* Static glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-8">
              <motion.h3
                className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white"
                {...fadeUp(0.25)}
              >
                {profile?.about_title || "Passionate Developer & Creative Problem Solver"}
              </motion.h3>

              <div className="space-y-4 text-white/50 text-base md:text-lg leading-relaxed max-w-4xl">
                <motion.p {...fadeUp(0.3)}>
                  {profile?.about_description_1 ||
                    "I'm a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences. With 5+ years of experience in web development, I specialize in building modern web applications using cutting-edge technologies."}
                </motion.p>
                <motion.p {...fadeUp(0.35)}>
                  {profile?.about_description_2 ||
                    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing. I believe in continuous learning and staying up-to-date with the latest industry trends."}
                </motion.p>
              </div>

              {profile?.cv_url ? (
                <motion.a
                  href={profile.cv_url}
                  download={profile.cv_filename || "cv.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 font-black text-sm text-black bg-white hover:bg-white/90 transition-colors duration-200 rounded-sm tracking-widest uppercase"
                  {...fadeUp(0.4)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </motion.a>
              ) : (
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-800 border border-white/10 text-white/40 text-sm rounded-sm"
                  {...fadeUp(0.4)}
                >
                  <Award className="w-5 h-5" />
                  <span className="font-black tracking-widest uppercase text-xs">CV not available</span>
                </motion.div>
              )}
            </div>

            {/* AVAILABLE badge */}
            <motion.div
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 border border-white/15 bg-white/5 backdrop-blur-xl rounded-sm"
              {...fadeUp(0.5)}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-white/60 text-[10px] font-black tracking-[0.25em] uppercase">Available</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
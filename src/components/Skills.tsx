import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import * as SiIcons from "react-icons/si";
import { Award, ChevronDown, Sparkles, Zap } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  level: number;
  color: string;
  order_index: number;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" } as Transition,
});

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

// ─── Skill Icon ──────────────────────────────────────────────────────────────
const SkillIcon = ({ skill }: { skill: Skill }) => {
  try {
    const iconData = JSON.parse(skill.icon);
    if (iconData.iconName) {
      const Icon = (SiIcons as Record<string, React.ElementType>)[iconData.iconName];
      if (Icon) return <Icon className="w-12 h-12 text-white" />;
    }
  } catch {
    if (skill.icon && !skill.icon.startsWith("{"))
      return <span className="text-5xl">{skill.icon}</span>;
  }
  return <Zap className="w-12 h-12 text-white" />;
};

// ─── Skill Card ───────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    {...fadeUp(Math.min(index * 0.06, 0.4))}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="group relative p-8 rounded-3xl bg-neutral-900 border border-white/10 hover:border-white/30 transition-colors duration-300 cursor-default"
  >
    {/* Hover glow — CSS only, no JS loop */}
    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl bg-white/5 pointer-events-none" />

    <div className="text-center">
      {/* Icon */}
      <div className="mb-6 flex items-center justify-center">
        <SkillIcon skill={skill} />
      </div>

      {/* Name */}
      <p className="font-black text-lg text-white mb-5">{skill.name}</p>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-semibold">Level</span>
          <span className="font-black text-white">{skill.level}%</span>
        </div>
        <div className="w-full rounded-full h-2 bg-black/50 border border-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" } as Transition}
          />
        </div>
      </div>

      {/* Category badge */}
      <span className="inline-block mt-5 text-xs px-4 py-1.5 rounded-full font-bold bg-white/10 text-white border border-white/20">
        {skill.category}
      </span>
    </div>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("level", { ascending: false })
          .order("order_index", { ascending: true });

        if (error) console.error("Error fetching skills:", error);
        else setSkills(data || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filtered =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 10);
  const hasMore = filtered.length > 10;

  if (loading) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400 text-2xl font-bold animate-pulse">Loading Skills...</p>
      </section>
    );
  }

  return (
    <section id="skills" className="relative min-h-screen py-32 overflow-hidden bg-black">

      {/* Static background — no animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-white/5 blur-3xl opacity-30" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 mb-8 px-8 py-4 rounded-full backdrop-blur-xl bg-white/5 border border-white/20"
            {...fadeUp(0)}
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white/90 font-bold tracking-wider text-sm uppercase">
              Technical Expertise
            </span>
            <Zap className="w-5 h-5 text-white" />
          </motion.div>

          <motion.h2
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none text-white"
            style={{ textShadow: "0 0 80px rgba(255,255,255,0.2)" }}
            {...fadeUp(0.1)}
          >
            My Skills
          </motion.h2>

          <motion.p
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
            {...fadeUp(0.15)}
          >
            Cutting-edge technologies and tools I master to build exceptional digital experiences
          </motion.p>

          {/* Static underline */}
          <motion.div
            className="w-40 h-1.5 mx-auto mt-8 rounded-full bg-white/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 } as Transition}
          />
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          {...fadeUp(0.2)}
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setShowAll(false); }}
                className={`px-8 py-3 rounded-full font-bold text-sm border transition-colors duration-200 ${
                  active
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white border-white/20 hover:border-white/40"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
                {cat !== "All" && (
                  <span className={`ml-1.5 text-xs font-extrabold ${active ? "text-black/50" : "text-white/50"}`}>
                    ({skills.filter((s) => s.category === cat).length})
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 } as Transition}
          >
            {displayed.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All / Show Less */}
        {hasMore && (
          <motion.div className="text-center mt-16" {...fadeUp(0.3)}>
            <motion.button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-black text-lg text-black bg-white hover:shadow-xl hover:shadow-white/20 transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? (
                "Show Less"
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  View All Skills ({filtered.length})
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {displayed.length === 0 && (
          <motion.div className="text-center py-32" {...fadeUp(0.2)}>
            <Award className="w-24 h-24 text-white/20 mx-auto mb-6" />
            <p className="text-gray-500 text-2xl font-bold">
              {selectedCategory === "All"
                ? "No skills added yet"
                : `No ${selectedCategory} skills found`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Static bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
};

export default Skills;
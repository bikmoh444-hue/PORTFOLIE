import { motion, type Transition } from "framer-motion";
import { ArrowRight, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  live_url: string;
  github_url: string;
  featured: boolean;
  created_at: string;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, delay, ease: "easeOut" } as Transition,
});

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error) setProjects(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white font-mono text-sm animate-pulse tracking-widest">
          SIGNAL SEARCHING...
        </p>
      </div>
    );
  }

  return (
    <div
      id="projects"
      className="min-h-screen bg-black py-20 px-6"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {/* Scanlines — subtle, full page */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
        }}
      />


      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div className="mb-14" {...fadeUp(0)}>
          <div className="flex items-center gap-3 mb-2">
            <Tv className="w-5 h-5 text-white" />
            <p className="text-white text-xs tracking-[0.4em] uppercase font-black">
              Channel 03 — Portfolio TV
            </p>
          </div>
          <h1
            className="text-6xl md:text-8xl font-black text-white leading-none"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
          >
            PROJECTS
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              {...fadeUp(Math.min(index * 0.08, 0.3))}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-neutral-900 border border-neutral-800 hover:border-white/20 transition-colors duration-300 rounded-sm overflow-hidden"
            >
              {/* Channel number — top left */}
              <div className="absolute top-3 left-3 z-10 bg-black/70 px-2 py-0.5 text-white text-[10px] font-black tracking-widest">
                CH {String(index + 1).padStart(2, "0")}
              </div>

              {/* Image with CRT vignette */}
              <div className="relative h-52 overflow-hidden bg-neutral-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                {/* Scanline on image */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white text-lg font-black mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[10px] font-black text-black bg-white rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white text-xs font-black hover:text-white transition-colors duration-150 group/link"
                  >
                    Visit Site
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-150" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
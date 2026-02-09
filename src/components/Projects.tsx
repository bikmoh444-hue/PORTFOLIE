import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
  updated_at: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects:', error);
        } else {
          setProjects(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-gray-400 text-2xl font-bold animate-pulse">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header - Our Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] via-[#c77dff] to-[#e0aaff]">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Explore our portfolio of stunning digital experiences
          </p>
        </motion.div>

        {/* Projects Grid - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative bg-[#0d0d0d] rounded-3xl overflow-hidden border border-[#1f1f1f] hover:border-[#c77dff]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c77dff]/20 hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-[280px] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Title */}
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] via-[#c77dff] to-[#e0aaff] text-2xl font-bold mb-4 group-hover:from-[#e0aaff] group-hover:to-[#d4a574] transition-all duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-base leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 text-sm font-medium bg-[#1f1f1f] text-gray-300 rounded-full border border-gray-700 hover:border-[#c77dff]/50 hover:text-white transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] to-[#c77dff] font-semibold transition-all duration-300 group/link"
                  >
                    View Project
                    <ArrowRight className="w-5 h-5 text-[#c77dff] group-hover/link:translate-x-1 transition-transform duration-300" />
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
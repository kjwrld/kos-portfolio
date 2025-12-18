import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { X, ExternalLink, Github, Target, Zap, Shield, Activity } from 'lucide-react';
import { Project } from '../data/projects';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect, useRef } from 'react';

interface ProjectPageProps {
  project: Project;
  onClose: () => void;
}

export function ProjectPage({ project, onClose }: ProjectPageProps) {
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger title animation on mount
  useEffect(() => {
    setTitleAnimated(true);
  }, []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax offset
  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* Scanning grid overlay - subtle tactical aesthetic */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Close button with tactical styling */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="fixed top-6 right-6 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors z-[60] shadow-lg border border-gray-700"
        aria-label="Close project"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Mission Briefing Header */}
        <motion.div
          className="mb-16 relative"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-3 py-1 bg-black text-white text-xs uppercase tracking-wider mb-4 rounded"
          >
            Mission Briefing
          </motion.div>

          <h1 className={`text-4xl md:text-6xl mb-4 chroma-text-dark ${titleAnimated ? 'chroma-text-dark-animate' : ''}`}>
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">{project.description}</p>
          
          {/* Tactical Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg cursor-pointer group hover:bg-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
                <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-gray-700 transition-colors">Status</span>
              </div>
              <div className="font-medium">Deployed</div>
              <motion.div 
                className="h-1 bg-green-500 rounded mt-2 relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg cursor-pointer group hover:bg-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
                <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-gray-700 transition-colors">Year</span>
              </div>
              <div className="font-medium">{project.year}</div>
              <motion.div 
                className="h-1 bg-blue-500 rounded mt-2 relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg cursor-pointer group hover:bg-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
                <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-gray-700 transition-colors">Role</span>
              </div>
              <div className="font-medium text-sm">{project.role}</div>
              <motion.div 
                className="h-1 bg-purple-500 rounded mt-2 relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "95%" }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg cursor-pointer group hover:bg-gray-100 hover:border-gray-900 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
                <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-gray-700 transition-colors">Stack</span>
              </div>
              <div className="font-medium text-sm">{project.tags.length} Tech</div>
              <motion.div 
                className="h-1 bg-orange-500 rounded mt-2 relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Tags with stagger animation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="px-3 py-1 bg-black text-white rounded text-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Action buttons with enhanced feedback */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                Source Code
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Main Image with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            transition: 'transform 0.3s ease-out'
          }}
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 relative group"
        >
          {/* Scanning line effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent z-10 pointer-events-none"
            initial={{ y: '-100%', opacity: 0 }}
            whileInView={{ y: '100%', opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          <ImageWithFallback
            src={project.mainImage}
            alt={project.title}
            className="w-full h-auto"
          />
          {/* Corner indicators */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Description with reveal animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.h2 
            className="text-3xl mb-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-1 h-8 bg-black"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
            Mission Overview
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {project.longDescription}
          </motion.p>
        </motion.div>

        {/* Interactive Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.h2 
            className="text-3xl mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-1 h-8 bg-black"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
            Technical Capabilities
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                className={`p-5 rounded-lg border-2 transition-all cursor-pointer ${
                  expandedFeature === index 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5 ${
                      expandedFeature === index ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">{feature}</div>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: expandedFeature === index ? 'auto' : 0,
                        opacity: expandedFeature === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`text-sm pt-2 border-t mt-2 ${
                        expandedFeature === index ? 'border-white/20' : 'border-gray-200'
                      }`}>
                        Click to expand for detailed technical specifications and implementation notes.
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFeature === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs"
                  >
                    ▼
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Inspiration Images with stagger and interaction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.h2 
            className="text-3xl mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-1 h-8 bg-black"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
            Visual Intelligence
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.inspirationImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="rounded-lg overflow-hidden shadow-lg relative group cursor-pointer border-2 border-transparent hover:border-black transition-colors"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Inspiration ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                {/* Overlay with scanning effect */}
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"
                  initial={false}
                >
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
                {/* Index indicator */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-black/80 text-white rounded flex items-center justify-center text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back to portfolio button with enhanced interaction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
            <span className="relative">Return to Mission Control</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
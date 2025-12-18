import { motion } from 'motion/react';
import { Download, Briefcase, GraduationCap, Award } from 'lucide-react';

export function CV() {
  const experiences = [
    {
      year: '2024',
      role: 'Senior Product Designer',
      company: 'Defense Systems Inc.',
      description: 'Led tactical interface design for autonomous drone systems',
      type: 'work',
    },
    {
      year: '2023',
      role: 'Product Designer',
      company: 'Robotics Corp',
      description: 'Designed control systems for industrial robotics applications',
      type: 'work',
    },
    {
      year: '2022',
      role: 'UI/UX Designer',
      company: 'Tech Solutions',
      description: 'Created user interfaces for mission-critical systems',
      type: 'work',
    },
  ];

  const education = [
    {
      year: '2020',
      degree: 'Master of Design',
      institution: 'Design University',
      description: 'Human-Computer Interaction specialization',
      type: 'education',
    },
    {
      year: '2018',
      degree: 'Bachelor of Science',
      institution: 'Tech Institute',
      description: 'Computer Science & Design',
      type: 'education',
    },
  ];

  const skills = [
    'Product Design',
    'Tactical UI/UX',
    'Figma',
    'React',
    'Three.js',
    'Prototyping',
    'User Research',
    'Design Systems',
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 relative overflow-auto">
      {/* Tactical grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold text-black mb-2">YOUR NAME</h1>
              <p className="text-xl text-gray-600 uppercase tracking-widest">
                Senior Product Designer
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.button>
          </div>

          {/* Contact info bar */}
          <div className="flex gap-6 text-sm text-gray-600">
            <span>email@example.com</span>
            <span>•</span>
            <span>+1 (555) 123-4567</span>
            <span>•</span>
            <span>Location, Country</span>
          </div>
        </motion.div>

        {/* Skills section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
            <Award className="w-6 h-6" />
            CORE COMPETENCIES
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="bg-black text-white px-4 py-2 rounded-full text-sm uppercase tracking-wide"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Experience timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-black mb-8 flex items-center gap-3">
            <Briefcase className="w-6 h-6" />
            EXPERIENCE
          </h2>
          <div className="relative border-l-4 border-black pl-8 space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[42px] w-4 h-4 bg-black rounded-full border-4 border-gray-100" />

                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-black">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-black mb-8 flex items-center gap-3">
            <GraduationCap className="w-6 h-6" />
            EDUCATION
          </h2>
          <div className="relative border-l-4 border-black pl-8 space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[42px] w-4 h-4 bg-black rounded-full border-4 border-gray-100" />

                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-black">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-gray-700">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

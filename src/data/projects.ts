export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  longDescription: string;
  tags: string[];
  techStack?: string[];
  mainImage: string;
  inspirationImages: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  role: string;
  features: string[];
}

export const projects: Record<string, Project> = {
  'cloth-simulation': {
    id: 'cloth-simulation',
    title: 'Realtime Cloth Simulation',
    description: 'Real-time cloth physics simulation',
    shortDescription: 'Interactive Cloth Physics Engine',
    longDescription: 'An interactive real-time cloth physics simulation built with React and Three.js. Features include wind dynamics, gravity simulation, and interactive user controls for manipulating the cloth in 3D space.',
    tags: ['React', 'Three.js', 'WebGL', 'TypeScript'],
    techStack: ['React', 'Three.js', 'WebGL', 'TypeScript'],
    mainImage: 'https://media.giphy.com/media/PDQ6NsLKs4fzP6Wlsr/giphy.gif',
    inspirationImages: [
      'https://images.unsplash.com/photo-1601110958586-008f807b4957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBpbnNwaXJhdGlvbiUyMG1vb2R8ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJlZmVyZW5jZSUyMGFydHxlbnwxfHx8fDE3NjQ3MzM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619209629065-e9a2b225b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    liveUrl: 'https://example.com/cloth-sim',
    githubUrl: 'https://github.com/example/cloth-sim',
    year: '2024',
    role: 'Developer & Designer',
    features: [
      'Real-time physics calculations',
      'Interactive 3D controls',
      'Wind and gravity dynamics',
      'Customizable cloth properties',
    ],
  },
  'vfx-simulation': {
    id: 'vfx-simulation',
    title: 'VFX Simulation',
    description: 'Particle-based visual effects system',
    shortDescription: 'Particle-Based Effects Engine',
    longDescription: 'A powerful particle-based VFX simulation engine with customizable parameters for creating stunning visual effects. Includes fire, smoke, water, and custom particle systems.',
    tags: ['JavaScript', 'Canvas', 'WebGL', 'Shaders'],
    techStack: ['JavaScript', 'Canvas', 'WebGL', 'Shaders'],
    mainImage: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN29yNW1mdXoxeHRwOThqdHIzcnVxOWxwZTU5eGQyMnI2Y215czlqbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ai5ILWpr0FLtOIbNck/giphy.gif',
    inspirationImages: [
      'https://images.unsplash.com/photo-1601110958586-008f807b4957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBpbnNwaXJhdGlvbiUyMG1vb2R8ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJlZmVyZW5jZSUyMGFydHxlbnwxfHx8fDE3NjQ3MzM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619209629065-e9a2b225b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    liveUrl: 'https://example.com/vfx',
    githubUrl: 'https://github.com/example/vfx',
    year: '2024',
    role: 'Technical Artist',
    features: [
      'Custom particle systems',
      'Real-time shader effects',
      'Performance optimized',
      'Modular effect library',
    ],
  },
  'photoshop-portrait': {
    id: 'photoshop-portrait',
    title: 'Portrait (Photoshop)',
    description: 'Digital portrait illustration',
    shortDescription: 'Digital Portrait Art',
    longDescription: 'A detailed digital portrait created entirely in Adobe Photoshop, showcasing advanced digital painting techniques, color theory, and character design principles.',
    tags: ['Photoshop', 'Digital Art', 'Illustration', 'Character Design'],
    techStack: ['Photoshop', 'Digital Art', 'Illustration', 'Character Design'],
    mainImage: 'https://media.giphy.com/media/slyjIbhzkglAdw1XBS/giphy.gif',
    inspirationImages: [
      'https://images.unsplash.com/photo-1601110958586-008f807b4957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBpbnNwaXJhdGlvbiUyMG1vb2R8ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJlZmVyZW5jZSUyMGFydHxlbnwxfHx8fDE3NjQ3MzM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619209629065-e9a2b225b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    year: '2023',
    role: 'Digital Artist',
    features: [
      'Custom brush techniques',
      'Advanced color grading',
      'Detailed character features',
      'Professional workflow',
    ],
  },
  'character-customization': {
    id: 'character-customization',
    title: 'Character Customization',
    description: 'Interactive character creation system',
    shortDescription: 'Interactive Character Creator System',
    longDescription: 'A comprehensive character customization system allowing users to create unique characters with hundreds of customization options including body types, clothing, accessories, and more.',
    tags: ['React', 'Three.js', 'UI/UX', 'Game Development'],
    techStack: ['React', 'Three.js', 'UI/UX', 'Game Development'],
    mainImage: 'https://media.giphy.com/media/F5ZhmsD5TksSd7KN5z/giphy.gif',
    inspirationImages: [
      'https://images.unsplash.com/photo-1601110958586-008f807b4957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBpbnNwaXJhdGlvbiUyMG1vb2R8ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJlZmVyZW5jZSUyMGFydHxlbnwxfHx8fDE3NjQ3MzM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619209629065-e9a2b225b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    liveUrl: 'https://example.com/character',
    githubUrl: 'https://github.com/example/character',
    year: '2024',
    role: 'Game Developer',
    features: [
      '100+ customization options',
      'Real-time preview',
      'Save and share designs',
      'Mobile responsive',
    ],
  },
  'aseprite-game': {
    id: 'aseprite-game',
    title: '2D Aseprite Game',
    description: 'Pixel art platformer game',
    shortDescription: 'Pixel Art Platformer',
    longDescription: 'A charming 2D pixel art platformer created with Aseprite and built with modern game development tools. Features hand-crafted animations, challenging levels, and retro-inspired gameplay.',
    tags: ['Aseprite', 'Pixel Art', 'Game Design', 'Animation'],
    techStack: ['Aseprite', 'Pixel Art', 'Game Design', 'Animation'],
    mainImage: 'https://media.giphy.com/media/p6WFcuoGbFLxTr3IE4/giphy.gif',
    inspirationImages: [
      'https://images.unsplash.com/photo-1601110958586-008f807b4957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBpbnNwaXJhdGlvbiUyMG1vb2R8ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJlZmVyZW5jZSUyMGFydHxlbnwxfHx8fDE3NjQ3MzM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619209629065-e9a2b225b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    liveUrl: 'https://example.com/game',
    githubUrl: 'https://github.com/example/game',
    year: '2023',
    role: 'Game Designer & Artist',
    features: [
      'Hand-crafted pixel art',
      'Smooth animations',
      'Multiple game levels',
      'Retro sound design',
    ],
  },
  'zero-gravity-chair': {
    id: 'zero-gravity-chair',
    title: 'Zero Gravity Gaming Chair',
    description: 'Futuristic gaming chair concept',
    shortDescription: 'Zero-Gravity Gaming Chair Concept',
    longDescription: 'An innovative zero-gravity gaming chair concept designed for ultimate comfort during extended gaming sessions. Features include adjustable ergonomics, RGB lighting, and integrated audio system.',
    tags: ['Product Design', '3D Modeling', 'Industrial Design', 'Blender'],
    techStack: ['Product Design', '3D Modeling', 'Industrial Design', 'Blender'],
    mainImage: 'https://media.giphy.com/media/3yrUAHscGZohHZjCxd/giphy.gif',
    inspirationImages: [
      'https://images.unsplash.com/photo-1601110958586-008f807b4957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBpbnNwaXJhdGlvbiUyMG1vb2R8ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJlZmVyZW5jZSUyMGFydHxlbnwxfHx8fDE3NjQ3MzM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619209629065-e9a2b225b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    year: '2024',
    role: 'Product Designer',
    features: [
      'Zero-gravity positioning',
      'Ergonomic design',
      'Integrated audio system',
      'Customizable RGB lighting',
    ],
  },
};

// Map node IDs to project IDs
export const nodeToProjectMap: Record<string, string> = {
  'node-1': 'cloth-simulation',
  'node-2': 'vfx-simulation',
  'node-3': 'photoshop-portrait',
  'node-4': 'character-customization',
  'node-5': 'aseprite-game',
  'node-6': 'zero-gravity-chair',
};
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminorUser = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring', damping: 15 } },
    hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', transition: { duration: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Particle Generator
  const generateParticles = (count) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      duration: Math.random() * 10 + 5,
    }));

  const particles = generateParticles(10);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white font-poppins overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.5) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-indigo-300 bg-opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        className="z-10 text-center p-6 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-md tracking-tight"
          variants={textVariants}
        >
          Welcome
        </motion.h1>
        <motion.div
          className="w-20 h-1 bg-indigo-400 rounded-full mx-auto mb-10"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Admin Card */}
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => navigate('/admin-login')}
          >
            <motion.div
              className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.76 0-5 2.24-5 5h10c0-2.76-2.24-5-5-5z"
                />
              </svg>
            </motion.div>
            <motion.h2 className="text-2xl font-semibold text-white mb-3" variants={textVariants}>
              Admin
            </motion.h2>
            <motion.p className="text-gray-300 text-sm" variants={textVariants}>
              Manage outpass requests and system settings seamlessly.
            </motion.p>
          </motion.div>

          {/* Student Card */}
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => navigate('/Home')}
          >
            <motion.div
              className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"
                />
              </svg>
            </motion.div>
            <motion.h2 className="text-2xl font-semibold text-white mb-3" variants={textVariants}>
              Student
            </motion.h2>
            <motion.p className="text-gray-300 text-sm" variants={textVariants}>
              Submit and track your outpass requests with ease.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Text */}
      <motion.div
        className="absolute bottom-4 text-sm text-gray-400"
        animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        Choose your role to get started
      </motion.div>
    </div>
  );
};

export default AdminorUser;

// Inject CSS for Font
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
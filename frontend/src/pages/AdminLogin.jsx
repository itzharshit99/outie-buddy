import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styles

const AdminForm = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post(`${backendUrl}api/admin/admin-details`, formData);
      // Success Toast
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: '#4f46e5' }, // Indigo progress bar matching theme
        style: { background: '#eef2ff', color: '#1e3a8a', fontWeight: 'bold' }, // Custom styling
        onClose: () => navigate('/admin-dashboard'), // Redirect after toast closes
      });
    } catch (error) {
      // Error Toast instead of setError
      toast.error(error.response?.data?.error || 'An error occurred during login. Please try again.', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: '#ef4444' }, // Red progress bar
        style: { background: '#fef2f2', color: '#991b1b', fontWeight: 'bold' }, // Custom styling
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      {/* Add ToastContainer for rendering toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <motion.div
        className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Admin Login
          </h2>
          <p className="text-gray-600">Enter your credentials to access the admin panel</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible">
          {/* Email Field */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
            />
          </motion.div>

          {/* Password Field */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
            />
          </motion.div>

          {/* Error Message (Optional - kept for inline display if needed) */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-red-50 rounded-lg text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mr-2"
                >
                  ⟳
                </motion.span>
              ) : null}
              {isSubmitting ? 'Logging in...' : 'Login'}
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => navigate('/entry')}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            ← Back to Entry
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminForm;
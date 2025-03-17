import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styles

const HomeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    hostelNumber: '',
    roomNumber: '',
    goingDate: '',
    comingDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:4000/api/user/home-details', formData);
      // Success Toast
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: '#4f46e5' }, // Indigo progress bar
        style: { background: '#eef2ff', color: '#1e3a8a', fontWeight: 'bold' }, // Custom styling
      });
      setFormData({ name: '', hostelNumber: '', roomNumber: '', goingDate: '', comingDate: '' }); // Reset form
    } catch (error) {
      // Error Toast
      toast.error('Failed to submit: ' + (error.response?.data?.error || error.message), {
        position: "top-right",
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      {/* Add ToastContainer to render toasts */}
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
            Home Visit Request
          </h2>
          <p className="text-gray-600">Fill in the details for your home visit approval</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible">
          {/* Name Field */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
            />
          </motion.div>

          {/* Hostel Number Field */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="hostelNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Hostel Number
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="hostelNumber"
              name="hostelNumber"
              placeholder="Enter your hostel number"
              value={formData.hostelNumber}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
            />
          </motion.div>

          {/* Room Number Field */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="roomNumber"
              name="roomNumber"
              placeholder="Enter your room number"
              value={formData.roomNumber}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
            />
          </motion.div>

          {/* Date Fields */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Period</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Going Date Field */}
              <div className="relative">
                <div
                  className={`p-3 border ${
                    focusedInput === 'goingDate' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
                  } rounded-lg bg-white shadow-sm transition-all duration-200 cursor-pointer`}
                  onClick={() => document.getElementById('goingDate').showPicker()}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Departure Date</p>
                      <p className="font-medium">
                        {formData.goingDate ? formatDate(formData.goingDate) : 'Select date'}
                      </p>
                    </div>
                  </div>
                  <input
                    type="date"
                    id="goingDate"
                    name="goingDate"
                    value={formData.goingDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput('goingDate')}
                    onBlur={() => setFocusedInput(null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Coming Date Field */}
              <div className="relative">
                <div
                  className={`p-3 border ${
                    focusedInput === 'comingDate' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
                  } rounded-lg bg-white shadow-sm transition-all duration-200 cursor-pointer`}
                  onClick={() => document.getElementById('comingDate').showPicker()}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Return Date</p>
                      <p className="font-medium">
                        {formData.comingDate ? formatDate(formData.comingDate) : 'Select date'}
                      </p>
                    </div>
                  </div>
                  <input
                    type="date"
                    id="comingDate"
                    name="comingDate"
                    value={formData.comingDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput('comingDate')}
                    onBlur={() => setFocusedInput(null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date Validation */}
            {formData.goingDate && formData.comingDate && new Date(formData.comingDate) < new Date(formData.goingDate) && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-red-500 mt-2"
              >
                Return date must be after departure date
              </motion.p>
            )}

            {/* Length of Stay */}
            {formData.goingDate &&
              formData.comingDate &&
              new Date(formData.comingDate) >= new Date(formData.goingDate) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 text-center"
                >
                  <div className="px-4 py-2 bg-indigo-50 rounded-lg inline-block">
                    <p className="text-sm text-indigo-700">
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(formData.comingDate) - new Date(formData.goingDate)) / (1000 * 60 * 60 * 24)
                        )}
                      </span>{' '}
                      days stay
                    </p>
                  </div>
                </motion.div>
              )}
          </motion.div>

          {/* Submit Button */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={
                isSubmitting ||
                (formData.goingDate && formData.comingDate && new Date(formData.comingDate) < new Date(formData.goingDate))
              }
              className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden ${
                (formData.goingDate && formData.comingDate && new Date(formData.comingDate) < new Date(formData.goingDate))
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
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
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
            onClick={() => navigate('/home')}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            ← Back to Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeForm;
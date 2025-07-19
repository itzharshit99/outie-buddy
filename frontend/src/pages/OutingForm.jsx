import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styles

const OutingForm = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    hostelNumber: '',
    roomNumber: '',
    goingTime: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, goingTime: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${backendUrl}api/user/outing-details`, {
        ...formData,
        goingTime: formData.goingTime ? formData.goingTime.toISOString() : null, // Handle null case
      });
      // Success Toast
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: '#6b7280' }, // Purple progress bar matching theme
        style: { background: '#eef2ff', color: '#1e3a8a', fontWeight: 'bold' }, // Custom styling
      });
      setFormData({ name: '', hostelNumber: '', roomNumber: '', goingTime: null }); // Reset form
    } catch (error) {
      // Error Toast
      toast.error('Failed to submit: ' + (error.response?.data?.error || error.message), {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 flex items-center justify-center p-4">
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
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Outing Request
          </h2>
          <p className="text-gray-600">Fill in the details for your outing approval</p>
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
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required
            />
          </motion.div>

          {/* Going Time Field */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="goingTime" className="block text-sm font-medium text-gray-700 mb-1">
              Departure Time
            </label>
            <motion.div whileHover={{ scale: 1.01 }} className="relative">
              <DatePicker
                selected={formData.goingTime}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date and time"
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
                popperClassName="react-datepicker-popper"
                popperModifiers={{
                  offset: { enabled: true, offset: '5px, 10px' },
                  preventOverflow: { enabled: true, escapeWithReference: false, boundariesElement: 'viewport' },
                }}
                popperPlacement="bottom-start"
                customInput={
                  <motion.input
                    type="text"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                }
              />
            </motion.div>
            <p className="mt-1 text-xs text-gray-500">Please select the date and time of your departure</p>
          </motion.div>

          {/* Submit Button */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden"
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
            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            ← Back to Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OutingForm;
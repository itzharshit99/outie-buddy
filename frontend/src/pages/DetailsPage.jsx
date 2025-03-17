import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailsPage = () => {
  const [activeTab, setActiveTab] = useState("home"); // State to manage active tab
  const [homeData, setHomeData] = useState([]); // State for home details
  const [outingData, setOutingData] = useState([]); // State for outing details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [showAnalytics, setShowAnalytics] = useState(false); // Toggle for analytics view
  const navigate = useNavigate();

  // Fetch home and outing details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch home details
        const homeResponse = await axios.get("http://localhost:4000/api/user/get-home-details");
        setHomeData(homeResponse.data);

        // Fetch outing details
        const outingResponse = await axios.get("http://localhost:4000/api/user/get-outing-details");
        setOutingData(outingResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle marking as entered
  const handleMarkEntered = async (id, type) => {
    try {
      const endpoint =
        type === "home"
          ? `http://localhost:4000/api/user/mark-home-entered/${id}`
          : `http://localhost:4000/api/user/mark-outing-entered/${id}`;

      await axios.put(endpoint, { isEntered: true });

      // Update local state
      if (type === "home") {
        setHomeData((prevData) =>
          prevData.map((student) =>
            student._id === id ? { ...student, isEntered: true } : student
          )
        );
      } else {
        setOutingData((prevData) =>
          prevData.map((outing) =>
            outing._id === id ? { ...outing, isEntered: true } : outing
          )
        );
      }
    } catch (error) {
      console.error("Error marking as entered:", error);
    }
  };

  // Analytics data preparation
  const prepareAnalyticsData = () => {
    // For home analytics
    const homeEntered = homeData.filter(student => student.isEntered).length;
    const homeNotEntered = homeData.length - homeEntered;
    
    const pieHomeData = {
      labels: ['Entered', 'Not Entered'],
      datasets: [
        {
          data: [homeEntered, homeNotEntered],
          backgroundColor: ['rgba(72, 187, 120, 0.7)', 'rgba(245, 101, 101, 0.7)'],
          borderColor: ['rgb(72, 187, 120)', 'rgb(245, 101, 101)'],
          borderWidth: 1,
        },
      ],
    };
    
    // For outing analytics
    const outingEntered = outingData.filter(outing => outing.isEntered).length;
    const outingNotEntered = outingData.length - outingEntered;
    
    const pieOutingData = {
      labels: ['Entered', 'Not Entered'],
      datasets: [
        {
          data: [outingEntered, outingNotEntered],
          backgroundColor: ['rgba(72, 187, 120, 0.7)', 'rgba(245, 101, 101, 0.7)'],
          borderColor: ['rgb(72, 187, 120)', 'rgb(245, 101, 101)'],
          borderWidth: 1,
        },
      ],
    };

    // Group home data by date
    const homeByDate = {};
    homeData.forEach(item => {
      const date = new Date(item.goingDate).toLocaleDateString();
      if (!homeByDate[date]) {
        homeByDate[date] = 0;
      }
      homeByDate[date]++;
    });

    const barData = {
      labels: Object.keys(homeByDate),
      datasets: [
        {
          label: 'Home Visits by Date',
          data: Object.values(homeByDate),
          backgroundColor: 'rgba(129, 140, 248, 0.7)',
          borderColor: 'rgb(129, 140, 248)',
          borderWidth: 1,
        },
      ],
    };

    const barOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Home Visits by Date',
        },
      },
    };

    return { pieHomeData, pieOutingData, barData, barOptions };
  };

  const { pieHomeData, pieOutingData, barData, barOptions } = prepareAnalyticsData();

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse delay-75"></div>
          <div className="w-4 h-4 bg-pink-600 rounded-full animate-pulse delay-150"></div>
          <span className="text-lg font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-6">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-center lg:text-left">
          Student Details
        </h1>
        
        <div className="flex gap-4 mt-4 lg:mt-0">
        <button
            onClick={() => navigate("/add-student")} // Navigate to add-student page
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all shadow-md"
          >
            Add Student
          </button>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              showAnalytics 
                ? "bg-purple-500 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
            }`}
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </button>
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("home")}
            >
              Home Details
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === "outing"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("outing")}
            >
              Outing Details
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="mb-6 bg-white bg-opacity-95 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Analytics Dashboard</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg shadow-md border border-indigo-200">
              <h3 className="text-lg font-medium text-indigo-700 mb-2">Total Students</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-indigo-800">{homeData.length + outingData.length}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-md border border-green-200">
              <h3 className="text-lg font-medium text-green-700 mb-2">Home Visits</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-green-800">{homeData.length}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-md border border-purple-200">
              <h3 className="text-lg font-medium text-purple-700 mb-2">Outings</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-purple-800">{outingData.length}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            
            {/* Charts */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 col-span-1 lg:col-span-2">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Home Visits by Date</h3>
              <div className="h-64">
                <Bar options={barOptions} data={barData} />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                {activeTab === "home" ? "Home Status" : "Outing Status"}
              </h3>
              <div className="h-48 flex justify-center">
                <Pie data={activeTab === "home" ? pieHomeData : pieOutingData} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-xl border border-gray-100">
        {activeTab === "home" ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Home Details</h2>
            {homeData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel No.</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No.</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Date</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {homeData.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className={`inline-flex h-3 w-3 rounded-full ${
                            student.isEntered ? "bg-green-500" : "bg-red-500"
                          }`}></span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">{student.name}</td>
                        <td className="py-3 px-4 text-gray-600">{student.hostelNumber}</td>
                        <td className="py-3 px-4 text-gray-600">{student.roomNumber}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(student.goingDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(student.comingDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          {!student.isEntered && (
                            <button
                              onClick={() => handleMarkEntered(student._id, "home")}
                              className="bg-indigo-500 text-white py-1 px-3 rounded-md text-sm hover:bg-indigo-600 transition-all"
                            >
                              Mark Entered
                            </button>
                          )}
                          {student.isEntered && (
                            <span className="text-sm text-green-600 font-medium">Entered</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-700 text-center py-4">No home details found.</p>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Outing Details</h2>
            {outingData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel No.</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No.</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Going Time</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {outingData.map((outing) => (
                      <tr key={outing._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className={`inline-flex h-3 w-3 rounded-full ${
                            outing.isEntered ? "bg-green-500" : "bg-red-500"
                          }`}></span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">{outing.name}</td>
                        <td className="py-3 px-4 text-gray-600">{outing.hostelNumber}</td>
                        <td className="py-3 px-4 text-gray-600">{outing.roomNumber}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(outing.goingTime).toLocaleString()}</td>
                        <td className="py-3 px-4">
                          {!outing.isEntered && (
                            <button
                              onClick={() => handleMarkEntered(outing._id, "outing")}
                              className="bg-indigo-500 text-white py-1 px-3 rounded-md text-sm hover:bg-indigo-600 transition-all"
                            >
                              Mark Entered
                            </button>
                          )}
                          {outing.isEntered && (
                            <span className="text-sm text-green-600 font-medium">Entered</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-700 text-center py-4">No outing details found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
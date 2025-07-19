import React, { useEffect, useState } from "react";
import axios from "axios";

const MarkEntry = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [activeTab, setActiveTab] = useState("home");
  const [homeData, setHomeData] = useState([]);
  const [outingData, setOutingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeResponse = await axios.get(`${backendUrl}api/user/get-home-details`);
        setHomeData(homeResponse.data);

        const outingResponse = await axios.get(`${backendUrl}api/user/get-outing-details`);
        setOutingData(outingResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkEntered = async (id, type) => {
    try {
      const endpoint = type === "home" 
        ? `${backendUrl}api/user/mark-home-entered/${id}` 
        : `${backendUrl}api/user/mark-outing-entered/${id}`;

      await axios.put(endpoint, { isEntered: true });

      // Update the local state to reflect the change
      if (type === "home") {
        setHomeData(prevData => 
          prevData.map(student => 
            student._id === id ? { ...student, isEntered: true } : student
          )
        );
      } else {
        setOutingData(prevData => 
          prevData.map(outing => 
            outing._id === id ? { ...outing, isEntered: true } : outing
          )
        );
      }
    } catch (error) {
      console.error("Error marking as entered:", error);
    }
  };

  const filteredHomeData = homeData.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.hostelNumber.toString().includes(searchTerm) ||
    student.roomNumber.toString().includes(searchTerm)
  );

  const filteredOutingData = outingData.filter(outing => 
    outing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    outing.hostelNumber.toString().includes(searchTerm) ||
    outing.roomNumber.toString().includes(searchTerm)
  );

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-center">
          Student Details
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("home")}
            >
              Home Details
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
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

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by name, hostel or room number..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-100">
          {activeTab === "home" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Home Details</h2>
              {filteredHomeData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mark Entered</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredHomeData.map((student) => (
                        <tr
                          key={student._id}
                          className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                          onClick={() => handleMarkEntered(student._id, "home")}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.hostelNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.roomNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(student.goingDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(student.comingDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {student.isEntered ? (
                              <span className="text-green-500">✓</span>
                            ) : (
                              <span className="text-indigo-600">Mark Entered</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No home details found {searchTerm && "matching your search"}.</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Outing Details</h2>
              {filteredOutingData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Going Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mark Entered</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOutingData.map((outing) => (
                        <tr
                          key={outing._id}
                          className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                          onClick={() => handleMarkEntered(outing._id, "outing")}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{outing.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{outing.hostelNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{outing.roomNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(outing.goingTime).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {outing.isEntered ? (
                              <span className="text-green-500">✓</span>
                            ) : (
                              <span className="text-indigo-600">Mark Entered</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No outing details found {searchTerm && "matching your search"}.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Home Statistics</h3>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Records</p>
                <p className="text-2xl font-bold text-indigo-600">{homeData.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Filtered Results</p>
                <p className="text-2xl font-bold text-purple-600">{filteredHomeData.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Outing Statistics</h3>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Records</p>
                <p className="text-2xl font-bold text-indigo-600">{outingData.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Filtered Results</p>
                <p className="text-2xl font-bold text-purple-600">{filteredOutingData.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkEntry;
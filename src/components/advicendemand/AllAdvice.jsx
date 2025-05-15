import React, { useState, useEffect } from 'react'
import { getAllDemands } from '../../api/allApi/demand';

const AllAdvice = () => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllDemands();
        if (response.status === 200) {
          // Check if response.data is an array, if not, check for a data property
          const adviceData = Array.isArray(response.data) 
            ? response.data 
            : (response.data?.data || []);
          
          setAdvice(adviceData);
        } else {
          setError("Failed to fetch advice");
        }
      } catch (error) {
        console.error("Error fetching advice:", error);
        setError("An error occurred while fetching advice");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        All Advice and Demands
      </h2>
      {advice.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No advice or demands found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advice.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {item.topicOfFeedback}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {item.descriptionOfFeedback}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Name: {item.firstName} {item.lastName}</p>
                <p>Branch: {item.branch}</p>
                <p>Email: {item.email}</p>
                <p>Contact: {item.contactNumber}</p>
                <p>Enrollment: {item.enrollmentNumber}</p>
                {item.semester && <p>Semester: {item.semester}</p>}
                {item.passoutYear && <p>Passout Year: {item.passoutYear}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllAdvice 
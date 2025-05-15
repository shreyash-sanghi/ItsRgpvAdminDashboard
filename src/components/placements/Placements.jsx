import React, { useState, useEffect } from "react";
import { getAllPlacements } from "../../api/api";

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllPlacements();
        console.log("API Response:", response); // Debug log
        
        if (response.status === 200) {
          // Access the data property of the response
          const data = response.data?.data || [];
          console.log("Processed Data:", data); // Debug log
          setPlacements(data);
        } else {
          setError("Failed to fetch placements");
          console.error("Error fetching placements:", response);
        }
      } catch (err) {
        setError("An error occurred while fetching placements");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Debug log for current state
  console.log("Current Placements State:", placements);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  // Ensure placements is an array before mapping
  const displayPlacements = Array.isArray(placements) ? placements : [];
  
  if (displayPlacements.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">No placements found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayPlacements.map((placement) => (
        <div
          key={placement._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          {placement.profilePicture && (
            <img
              src={placement.profilePicture}
              alt={`${placement.studentFirstName} ${placement.studentLastName}`}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {placement.studentFirstName} {placement.studentLastName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {placement.company}
            </p>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enrollment: {placement.enrollmentNumber}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Passout Year: {placement.passoutYear}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Semester: {placement.semester}
              </p>
            </div>
            {placement.skills && placement.skills.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Skills:
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {placement.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Placements; 
import React, { useState, useEffect } from "react";
import { getAllFests } from "../../api/api";

const Fests = () => {
  const [fests, setFests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllFests();
      if (response.status === 200) {
        // Ensure we're setting an array
        const data = Array.isArray(response.data) ? response.data : [];
        setFests(data);
      } else {
        setError("Failed to fetch fests data");
        setFests([]); // Reset to empty array on error
      }
    } catch (err) {
      setError("An error occurred while fetching fests");
      console.error("Error fetching fests:", err);
      setFests([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!Array.isArray(fests) || fests.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No fests found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fests.map((fest) => (
          <div
            key={fest._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {fest.bannerPicture && (
              <img
                src={fest.bannerPicture}
                alt={fest.festName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {fest.festName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {fest.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Organized by: {fest.organisedBy}</p>
                <p>Date: {new Date(fest.dateOfEvent).toLocaleDateString()}</p>
                <p>Theme: {fest.theme}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fests; 
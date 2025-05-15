import React, { useState, useEffect } from "react";
import { getAllPyqs } from "../../api/allApi/pyq";

const Pyqs = () => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllPyq();
        console.log("API Response:", response);
        
        if (response.status === 200) {
          const data = response.data?.data || [];
          console.log("Processed Data:", data);
          setPyqs(data);
        } else {
          setError("Failed to fetch PYQs");
          console.error("Error fetching PYQs:", response);
        }
      } catch (err) {
        setError("An error occurred while fetching PYQs");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const displayPyqs = Array.isArray(pyqs) ? pyqs : [];
  
  if (displayPyqs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">No PYQs found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayPyqs.map((pyq) => (
        <div
          key={pyq._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {pyq.subjectName}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Semester: {pyq.semester}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Department: {pyq.department}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Paper Type: {pyq.paperType}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Year: {pyq.paperForYear}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                College: {pyq.college}
              </p>
            </div>
            {pyq.questionPaperImg && pyq.questionPaperImg.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {pyq.questionPaperImg.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Question Paper ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pyqs; 
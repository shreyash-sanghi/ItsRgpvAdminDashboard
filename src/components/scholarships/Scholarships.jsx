import React, { useState, useEffect } from "react";
import { getAllScholarships } from "../../api/allApi/scholarship";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try{
      const response = await getAllScholarships();
      console.log(response.data.data);
      setScholarships(response.data.data || []);
    }catch(error){
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
//       </div>
//     );
//   }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (scholarships.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">No scholarships found</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Scholarships</h1>
    </div>  
  );
};

export default Scholarships; 
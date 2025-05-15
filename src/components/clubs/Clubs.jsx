import React, { useState, useEffect } from 'react'
import { getAllClubs } from '../../api/allApi/club';

const Clubs = () => {

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const response = await getAllClubs();
      setClubs(response.data?.data);
      console.log(response.data?.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
        Clubs
      </h2>
      {clubs.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No clubs found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {club.clubName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {club.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Founder: {club.founderName}</p>
                <p>Type: {club.typeOfClub}</p>
                <p>Established: {new Date(club.dateOfEstablishment).toLocaleDateString()}</p>
                <p>Email: {club.contactEmail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Clubs 
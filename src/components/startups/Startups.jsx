import React, { useState, useEffect } from "react";
import { getAllStartups } from "../../api/api";

const Startups = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStartups();
        if (response.status === 200) {
          // Ensure we're setting an array, even if the response data is null or undefined
          setStartups(Array.isArray(response.data) ? response.data : []);
        } else {
          setError("Failed to fetch startups");
          setStartups([]); // Set empty array on error
        }
      } catch (err) {
        setError("Error fetching startups: " + err.message);
        setStartups([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading startups...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!startups || startups.length === 0) {
    return <div className="text-center py-8">No startups found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {startups.map((startup) => (
        <div
          key={startup._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {startup.startupLogo && (
            <img
              src={startup.startupLogo}
              alt={startup.startupName}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{startup.startupName}</h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Founder:</span> {startup.founderName}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Founded:</span> {startup.foundedYear}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Industry:</span> {startup.industry}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Location:</span> {startup.location}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Funding:</span> {startup.funding}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Employees:</span> {startup.employees}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Website:</span>{" "}
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {startup.website}
              </a>
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Description:</span>{" "}
              {startup.description}
            </p>
            {startup.achievements && Array.isArray(startup.achievements) && (
              <div className="mt-2">
                <h4 className="font-medium mb-1">Achievements:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {startup.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Startups; 
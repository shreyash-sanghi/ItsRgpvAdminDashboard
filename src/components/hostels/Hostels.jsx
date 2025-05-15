import React, { useState, useEffect } from "react";
import { getAllHostelInfo } from "../../api/api";

const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllHostelInfo();
      if (response.status === 200) {
        const data = Array.isArray(response.data) ? response.data : [];
        setHostels(data);
      } else {
        setError("Failed to fetch hostels data");
        setHostels([]);
      }
    } catch (err) {
      setError("An error occurred while fetching hostels");
      console.error("Error fetching hostels:", err);
      setHostels([]);
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

  if (!Array.isArray(hostels) || hostels.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No hostels found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels.map((hostel) => (
          <div
            key={hostel._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {hostel.hostelPictures && hostel.hostelPictures.length > 0 && (
              <img
                src={hostel.hostelPictures[0]}
                alt={hostel.hostelName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {hostel.hostelName}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>Warden: {hostel.hostelWardenName}</p>
                <p>Total Students: {hostel.totalStudentsInHostel}</p>
                <p>Rooms: {hostel.roomsInHostel}</p>
                <p>Fees per Semester: ₹{hostel.hostelFeesPerSemester}</p>
                <p>Mess Charges: ₹{hostel.hostelMessCharges}/month</p>
                {hostel.hostelRating && (
                  <p>Hostel Rating: {hostel.hostelRating}/5</p>
                )}
                {hostel.messRating && <p>Mess Rating: {hostel.messRating}/5</p>}
              </div>
              {hostel.hostelFacilities && hostel.hostelFacilities.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Facilities:
                  </h4>
                  <ul className="text-sm text-gray-500 dark:text-gray-400">
                    {hostel.hostelFacilities.map((facility, index) => (
                      <li key={index}>• {facility}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hostels; 
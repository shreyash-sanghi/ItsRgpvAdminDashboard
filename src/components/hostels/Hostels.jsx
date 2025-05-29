import React, { useState, useEffect } from "react";
import { getAllHostels, deleteHostel } from "../../api/allApi/hostel";
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import AddHostel from "./AddHostel";
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';



const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  const fetchData = async (currentPage) => {
    setLoading(true);
    try {
      setError(null);
      const response = await getAllHostels(currentPage);
      const newHostel = response?.data?.data || [];

      if (newHostel.length < 9) setHasMore(false);

      if (currentPage === 1) {
        setHostels(newHostel);
      } else {
        setHostels((prev) => [...prev, ...newHostel]);
      }

      setPage(currentPage);  // Update state
    } catch (err) {
      setError("An error occurred while fetching hostels");
      console.error("Error fetching hostels:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(1);
  }, [isEditing]);
  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle Popup close and clear selected data
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedHostel(null);
  };


  const handleDelete = async (id) => {
    console.log(id);
    const result = await DeleteConfirm('Delete Hostel', 'Are you sure you want to delete this?');

    if (result) {
      try {
        await deleteHostel(id);
        showSuccessToast("Deleted successfully")
        setHostels(hostels.filter((info) => info._id != id));
      } catch (error) {
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Cancelled!');
    }
  };


  if (isEditing) {
    return (
      <AddHostel
        setIsEditing={setIsEditing}
        editHostel={isEditing}
        HostelData={selectedHostel}
      />
    );
  }
  if (loading) {
    return (
      <ScreenLoader />
    )
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
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
              <button
                className="hover:text-red-600"
                onClick={() => {
                  handleDelete(hostel._id)
                }}
              >
                <MdDelete size={20} className='text-red-500' />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedHostel(hostel);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} className='text-blue-600' />
              </button>
              <button
                className="hover:text-green-600"
                onClick={() => {
                  setSelectedHostel(hostel);
                  setIsEditing(true);
                }}
              >
                <FaEdit size={18} className='text-green-600' />
              </button>

              {/* rest of content */}
            </div>


            {hostel.hostelPictures && hostel.hostelPictures.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto p-2">
                {hostel.hostelPictures.map((pic, idx) => (
                  <img
                    key={idx}
                    src={pic}
                    alt={`${hostel.hostelName} image ${idx + 1}`}
                    className="w-32 h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {hostel.hostelName}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>Warden: {hostel.hostelWardenName}</p>
                <p>Warden: {hostel.hostelWardenContactNumber.join(", ")}</p>
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
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchData(page + 1)}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      <Popup title="View Hostel" isOpen={showPopup} onClose={handleClosePopup}>
      {selectedHostel && (
  <div className="space-y-2 text-sm max-h-[70vh] overflow-y-auto">
    {selectedHostel.hostelPictures?.length > 0 && (
      <div className="relative flex items-center justify-center mb-4">
        <img
          src={selectedHostel.hostelPictures[currentImageIndex]}
          alt={`Hostel ${currentImageIndex + 1}`}
          className="w-full max-h-[300px] object-cover rounded"
        />

        {/* Left arrow */}
        {currentImageIndex > 0 && (
          <button
            onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            ←
          </button>
        )}

        {/* Right arrow */}
        {currentImageIndex < selectedHostel.hostelPictures.length - 1 && (
          <button
            onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            →
          </button>
        )}
      </div>
    )}

    {/* Other hostel details */}
    <p><strong>Name:</strong> {selectedHostel.hostelName}</p>
    <p><strong>Warden:</strong> {selectedHostel.hostelWardenName}</p>
    <p>Warden: {selectedHostel.hostelWardenContactNumber.join(", ")}</p>
    <p><strong>Total Students:</strong> {selectedHostel.totalStudentsInHostel}</p>
    <p><strong>Rooms:</strong> {selectedHostel.roomsInHostel}</p>
    <p><strong>Fees per Semester:</strong> ₹{selectedHostel.hostelFeesPerSemester}</p>
    <p><strong>Mess Charges:</strong> ₹{selectedHostel.hostelMessCharges}/month</p>
    <p><strong>Rating:</strong> {selectedHostel.hostelRating || 'N/A'}</p>
    <p><strong>Mess Rating:</strong> {selectedHostel.messRating || 'N/A'}</p>
    <div>
      <strong>Facilities:</strong>
      <ul className="list-disc list-inside">
        {selectedHostel.hostelFacilities?.map((facility, idx) => (
          <li key={idx}>{facility}</li>
        ))}
      </ul>
    </div>
  </div>
)}
      </Popup>
    </div>
  );
};

export default Hostels; 
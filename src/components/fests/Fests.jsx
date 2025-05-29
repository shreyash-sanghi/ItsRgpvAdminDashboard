import React, { useState, useEffect } from "react";
import { getAllFests, deleteFest } from "../../api/allApi/fests";
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import AddFest from "./AddFest";
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';

const Fests = () => {
  const [fests, setFests] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFest, setSelectedFest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchData = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await getAllFests();
      const newFest = response?.data?.data || [];

      if (newFest.length < 9) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setFests(newFest);
      } else {
        setFests((prev) => [...prev, ...newFest]);
      }
      setPage(currentPage);
    } catch (error) {
      console.error(error);
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

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedFest(null);
    setCurrentImageIndex(0);
  };

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Fest', 'Are you sure you want to delete this?');
    if (result) {
      try {
        await deleteFest(id);
        showSuccessToast("Deleted successfully");
        setFests(fests.filter((fest) => fest._id !== id));
      } catch (error) {
        showErrorToast(error?.response?.data?.message || "Failed to delete");
      }
    }
  };

  if (isEditing) {
    return (
      <AddFest
        setIsEditing={setIsEditing}
        editFest={true}
        FestData={selectedFest}
      />
    );
  }

  if (loading && fests.length === 0) {
    return <ScreenLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fests.map((fest) => (
          <div
            key={fest._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
          >
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500 z-10">
              <button onClick={() => handleDelete(fest._id)}>
                <MdDelete size={20} className="text-red-500" />
              </button>
              <button onClick={() => {
                setSelectedFest(fest);
                setShowPopup(true);
              }}>
                <FaEye size={18} />
              </button>
              <button onClick={() => {
                setSelectedFest(fest);
                setIsEditing(true);
              }}>
                <FaEdit size={18} />
              </button>
            </div>

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

      <Popup title="View Fest" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedFest && (
          <div className="space-y-2 text-sm max-h-[70vh] overflow-y-auto">
            {selectedFest.festImages?.length > 0 && (
              <div className="relative flex items-center justify-center mb-4">
                <img
                  src={selectedFest.festImages[currentImageIndex]}
                  alt={`Fest ${currentImageIndex + 1}`}
                  className="w-full max-h-[300px] object-cover rounded"
                />
                {currentImageIndex > 0 && (
                  <button
                    onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
                  >
                    ←
                  </button>
                )}
                {currentImageIndex < selectedFest.festImages.length - 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
                  >
                    →
                  </button>
                )}
              </div>
            )}
            <p><strong>Name:</strong> {selectedFest.festName}</p>
            <p><strong>Organised By:</strong> {selectedFest.organisedBy}</p>
            <p><strong>Sponsor:</strong> {selectedFest.sponsor}</p>
            <p><strong>Description:</strong> {selectedFest.description}</p>
            <p><strong>Date:</strong> {new Date(selectedFest.dateOfEvent).toLocaleDateString()}</p>
            <p><strong>Theme:</strong> {selectedFest.theme}</p>
            <p><strong>Chief Guest:</strong> {selectedFest.chiefGuest}</p>
            <p><strong>Video:</strong> {selectedFest.festVideo}</p>
            <p><strong>Department:</strong> {selectedFest.department}</p>
            <p><strong>Semester:</strong> {selectedFest.semester}</p>
            <p><strong>Enrollment No:</strong> {selectedFest.enrollmentNumber}</p>
            <div className="flex gap-2 flex-wrap">
              {selectedFest.listOfActivities?.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline text-sm truncate max-w-[140px]"
                >
                  Activity {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Fests;



import React, { useState, useEffect } from "react";
import { getAllPlacements, deletePlacement } from "../../api/allApi/placement";
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import AddPlacement from "./AddPlacement";
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (currentPage = 1) => {
    setLoading(true);
    try {
      const response = await getAllPlacements(currentPage);
      const newPlacement = response?.data?.data || [];

      if (newPlacement.length < 9) setHasMore(false);

      if (currentPage === 1) {
        setPlacements(newPlacement);
      } else {
        setPlacements((prev) => [...prev, ...newPlacement]);
      }

      setPage(currentPage);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to fetch placements");
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

  const truncateDescription = (desc, id) => {
    if (!desc) return 'No description provided.';
    const words = desc.split(' ');
    if (words.length <= 20 || expandedDescriptions[id]) return desc;
    return words.slice(0, 20).join(' ') + '...';
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPlacement(null);
  };

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Placement', 'Are you sure you want to delete this?');
    if (result) {
      try {
        await deletePlacement(id);
        showSuccessToast("Deleted successfully");
        setPlacements((prev) => prev.filter((info) => info._id !== id));
      } catch (error) {
        showErrorToast("Error deleting placement");
      }
    }
  };

  if (isEditing) {
    return (
      <AddPlacement
        setIsEditing={setIsEditing}
        editPlacement={isEditing}
        AllPlacementData={selectedPlacement}
      />
    );
  }

  if (loading && page === 1) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {placements.map((placement, index) => {
  // Parse skills string or array safely
  let skillsString = '';
  if (placement.skills) {
    try {
      const skillsArr = JSON.parse(placement.skills);
      if (Array.isArray(skillsArr)) {
        skillsString = skillsArr.join(', ');
      } else {
        skillsString = placement.skills;
      }
    } catch {
      skillsString = placement.skills;
    }
  }

          return (
            <div
              key={placement._id || index}
              className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              {/* Action Icons */}
              <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
                <button
                  className="hover:text-red-600"
                  onClick={() => handleDelete(placement._id)}
                >
                  <MdDelete size={20} />
                </button>
                <button
                  className="hover:text-blue-600"
                  onClick={() => {
                    setSelectedPlacement(placement);
                    setShowPopup(true);
                  }}
                >
                  <FaEye size={18} />
                </button>
                <button
                  className="hover:text-blue-600"
                  onClick={() => {
                    setSelectedPlacement(placement);
                    setIsEditing(true);
                  }}
                >
                  <FaEdit size={18} />
                </button>
              </div>

              {placement.profilePicture && (
                <img
                  src={placement.profilePicture}
                  alt={`${placement.studentFirstName} ${placement.studentLastName}`}
                  className="w-32 mt-3 h-32 object-cover rounded-full mx-auto"
                />
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {placement.studentFirstName} {placement.studentLastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{placement.company}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                  <p>Enrollment: {placement.enrollmentNumber}</p>
                  <p>Passout Year: {placement.passoutYear}</p>
                  <p>Semester: {placement.semester}</p>
                </div>
                {skillsString && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills:</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{skillsString}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
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

      <Popup title="View Placement" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedPlacement && (
          <div className="space-y-2 text-sm">
            {selectedPlacement.profilePicture && (
              <img
                src={selectedPlacement.profilePicture}
                alt={`${selectedPlacement.studentFirstName} ${selectedPlacement.studentLastName}`}
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            )}
            <p><strong>Name:</strong> {selectedPlacement.studentFirstName} {selectedPlacement.studentLastName}</p>
            <p><strong>Email:</strong> {selectedPlacement.email}</p>
            <p><strong>Contact Number:</strong> {selectedPlacement.contactNumber}</p>
            <p><strong>Enrollment Number:</strong> {selectedPlacement.enrollmentNumber}</p>
            <p><strong>Company:</strong> {selectedPlacement.company}</p>
            <p><strong>Passout Year:</strong> {selectedPlacement.passoutYear}</p>
            <p><strong>Semester:</strong> {selectedPlacement.semester}</p>
            <p><strong>Salary Package:</strong> {selectedPlacement.salaryPackage}</p>

            {selectedPlacement.skills && (
              <div>
                <strong>Skills: </strong>
                {(() => {
                  try {
                    const skillsArr = JSON.parse(selectedPlacement.skills);
                    if (Array.isArray(skillsArr)) {
                      return skillsArr.join(", ");
                    }
                    return selectedPlacement.skills;
                  } catch {
                    return selectedPlacement.skills;
                  }
                })()}
              </div>
            )}
          </div>
        )}
      </Popup>
    </>
  );
};

export default Placements;
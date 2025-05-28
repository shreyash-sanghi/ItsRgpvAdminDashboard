import React, { useEffect, useState } from "react";
import { getAllClubs, deleteClub } from "../../api/allApi/club";
import { showErrorToast , showSuccessToast } from "../ui/toast";
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import Popup from '../ui/popup';
import { FaEdit, FaEye } from 'react-icons/fa';
import AddClub from './AddClub';  


const Club = () => {
  const [clubs, setClubs] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchClubs = async (currentPage = 1) => {
    setLoading(true);
    try {
      const response = await getAllClubs(currentPage);
      const newClubs = response?.data?.data || [];

      if (newClubs.length < 9) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setClubs(newClubs);
      } else {
        setClubs((prev) => [...prev, ...newClubs]);
      }
      setPage(currentPage);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      showErrorToast("Something went wrong while fetching clubs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs(1);
  }, [isEditing]);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateDescription = (desc, id) => {
    if (!desc) return "No description provided.";
    const words = desc.split(" ");
    if (words.length <= 20 || expandedDescriptions[id]) return desc;
    return words.slice(0, 20).join(" ") + "...";
  };

  const handleDelete = async (id) => {
    const result = await DeleteConfirm("Delete Club", "Are you sure you want to delete this?");
    if (result) {
      try {
        await deleteClub(id);
        showSuccessToast("Successfully Deleted");
        setClubs(clubs.filter((club) => club._id !== id));
      } catch (error) {
        showErrorToast("Error in deleting", error.message);
      }
    } else {
      console.log("Cancelled!");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedClub(null);
  };

  if (isEditing) {
    return (
      <AddClub
        setIsEditing={setIsEditing}
        editClub={isEditing}
        clubData={selectedClub}
      />
    );
  }

  if (loading && clubs.length === 0) {
    return <ScreenLoader />;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 relative"
          >
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
              <button
                className="hover:text-red-600"
                onClick={() => handleDelete(club._id)}
              >
                <MdDelete size={20} />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedClub(club);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} />
              </button>
              <button
                className="hover:text-green-600"
                onClick={() => {
                  setSelectedClub(club);
                  setIsEditing(true);
                }}
              >
                <FaEdit size={18} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {club.clubName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Founder:</strong> {club.founderName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Description:</strong> {truncateDescription(club.description, club._id)}{" "}
              {club.description && club.description.split(" ").length > 20 && (
                <button
                  onClick={() => toggleDescription(club._id)}
                  className="text-blue-500 text-xs ml-1"
                >
                  {expandedDescriptions[club._id] ? "View Less" : "View More"}
                </button>
              )}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Type:</strong> {club.typeOfClub}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Established:</strong>{" "}
              {new Date(club.dateOfEstablishment).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {club.contactEmail}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Phone:</strong> {club.contactPhone?.join(", ")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Social Links:</strong>{" "}
              {club.socialLinks?.map((link, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mr-2"
                >
                  Link {idx + 1}
                </a>
              ))}
            </p>

            {club.logoImg && (
              <div className="mt-4">
                <strong className="text-gray-800 dark:text-gray-200">Logo:</strong>
                <img
                  src={club.logoImg}
                  alt="Logo"
                  className="w-full h-32 object-contain mt-2"
                />
              </div>
            )}

            {club.coverImg && (
              <div className="mt-4">
                <strong className="text-gray-800 dark:text-gray-200">Cover:</strong>
                <img
                  src={club.coverImg}
                  alt="Cover"
                  className="w-full h-40 object-cover mt-2 rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchClubs(page + 1)}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {!loading ? "Load More" : "Loading..."}
          </button>
        </div>
      )}

      <Popup title="View Club" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedClub && (
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {selectedClub.clubName}</p>
            <p><strong>Founder:</strong> {selectedClub.founderName}</p>
            <p><strong>Description:</strong> {selectedClub.description}</p>
            <p><strong>Type:</strong> {selectedClub.typeOfClub}</p>
            <p><strong>Established:</strong> {new Date(selectedClub.dateOfEstablishment).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {selectedClub.contactEmail}</p>
            <p><strong>Phone:</strong> {selectedClub.contactPhone?.join(", ")}</p>
            <p><strong>Social Links:</strong> 
              <div className="flex gap-2 flex-wrap">
                {selectedClub.socialLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm truncate max-w-[140px]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </p>

            {selectedClub.logoImg && (
              <div>
                <strong>Logo:</strong>
                <img src={selectedClub.logoImg} alt="Logo" className="w-full h-32 object-contain mt-2" />
              </div>
            )}

{selectedClub.coverImg && (
              <div>
                <strong>Cover:</strong>
                <img src={selectedClub.coverImg} alt="Cover" className="w-full h-40 object-cover mt-2 rounded-lg" />
              </div>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Club;
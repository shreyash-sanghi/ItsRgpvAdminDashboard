import React, { useState, useEffect } from "react";
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Popup from '../ui/popup';
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';
import { deleteStartup, getAllStartup } from "../../api/allApi/startup";
import AddStartup from "./AddStartup";

const Startup = () => {
  const [startups, setStartups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (currentPage = 1) => {
    setLoading(true);
    try {
      const response = await getAllStartup(currentPage);
      const rawData = response?.data;
      const newStartups = Array.isArray(rawData?.data)
        ? rawData.data
        : Array.isArray(rawData)
        ? rawData
        : [];

      if (newStartups.length < 9) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setStartups(newStartups);
      } else {
        setStartups((prev) => [...prev, ...newStartups]);
      }

      setPage(currentPage);
    } catch (error) {
      console.error("ERROR FETCHING STARTUPS:", error);
      showErrorToast("Failed to load startups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [isEditing]);

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Startup', 'Are you sure you want to delete this?');

    if (result) {
      setLoading(true);
      try {
        await deleteStartup(id);
        showSuccessToast("Deleted successfully");
        setStartups((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        showErrorToast("Failed to delete startup.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedStartup(null);
  };

  if (isEditing) {
    return (
      <AddStartup
        setIsEditing={setIsEditing}
        editStartup={isEditing}
        StartupData={selectedStartup}
      />
    );
  }

  if (loading && startups.length === 0) {
    return <ScreenLoader />;
  }

  return (
    <div className="p-4">
      {startups.length === 0 && !loading && (
        <p className="text-center text-gray-500">No startups found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => (
          <div
            key={startup._id}
            className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-2xl p-4 relative hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
              <button className="hover:text-red-600" onClick={() => handleDelete(startup._id)}>
                <MdDelete size={20} className="text-red-500" />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedStartup(startup);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedStartup(startup);
                  setIsEditing(true);
                }}
              >
                <FaEdit size={18} />
              </button>
            </div>

            {/* Logo */}
            {startup.startupLogo && (
              <img
                src={startup.startupLogo}
                alt={`${startup.startupName} Logo`}
                className="h-28 w-full object-contain mb-4"
              />
            )}

            <div className="text-center">
              <h2 className="text-xl font-bold">{startup.startupName}</h2>
              <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">{startup.slogan}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{startup.description}</p>
              <p><strong>Founder:</strong> {startup.founder}</p>
              <p><strong>Startup Category:</strong> {startup.startupCategory}</p>
              <p><strong>Email:</strong> {startup.contactEmail}</p>
              <p><strong>Phone:</strong> {startup.contactPhone}</p>
              <p><strong>Social Links:</strong> {startup.socialLinks}</p>
              <p><strong>Date of Establishment:</strong>  {new Date(startup.dateOfEstablishment).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {startup.offlineLocation}</p>
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

      <Popup title="View Startup" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedStartup && (
          <div className="space-y-2 text-sm text-left">
            <div className="flex justify-center">
              {selectedStartup.startupLogo && (
                <img
                  src={selectedStartup.startupLogo}
                  alt={`${selectedStartup.startupName} Logo`}
                  className="h-28 w-28 object-contain rounded-full"
                />
              )}
            </div>
            <p><strong>Startup Name:</strong> {selectedStartup.startupName}</p>
            <p><strong>Founder:</strong> {selectedStartup.founder}</p>
              <p><strong>Startup Slogan:</strong> {selectedStartup.slogan}</p>
              <p><strong>Startup Description:</strong> {selectedStartup.description}</p>
              <p><strong>Startup Category:</strong> {selectedStartup.startupCategory}</p>
              <p><strong>Email:</strong> {selectedStartup.contactEmail}</p>
              <p><strong>Phone:</strong> {selectedStartup.contactPhone}</p>
              <p><strong>Social Links:</strong> {selectedStartup.socialLinks}</p>
              <p><strong>Date of Establishment:</strong>  {new Date(selectedStartup.dateOfEstablishment).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {selectedStartup.offlineLocation}</p>

          </div>
        )}
      </Popup>
    </div>
  );
};

export default Startup;
import React, { useState, useEffect } from 'react'
import { getAllDemands, deleteDemand } from '../../api/allApi/demand';
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import AddAdvice from './AddAdvice';
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';

const AllAdvice = () => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllDemands();
      if (response.status === 200) {
        const adviceData = Array.isArray(response.data)
          ? response.data
          : (response.data?.data || []);
        setAdvice(adviceData);
      } else {
        setError("Failed to fetch advice");
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      setError("An error occurred while fetching advice");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Demand', 'Are you sure you want to delete this?');
    if (result) {
      try {
        await deleteDemand(id);
        showSuccessToast("Deleted successfully");
        setAdvice(advice.filter((info) => info._id !== id));
      } catch (error) {
        showErrorToast(error.message || "Failed to delete");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedDemand(null);
  };

  if (isEditing && selectedDemand) {
    return (
      <AddAdvice
        setIsEditing={setIsEditing}
        editAddAdvice={true}
        AddAdviceData={selectedDemand}
      />
    );
  }

  if (loading) {
    return <ScreenLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
        <div className="text-red-500 text-center p-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        All Advice and Demands
      </h2>

      {advice.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No advice or demands found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advice.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 relative">

              {/* Action Icons */}
              <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
                <button onClick={() => handleDelete(item._id)}>
                  <MdDelete size={20} className="text-red-500" />
                </button>
                <button onClick={() => {
                  setSelectedDemand(item);
                  setShowPopup(true);
                }}>
                  <FaEye size={18} />
                </button>
                <button onClick={() => {
                  setSelectedDemand(item);
                  setIsEditing(true);
                }}>
                  <FaEdit size={18} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {item.topicOfFeedback}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>

              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p><strong>Name:</strong> {item.firstName} {item.lastName}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Year:</strong> {item.year}</p>
                <p><strong>Title:</strong> {item.demandTitle}</p>
                <p><strong>Rating:</strong> {item.rating}</p>
                <p><strong>Status:</strong> {item.demandStatus}</p>
                <p><strong>Progress:</strong> {item.progressCount}%</p>
                <p><strong>Raised On:</strong> {new Date(item.demandRaiseDate).toLocaleDateString()}</p>
                <p><strong>Submitted:</strong> {item.demandSubmitted}</p>
                <p><strong>Submitted To:</strong> {item.submittedTo}</p>
                <p><strong>Admin Response:</strong> {item.administrationResponse}</p>

                {item.hashtags?.length > 0 && (
                  <p><strong>Hashtags:</strong> {item.hashtags.join(', ')}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setPage(prev => prev + 1);
              fetchData(page + 1);
            }}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}

      <Popup title="View Demand" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedDemand && (
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {selectedDemand.firstName} {selectedDemand.lastName}</p>
            <p><strong>Email:</strong> {selectedDemand.email}</p>
            <p><strong>Year:</strong> {selectedDemand.year}</p>
            <p><strong>Title:</strong> {selectedDemand.demandTitle}</p>
            <p><strong>Description:</strong> {selectedDemand.description}</p>
            <p><strong>Rating:</strong> {selectedDemand.rating}</p>
            <p><strong>Status:</strong> {selectedDemand.demandStatus}</p>
            <p><strong>Progress:</strong> {selectedDemand.progressCount}%</p>
            <p><strong>Raised On:</strong> {new Date(selectedDemand.demandRaiseDate).toLocaleDateString()}</p>
            <p><strong>Submitted:</strong> {selectedDemand.demandSubmitted}</p>
            <p><strong>Submitted To:</strong> {selectedDemand.submittedTo}</p>
            <p><strong>Admin Response:</strong> {selectedDemand.administrationResponse}</p>
            
            {selectedDemand.demandUpdates?.length > 0 && (
              <div>
                <strong>Updates:</strong>
                <ul className="list-disc ml-4">
                  {selectedDemand.demandUpdates.map((update, i) => (
                    <li key={i}>{update}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default AllAdvice;
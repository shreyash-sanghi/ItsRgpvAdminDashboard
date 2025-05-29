import React, { useEffect, useState } from "react";
import { getAllScholarships, deleteScholarship } from "../../api/allApi/scholarship";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Popup from "../ui/popup";
import AddScholarship from "./AddScholarship";
import { DeleteConfirm } from "../ui/deleteConfirm";
import ScreenLoader from "../ui/screenLoader";
import { showErrorToast, showSuccessToast } from "../ui/toast";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await getAllScholarships();
      setScholarships(response?.data?.data || []);
    } catch (error) {
      showErrorToast("Failed to load scholarships");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [isEditing]);

  const handleDelete = async (id) => {
    const result = await DeleteConfirm("Delete Scholarship", "Are you sure you want to delete this?");
    if (result) {
      try {
        await deleteScholarship(id);
        setScholarships((prev) => prev.filter((s) => s._id !== id));
        showSuccessToast("Scholarship deleted successfully");
      } catch (error) {
        showErrorToast("Failed to delete scholarship");
        console.error(error);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedScholarship(null);
  };

  if (isEditing) {
    return (
      <AddScholarship
        setIsEditing={setIsEditing}
        editScholarship={isEditing}
        ScholarshipData={selectedScholarship}
      />
    );
  }

  if (loading) return <ScreenLoader />;

  if (scholarships.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">No scholarships found</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((s, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-2xl p-4 relative hover:shadow-xl transition-shadow duration-300"
          >
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
              <button onClick={() => handleDelete(s._id)}>
                <MdDelete size={20} className="text-red-500" />
              </button>
              <button
                onClick={() => {
                  setSelectedScholarship(s);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} />
              </button>
              <button
                onClick={() => {
                  setSelectedScholarship(s);
                  setIsEditing(true);
                }}
              >
                <FaEdit size={18} />
              </button>
            </div>

            {/* Scholarship Info */}
            <h2 className="text-xl font-semibold mb-2">{s.scholarshipTitle}</h2>
            <p><strong>Organisation Name:</strong> {s.organisationName}</p>
            <p><strong>Organisation Type:</strong> {s.organisationType}</p>
            <p><strong>Amount:</strong> ₹{s.amount}</p>
            <p><strong>Eligiblity Criteria:</strong> {s.eligibilityCriteria}</p>
            <p><strong>Document Required:</strong> {s.documentRequired}</p>
            <p><strong>Contact Info:</strong> {s.contactInfo}</p>
            {s.applyUrl && (
              <a
                href={s.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline block mt-2"
              >
                Visit Link
              </a>
            )}
          </div>
        ))}
      </div>

      <Popup title="View Scholarship" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedScholarship && (
          <div className="space-y-2 text-sm">
            <p><strong>Organisation Name:</strong> {selectedScholarship.organisationName}</p>
            <p><strong>Organisation Type:</strong> {selectedScholarship.organisationType}</p>
            <p><strong>Amount:</strong> ₹{selectedScholarship.amount}</p>
            <p><strong>Eligiblity Criteria:</strong> {selectedScholarship.eligibilityCriteria}</p>
            <p><strong>Document Required:</strong> {selectedScholarship.documentRequired}</p>
            <p><strong>Contact Info:</strong> {selectedScholarship.contactInfo}</p>
            {selectedScholarship.applyUrl && (
              <a
                href={selectedScholarship.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline block mt-2"
              >
                Visit Link
              </a>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Scholarships;
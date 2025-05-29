import React, { useEffect, useState } from 'react';
import { getAllDepartments, deleteDepartment } from '../../api/allApi/department.js';
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import DepartmentInfo from './DepartmentInfo.jsx';
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';

const Departments = () => {
  const [department, setDepartment] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchData = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await getAllDepartments();
      const newDepartment = response?.data?.data || [];

      if (newDepartment.length < 9) setHasMore(false);

      setDepartment(currentPage === 1 ? newDepartment : [...department, ...newDepartment]);
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
    setSelectedDepartment(null);
    setCurrentImageIndex(0);
  };

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Department', 'Are you sure you want to delete this?');
    if (result) {
      try {
        await deleteDepartment(id);
        showSuccessToast("Deleted successfully");
        setDepartment(department.filter((d) => d._id !== id));
      } catch (error) {
        console.log(error);
        showErrorToast(error?.response?.data?.message || "Failed to delete");
      }
    }
  };

  if (isEditing && selectedDepartment) {
    return (
      <DepartmentInfo
        setIsEditing={setIsEditing}
        editDepartmentInfo={true}
        DepartmentInfoData={selectedDepartment}
      />
    );
  }

  if (loading && department.length === 0) {
    return <ScreenLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {department.map((dept) => (
          <div
            key={dept._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
          >
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500 z-10">
              <button onClick={() => handleDelete(dept._id)}>
                <MdDelete size={20} className="text-red-500" />
              </button>
              <button onClick={() => {
                setSelectedDepartment(dept);
                setShowPopup(true);
              }}>
                <FaEye size={18} />
              </button>
              <button onClick={() => {
                setSelectedDepartment(dept);
                setIsEditing(true);
              }}>
                <FaEdit size={18} />
              </button>
            </div>

            {Array.isArray(dept.departmentImages) ? (
              <img
                src={dept.departmentImages[0]}
                alt={dept.departmentName}
                className="w-full h-48 object-cover"
              />
            ) : dept.departmentImages ? (
              <img
                src={dept.departmentImages}
                alt={dept.departmentName}
                className="w-full h-48 object-cover"
              />
            ) : null}

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {dept.departmentName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {dept.headOfDepartment}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Total Seats: {dept.totalSeats}</p>
                <p>Year Of Establishment: {dept.yearOfEstablishment}</p>
                <p>Email: {dept.contactEmail}</p>
                <p>Contact : {dept.contactPhone}</p>
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

      <Popup title="View Department" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedDepartment && (
          <div className="space-y-2 text-sm max-h-[70vh] overflow-y-auto">
            {Array.isArray(selectedDepartment.departmentImages) && selectedDepartment.departmentImages.length > 0 && (
              <div className="relative flex items-center justify-center mb-4">
                <img
                  src={selectedDepartment.departmentImages[currentImageIndex]}
                  alt={`Department ${currentImageIndex + 1}`}
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
                {currentImageIndex < selectedDepartment.departmentImages.length - 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
                  >
                    →
                  </button>
                )}
              </div>
            )}

            <p><strong>Name of Department:</strong> {selectedDepartment.departmentName}</p>
            <p><strong>Head of Department:</strong> {selectedDepartment.headOfDepartment}</p>
            <p><strong>Description:</strong> {selectedDepartment.descriptionOfDepartment}</p>
            <p><strong>Total Seats:</strong> {selectedDepartment.totalSeats}</p>
            <p><strong>Year of Establishment:</strong> {new Date(selectedDepartment.yearOfEstablishment).toLocaleDateString()}</p>
            <p><strong>Contact Email:</strong> {selectedDepartment.contactEmail}</p>
            <p><strong>Contact Phone:</strong> {selectedDepartment.contactPhone}</p>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Departments;
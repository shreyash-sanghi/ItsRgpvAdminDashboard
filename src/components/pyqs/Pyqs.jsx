import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Popup from '../ui/popup';
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';
import { deletePyq, getAllPyqs } from "../../api/allApi/pyq";
import AddPyq from "./AddPyq";
import { UserContext } from "../../App";

const Pyqs = () => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPyq, setSelectedPyq] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 6;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const fetchData = async (pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const response = await getAllPyqs(pageNum, LIMIT);
      if (response.status === 200) {
        const data = response.data?.data || [];
        append ? setPyqs(prev => [...prev, ...data]) : setPyqs(data);
        setHasMore(data.length === LIMIT);
      } else {
        setError("Failed to fetch PYQs");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("An error occurred while fetching PYQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllPyqs();
        console.log("API Response:", response);
        
        if (response.status === 200) {
          const data = response.data?.data || [];
          console.log("Processed Data:", data);
          setPyqs(data);
        } else {
          setError("Failed to fetch PYQs");
          console.error("Error fetching PYQs:", response);
        }
      } catch (err) {
        setError("An error occurred while fetching PYQs");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
   
      const res = await DeleteConfirm('PYQ','Are you sure you want to delete this?');
      
      if(res){
        try{
          await deletePyq(id);
          showSuccessToast("deleted successfully");
          setPyqs(pyqs.filter((info) => info._id != id));
        }catch(error){
                  showErrorToast(error);
        }
      }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, true);
  };

  const openImagePopup = (pyq) => {
    let imgs = [];
    if (pyq.questionPaperImg) {
      imgs = Array.isArray(pyq.questionPaperImg) ? pyq.questionPaperImg : [pyq.questionPaperImg];
    }
    setSelectedImages(imgs);   // ✅ set images
    setShowPopup(true);
  };

  if (isEditing) {
    return (
      <AddPyq
        setIsEditing={setIsEditing}
        editPyq={selectedAchievement}
        PyqQuestionData={selectedAchievement}
      />
    );
  }

  if (loading && pyqs.length === 0) {
    return <ScreenLoader />;
  }

  return (
    <div className="p-4 relative">
      {pyqs.length === 0 && !loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">No PYQs found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pyqs.map((pyq) => (
              <div
                key={pyq._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {pyq.subjectName}
                    </h3>

                    <div className="flex space-x-2 text-gray-500">
                      <button
                        className="hover:text-red-600"
                        onClick={() => {
                          handleDelete(pyq._id);
                        }}
                      >
                        <MdDelete size={20} className='text-red-500' />
                      </button>
                      <button
                        className="hover:text-blue-600"
                        onClick={() => {
                          setSelectedPyq(pyq);
                          setShowPopup(true); 
                        }}
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                        className="hover:text-green-600"
                        onClick={() => {
                          setSelectedAchievement(pyq);
                          setIsEditing(true);
                        }}
                      >
                        <FaEdit size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Semester: {pyq.semester}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Department: {pyq.department}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Paper Type: {pyq.paperType}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Year: {pyq.paperForYear}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">College: {pyq.college}</p>
                  </div>

                  {pyq.questionPaperImg && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {(Array.isArray(pyq.questionPaperImg) ? pyq.questionPaperImg : [pyq.questionPaperImg])
                        .slice(0, 2)
                        .map((img, index) => (
                          <img
                            key={img + index}
                            src={img}
                            alt={`PYQ ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Popup to show full images */}
      {showPopup && selectedPyq && (<>
      {console.log(selectedPyq)}
        <Popup title="PYQ Detail" isOpen={showPopup}  onClose={(handleClosePopup) => setShowPopup(false)}>
        {selectedPyq && (
          <div className="space-y-2 text-sm">
            <p><strong>Subject Name:</strong> {selectedPyq.subjectName}</p>
            <p><strong>Subject Code:</strong> {selectedPyq.subjectCode}</p>
            <p><strong>Title:</strong> {selectedPyq.achievementTitle}</p>
            <p><strong>Paper Publish Year:</strong> {selectedPyq.paperPublishYear}</p>
            <p><strong>Semester:</strong> {selectedPyq.semester}</p>
            <p><strong>Paper Type:</strong> {selectedPyq.paperType}</p>
            <p><strong>Paper For Year:</strong> {selectedPyq.paperForYear}</p>
            <p><strong>Department:</strong> {selectedPyq.department}</p>
            <p><strong>College:</strong> {selectedPyq.college}</p>

            {selectedPyq.questionPaperImg && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {(Array.isArray(selectedPyq.questionPaperImg) ? selectedPyq.questionPaperImg : [selectedPyq.questionPaperImg])
                        .slice(0, 2)
                        .map((img, index) => (
                          <img
                            key={img + index}
                            src={img}
                            alt={`PYQ ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                        ))}
                    </div>
                  )}
          </div>
        )}
        </Popup>
      </>
       
      )}

      {/* Delete confirmation popup */}
      {showDeleteConfirm && (
        <DeleteConfirm
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Pyqs;
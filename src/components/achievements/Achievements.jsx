import React, { useEffect, useState } from 'react';
import { deleteAchievement, getAllachievements } from '../../api/allApi/achivement';
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import AddAchievement from './AddAchievements';
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true); 
const [loading, setLoading] = useState(false);

  const fetchData = async (currentPage = 1) => {
  setLoading(true);
  try {
    const response = await getAllachievements(currentPage); 
    const newAchievements = response?.data?.data || [];

    if (newAchievements.length < 9) {
      setHasMore(false); 
    }

    if (currentPage === 1) {
      setAchievements(newAchievements); // First load
    } else {
      setAchievements((prev) => [...prev, ...newAchievements]); // Append
    }

    setPage(currentPage); // Update current page
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

  const truncateDescription = (desc, id) => {
    if (!desc) return 'No description provided.';
    const words = desc.split(' ');
    if (words.length <= 20 || expandedDescriptions[id]) return desc;
    return words.slice(0, 20).join(' ') + '...';
  };

  // Handle Popup close and clear selected data
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedAchievement(null);
  };

    const handleDelete= async (id) => {
          console.log(id);
    const result = await DeleteConfirm('Delete Achievement', 'Are you sure you want to delete this?');

    if (result) {
      try {
        await deleteAchievement(id);
        alert("successfully delete..")
        setAchievements(achievements.filter((info)=>info._id!=id));
      } catch (error) {
         alert(error);  
      }finally {
    setLoading(false);
  }
    } else {
      console.log('Cancelled!');
    }
  };

   if(isEditing){
    return(
      <AddAchievement setIsEditing={setIsEditing} editAchievement = {isEditing} AchievementData = {selectedAchievement}/>
    )
   }
     if(loading){
    return(
      <ScreenLoader/>
    )
  }
  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((ach, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-2xl p-4 relative hover:shadow-xl transition-shadow duration-300"
          >
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
              <button
                className="hover:text-blue-600"
                onClick={() => {
               handleDelete(ach._id)
                }}
              >
               <MdDelete size={20}  className='text-red-500' />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedAchievement(ach);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedAchievement(ach);
                  setIsEditing(true);
                }}
              >
                <FaEdit size={18} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={ach.photos}
                alt="User"
                className="w-14 h-14 border border-black rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">
                  {ach.firstName} {ach.lastName}
                </h2>
                <p className="text-sm text-gray-500">{ach.email}</p>
              </div>
            </div>

            {/* Achievement Info */}
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
              <p><strong>Title:</strong> {ach.achievementTitle}</p>

              <p>
                <strong>Description:</strong>{' '}
                {truncateDescription(ach?.achievementDescription, ach._id)}{' '}
                {ach?.achievementDescription &&
                  ach?.achievementDescription.split(' ').length > 20 && (
                    <button
                      onClick={() => toggleDescription(ach._id)}
                      className="text-blue-500 text-xs ml-1"
                    >
                      {expandedDescriptions[ach._id] ? 'View Less' : 'View More'}
                    </button>
                  )}
              </p>

              <p><strong>Award:</strong> {ach.awards}</p>
              <p><strong>Date:</strong> {new Date(ach.achievementDate).toLocaleDateString()}</p>
              <p><strong>Field:</strong> {ach.fieldOfAchievement.join(', ')}</p>
              <p><strong>Recognition:</strong> {ach.recognitionLevel.join(', ')}</p>
              <p><strong>Branch:</strong> {ach.branch}</p>
              <p><strong>Department:</strong> {ach.department}</p>
              <p><strong>Semester:</strong> {ach.semester}</p>
              <p><strong>Enrollment No:</strong> {ach.enrollmentNumber}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {ach.socialMediaLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline text-sm truncate max-w-[140px]"
                  >
                    {link}
                  </a>
                ))}
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
      {!loading && 'Load More'}
    </button>
  </div>
)}

      <Popup title="View Achievement" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedAchievement && (
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedAchievement.firstName} {selectedAchievement.lastName}</p>
              <p><strong>Email:</strong> {selectedAchievement.email}</p>
              <p><strong>Title:</strong> {selectedAchievement.achievementTitle}</p>
              <p><strong>Description:</strong> {selectedAchievement.achievementDescription}</p>
              <p><strong>Award:</strong> {selectedAchievement.awards}</p>
              <p><strong>Date:</strong> {new Date(selectedAchievement.achievementDate).toLocaleDateString()}</p>
              <p><strong>Field:</strong> {selectedAchievement.fieldOfAchievement.join(', ')}</p>
              <p><strong>Recognition:</strong> {selectedAchievement.recognitionLevel.join(', ')}</p>
              <p><strong>Branch:</strong> {selectedAchievement.branch}</p>
              <p><strong>Department:</strong> {selectedAchievement.department}</p>
              <p><strong>Semester:</strong> {selectedAchievement.semester}</p>
              <p><strong>Enrollment No:</strong> {selectedAchievement.enrollmentNumber}</p>
              <div className="flex gap-2 flex-wrap">
                {selectedAchievement.socialMediaLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline text-sm truncate max-w-[140px]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
        )}
      </Popup>
    </div>
  );
};

export default Achievements;

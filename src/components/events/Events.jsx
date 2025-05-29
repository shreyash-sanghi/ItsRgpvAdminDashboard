import React, { useState, useEffect } from 'react';
import { getAllEvents, deleteEvent } from '../../api/allApi/event';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Popup from '../ui/popup';
import AddEvent from './AddEvent';
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchData = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await getAllEvents();
      const newEvent = response?.data?.data || [];

      if (newEvent.length < 9) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setEvents(newEvent);
      } else {
        setEvents((prev) => [...prev, ...newEvent]);
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
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Event', 'Are you sure you want to delete this?');
    if (result) {
      try {
        await deleteEvent(id);
        showSuccessToast("Deleted successfully");
        setEvents(events.filter((event) => event._id !== id));
      } catch (error) {
        showErrorToast(error?.response?.data?.message || "Failed to delete");
      }
    }
  };

  if (isEditing) {
    return (
      <AddEvent
        setIsEditing={setIsEditing}
        editEvent={true}
        EventData={selectedEvent}
      />
    );
  }

  if (loading && events.length === 0) {
    return <ScreenLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
          >
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500 z-10">
              <button onClick={() => handleDelete(event._id)}>
                <MdDelete size={20} className="text-red-500" />
              </button>
              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} />
              </button>
              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setIsEditing(true);
                }}
              >
                <FaEdit size={18} />
              </button>
            </div>

            {event.bannerPicture && (
              <img
                src={event.bannerPicture}
                alt={event.eventName}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {event.eventName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {event.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Organized by: {event.organisedBy}</p>
                <p>Date: {new Date(event.dateOfEvent).toLocaleDateString()}</p>
                <p>Venue: {event.venue}</p>
                <p>Event Type: {event.eventType}</p>
                <p>Tags: {event.tags}</p>
                <p>Target Audience: {JSON.parse(event.targetAudience).join(", ")}</p>
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

      <Popup title="View Event" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedEvent && (
          <div className="space-y-2 text-sm max-h-[70vh] overflow-y-auto">
            
            {selectedEvent.eventImages?.length > 0 && (
              <div className="relative flex items-center justify-center mb-4">
                <img
                  src={selectedEvent.eventImages[currentImageIndex]}
                  alt={`Event ${currentImageIndex + 1}`}
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
                {currentImageIndex < selectedEvent.eventImages.length - 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
                  >
                    →
                  </button>
                )}
              </div>
            )}
            <p><strong>Name:</strong> {selectedEvent.eventName}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Organised By:</strong> {selectedEvent.organisedBy}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            <p><strong>Date:</strong> {new Date(selectedEvent.dateOfEvent).toLocaleDateString()}</p>
            <p><strong>Event Type:</strong> {selectedEvent.eventType}</p>
            <p><strong>Tags:</strong> {selectedEvent.tags}</p>
            <p><strong>Target Audience:</strong> {JSON.parse(selectedEvent.targetAudience).join(", ")}</p>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Events;
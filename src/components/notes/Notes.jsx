import React, { useState, useEffect } from "react";
import { getAllNotes, deleteNotes } from "../../api/allApi/notes";
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import AddNotes from "./AddNotes";
import { MdDelete } from "react-icons/md";
import { DeleteConfirm } from '../ui/deleteConfirm';
import ScreenLoader from '../ui/screenLoader';
import { showErrorToast, showSuccessToast } from '../ui/toast';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchData = async (currentPage = 1) => {
    setLoading(true);
    try {
      const response = await getAllNotes(currentPage); // Ensure pagination supported in backend
      const newNotes = response?.data?.data || [];

      if (newNotes.length < 9) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setNotes(newNotes);
      } else {
        setNotes((prev) => [...prev, ...newNotes]);
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
    setSelectedNote(null);
  };

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Note', 'Are you sure you want to delete this note?');
    if (result) {
      try {
        await deleteNotes(id);
        showSuccessToast("Deleted successfully");
        setNotes(notes.filter((note) => note._id !== id));
      } catch (error) {
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const truncateDescription = (desc, id) => {
    if (!desc) return 'No description provided.';
    const words = desc.split(' ');
    if (words.length <= 20 || expandedDescriptions[id]) return desc;
    return words.slice(0, 20).join(' ') + '...';
  };

  if (isEditing) {
    return (
      <AddNotes
        setIsEditing={setIsEditing}
        editNotes={isEditing}
        NotesData={selectedNotes}
      />
    );
  }

  if (loading && page === 1) {
    return <ScreenLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
          >
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
              <button onClick={() => handleDelete(note._id)}>
                <MdDelete size={20} className="text-red-500" />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedNote(note);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} />
              </button>
              <button onClick={() => {
                setSelectedNotes(note);
                setIsEditing(true);
              }}>
                <FaEdit size={18} />
              </button>
            </div>

            {note.thumbnailPicture && (
              <img
                src={note.thumbnailPicture}
                alt={note.subjectName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {note.subjectName}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>Subject Code: {note.subjectCode}</p>
                <p>Branch: {note.branch}</p>
                <p>Department: {note.department}</p>
                <p>Year: {note.year}</p>
                <p>Semester: {note.semester}</p>
                <p>Contact: {note.contactNumber}</p>
                <p>
                  Description: {truncateDescription(note.description, note._id)}
                  {note.descriptionNotes && note.descriptionNotes.split(' ').length > 20 && (
                    <button
                      className="ml-2 text-blue-500 text-sm underline"
                      onClick={() => toggleDescription(note._id)}
                    >
                      {expandedDescriptions[note._id] ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </p>
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

      <Popup title="View Note" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedNote && (
          <div className="space-y-2 text-sm">
            <p><strong>Subject:</strong> {selectedNote.subjectName}</p>
            <p><strong>Subject Code:</strong> {selectedNote.subjectCode}</p>
            <p><strong>Branch:</strong> {selectedNote.branch}</p>
            <p><strong>Department:</strong> {selectedNote.department}</p>
            <p><strong>Semester:</strong> {selectedNote.semester}</p>
            <p><strong>Contact:</strong> {selectedNote.contactNumber}</p>
            <p><strong>Desciption:</strong> {selectedNote.descriptionNotes}</p>
            <a
              href={selectedNote.notesFile}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Download PDF
            </a>
            <div className="mt-4">
              <strong>PDF Preview:</strong>
              {selectedNote.notesFile ? (
                <iframe
                  src={selectedNote.notesFile}
                  title="PDF Preview"
                  className="w-full h-[500px] mt-2 border rounded"
                />
              ) : (
                <p className="text-red-500">No PDF file available.</p>
              )}
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Notes;
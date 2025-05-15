import React, { useState, useEffect } from "react";
import { getAllNotes } from "../../api/allApi/notes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await getAllNotes();
      console.log(response?.data?.data);
      setNotes(response?.data?.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after fetching or error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!Array.isArray(notes) || notes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No notes found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
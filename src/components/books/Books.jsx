import React, { useState, useEffect } from 'react';
import ScreenLoader from '../ui/screenLoader';
import { DeleteConfirm } from '../ui/deleteConfirm';
import { MdDelete } from 'react-icons/md';
import { FaEdit, FaEye } from 'react-icons/fa';
import Popup from '../ui/popup';
import { deleteBook, getAllBooks } from '../../api/allApi/books';
import AddBook from './AddBook';
import { showErrorToast, showSuccessToast } from '../ui/toast';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllBooks();
      setBooks(response?.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isEditing]);

  const handleDelete = async (id) => {
    const result = await DeleteConfirm('Delete Book', 'Are you sure you want to delete this?');
    if (result) {
      try {
        await deleteBook(id);
        showSuccessToast("Successfully deleted")
        setBooks((prev) => prev.filter((book) => book._id !== id));
      } catch (error) {
        showErrorToast("Delete failed");
        console.error(error);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBook(null);
  };

  if (isEditing) {
    return (
      <AddBook
        setIsEditing={setIsEditing}
        editBook={isEditing}
        BookData={selectedBook}
      />
    );
  }

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-2xl p-4 relative hover:shadow-xl transition-shadow duration-300"
          >
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex space-x-2 text-gray-500">
              <button
                className="hover:text-red-600"
                onClick={() => handleDelete(book._id)}
              >
                <MdDelete size={20} className="text-red-500" />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedBook(book);
                  setShowPopup(true);
                }}
              >
                <FaEye size={18} />
              </button>
              <button
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedBook(book);
                  setIsEditing(true);
                }}
              >
                <FaEdit size={18} />
              </button>
            </div>

            {/* Image */}
            {book.bookImg && (
              <img
                src={book.bookImg}
                alt="Book Cover"
                className="w-full h-48 object-cover rounded-md mb-4 border border-black"
              />
            )}

            {/* Book Info */}
            <div className="space-y-2 text-sm">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {book.description || 'No description provided.'}
              </p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Department:</strong> {book.department}</p>
              <p><strong>Semester:</strong> {book.semester}</p>
              <p><strong>Availability:</strong> {book.availability}</p>
              {book.publicationYear && <p><strong>Publication Year:</strong> {book.publicationYear}</p>}
            </div>
          </div>
        ))}
      </div>

      <Popup title="View Book" isOpen={showPopup} onClose={handleClosePopup}>
        {selectedBook && (
          <div className="space-y-2 text-sm">
            {selectedBook.bookImg && (
              <img
                src={selectedBook.bookImg}
                alt="Book Cover"
                className="w-full h-48 object-cover rounded-md mb-4 border border-black"
              />
            )}
            <p><strong>Title:</strong> {selectedBook.title}</p>
            <p><strong>Description:</strong> {selectedBook.description}</p>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Department:</strong> {selectedBook.department}</p>
            <p><strong>Semester:</strong> {selectedBook.semester}</p>
            <p><strong>Availability:</strong> {selectedBook.availability}</p>
            {selectedBook.publicationYear && (
              <p><strong>Publication Year:</strong> {selectedBook.publicationYear}</p>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Books;
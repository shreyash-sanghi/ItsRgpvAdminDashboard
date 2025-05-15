import React, { useState, useEffect } from 'react'
import { getAllBooks } from '../../api/allApi/books';

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response?.data?.data || []);
    } catch(error){
      console.error(error);
    }
  }
  
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Books
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {book.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {book.description}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Author: {book.author}</p>
              <p>Department: {book.department}</p>
              <p>Semester: {book.semester}</p>
              <p>Availability: {book.availability}</p>
              {book.publicationYear && <p>Publication Year: {book.publicationYear}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books 
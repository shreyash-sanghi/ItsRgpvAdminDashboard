import React, { useState, useEffect } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import FileUpload from "../../components/ui/fileUpload";
import { addBook } from "../../api/api";
import { UserContext } from "../../App";
import { useContext } from "react";

const AddBook = () => {
  const { setSectionName } = useContext(UserContext); 
  const [book, setBook] = useState({
    author: "",
    title: "", // Added title field
    description: "",
    department: "",
    semester: "",
    tags: [],
    thumbnailPicture: "",
    bookUrl: [],
    availability: "",
    publicationYear: "",
  });

  
  const handleChange = (field, value) => {
    setBook((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleFileUpload = (field, files) => {
    setBook((prev) => ({
      ...prev,
      [field]: files, // Set file data to the corresponding field
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Book Data:", book);
    
    const response = await addBook(book);
    if (response.status === 200) {
      console.log("Book Data:", response);
    } else {
      console.log("Error:", response);
    }
    
    // Reset form after submission
    setBook({
      author: "",
      description: "",
      department: "",
      semester: "",
      tags: "",
      thumbnailPicture: "",
      bookUrl: [],
      availability: "",
      publicationYear: "",
    });
  };
  
  useEffect(() => {
    setSectionName("Add Book");
  },[]);
  
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Add Book</h2>

        {/* Book Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Book Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <InputField
                id="title"
                value={book.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter book title"
                required
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <InputField
                id="author"
                value={book.author}
                onChange={(e) => handleChange("author", e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <InputField
                id="department"
                value={book.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="Enter department"
                required
              />
            </div>
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Semester <span className="text-red-500">*</span>
              </label>
              <InputField
                id="semester"
                type="number"
                value={book.semester}
                onChange={(e) => handleChange("semester", e.target.value)}
                placeholder="Enter semester"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <InputField
              id="description"
              value={book.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
        </section>

        {/* Additional Details Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Additional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags <span className="text-red-500">*</span>
              </label>
              <InputField
                id="tags"
                value={book.tags}
                onChange={(e) => handleChange("tags", e.target.value.split(",").map(tag => tag.trim()))}
                placeholder="Enter tags (comma-separated)"
                required
              />
            </div>
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Availability <span className="text-red-500">*</span>
              </label>
              <InputField
                id="availability"
                value={book.availability}
                onChange={(e) => handleChange("availability", e.target.value)}
                placeholder="Enter availability status"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="thumbnailPicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thumbnail Picture
              </label>
              <FileUpload
                id="thumbnailPicture"
                files={book.thumbnailPicture}
                onChange={(files) => handleFileUpload("thumbnailPicture", files)}
              />
            </div>
            <div>
              <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Publication Year
              </label>
              <InputField
                id="publicationYear"
                value={book.publicationYear}
                onChange={(e) => handleChange("publicationYear", e.target.value)}
                placeholder="Enter publication year"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="bookUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Book URLs
            </label>
            <InputField
              id="bookUrl"
              value={book.bookUrl.join(", ")}
              onChange={(e) => handleChange("bookUrls", e.target.value.split(",").map((url) => url.trim()))}
              placeholder="Enter book URLs (comma-separated)"
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddBook;

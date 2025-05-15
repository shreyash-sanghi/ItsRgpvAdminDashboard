import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import FileUpload from "../ui/fileUpload";
import { addBook } from "../../api/allApi/books";

const AddBook = () => {
  const [book, setBook] = useState({
    author: "",
    title: "",
    description: "",
    department: "",
    semester: "",
    tags: [],
    bookImg: null,
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


const handleFileUpload = (field, file) => {
  setBook((prev) => ({
    ...prev,
    [field]: file,  // Directly assign the file instead of an array
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Add required fields
      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("description", book.description);
      formData.append("department", book.department);
      formData.append("semester", book.semester);
      formData.append("availability", book.availability);
      formData.append("publicationYear", book.publicationYear);
      formData.append("formType", "book");

      // Handle optional fields
      if (book.bookImg) {
        formData.append("bookImg", book.bookImg, book.bookImg.name);
      }

      console.log("Book urrrrllllll", book.bookImg);

      if (book.tags && book.tags.length > 0) {
        formData.append("tags", JSON.stringify(book.tags));
      }
      if (book.bookUrl && book.bookUrl.length > 0) {
        formData.append("bookUrl", JSON.stringify(book.bookUrl));
      }

      const response = await addBook(formData);
      if (response) {
        alert("Book added successfully!");
        // Reset form
        setBook({
          author: "",
          title: "",
          description: "",
          department: "",
          semester: "",
          tags: [],
          bookImg: null,
          bookUrl: [],
          availability: "",
          publicationYear: "",
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error: " + (error?.response?.data?.message || error.message));
    }
  };

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
              <select
                id="semester"
                value={book.semester}
                onChange={(e) => handleChange("semester", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select semester</option>
                <option value="1">I</option>
                <option value="2">II</option>
                <option value="3">III</option>
                <option value="4">IV</option>
                <option value="5">V</option>
                <option value="6">VI</option>
                <option value="7">VII</option>
                <option value="8">VIII</option>
              </select>
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
                Tags
              </label>
              <InputField
                id="tags"
                value={book.tags.join(", ")}
                onChange={(e) => handleChange("tags", e.target.value.split(",").map(tag => tag.trim()))}
                placeholder="Enter tags (comma-separated)"
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
              <label htmlFor="bookImg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thumbnail Picture
              </label>
              <FileUpload
                id="bookImg"
                files={book.bookImg}
                onChange={(files) => handleFileUpload("bookImg", files)}
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
              onChange={(e) => handleChange("bookUrl", e.target.value.split(",").map((url) => url.trim()))}
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
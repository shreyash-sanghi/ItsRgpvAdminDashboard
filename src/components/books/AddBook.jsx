import React, { useState, useEffect, useContext } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import FileUpload from "../ui/fileUpload";
import { addBook, editBookAPI} from "../../api/allApi/books";
import Select from "../ui/select";
import { showSuccessToast, showErrorToast } from "../ui/toast.jsx";
import { UserContext } from "../../App.jsx";


const AddBook = ({ editBook = false, BookData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
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

  // Keep original book data for comparison
  const [originalBook, setOriginalBook] = useState(null);

  useEffect(() => {
    setSectionName(editBook ? "Edit Book" : "Add Book");

    if (editBook && BookData) {

      setBook({
        ...BookData,
        author: BookData.author || "",
        title: BookData.title || "",
        description: BookData.description || "",
        department: BookData.department || "",
        semester: BookData.semester || "",
        tags: BookData.tags || [],
        bookImg: null, // don't preload file input
        bookUrl: BookData.bookUrl || [],
        availability: BookData.availability || "",
        publicationYear: BookData.publicationYear || "",
      });
      setOriginalBook({ ...BookData });
    }
  }, [editBook, BookData, setSectionName]);

  const handleChange = (field, value) => {
    setBook((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    setBook((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  // Compare two values deeply, for arrays check stringified equality
  const isEqual = (val1, val2) => {
    if (Array.isArray(val1) && Array.isArray(val2)) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    }
    return val1 === val2;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      if (editBook && originalBook) {
        // Build form data with only changed fields
        const formData = new FormData();
        const fieldsToCheck = [
          "author",
          "title",
          "description",
          "department",
          "semester",
          "tags",
          "bookUrl",
          "availability",
          "publicationYear",
        ];

        let hasChanges = false;

        for (const field of fieldsToCheck) {
          if (!isEqual(book[field], originalBook[field])) {
            hasChanges = true;
            if (Array.isArray(book[field])) {
              formData.append(field, JSON.stringify(book[field]));
            } else {
              formData.append(field, book[field]);
            }
          }
        }
        // cloudinary folder
        formData.append("formType", "book");

        // Check if bookImg changed (a new file)
        if (book.bookImg) {
          hasChanges = true;
          formData.append("bookImg", book.bookImg, book.bookImg.name);
        }

        if (!hasChanges) {
          showErrorToast("No changes detected to update");
          setLoading(false);
          return;
        }

        // Send partial update to backend
        const response = await editBookAPI(BookData._id, formData);
        if (response) {
          showSuccessToast("Book edited successfully");
          if (setIsEditing) setIsEditing(false);
        }
      } else {
        // For adding new book, send full form data
        const formData = new FormData();
        for (const key in book) {
          if (book[key]) {
            if (Array.isArray(book[key])) {
              formData.append(key, JSON.stringify(book[key]));
            } else if (key === "bookImg") {
              formData.append(key, book[key], book[key].name);
            } else {
              formData.append(key, book[key]);
            }
          }
        }
        formData.append("formType", "book");

        const response = await addBook(formData);
        if (response) {
          showSuccessToast("Book uploaded successfully");
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
      }
    } catch (error) {
      console.error("Error adding/editing book:", error);
      const errorMessage =
        error?.response?.data?.message || "Book upload failed. Please try again.";
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl flex justify-between font-semibold text-gray-800 dark:text-gray-100 mb-6">
        <p>
            {editBook ? "Edit Book" : "Add Book"}
          </p>
          {(editBook) && (<>
            <Button onClick={() => setIsEditing(false)} label="<- Back"></Button>
          </>)}
        </h2>

        {/* Book Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Book Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="title"
              label="Title"
              value={book.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter book title"
              required
            />
            <InputField
              id="author"
              label="Author"
              value={book.author}
              onChange={(e) => handleChange("author", e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* dropdown for department */}
            <Select
              id="department"
              label="Department"
              value={book.department}
              onChange={(e) => handleChange("department", e.target.value)}
              options={[
                "Computer Science",
                "Information Technology",
                "Electronics",
                "Mechanical",
                "Civil",
                "Electrical and Electronics",
                "Petrochemical",
                "Automobile"
              ]}
              placeholder="Select Department"
              required
            />
            <div>
              <Select
                id="semester"
                label="Semester"
                value={book.semester}
                onChange={(e) => handleChange("semester", e.target.value)}
                options={[1, 2, 3, 4, 5, 6, 7, 8]}
                placeholder="Select semester"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <InputField
              id="description"
              label="Description (Minimum 20 words)"
              value={book.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
        </section>

        {/* Additional Details Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="tags"
              label="Tags"
              value={book.tags.join(", ")}
              onChange={(e) =>
                handleChange(
                  "tags",
                  e.target.value.split(",").map((tag) => tag.trim())
                )
              }
              placeholder="Enter tags (comma-separated)"
            />
            <InputField
              id="availability"
              label="Availability"
              value={book.availability}
              onChange={(e) => handleChange("availability", e.target.value)}
              placeholder="Enter availability status"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <FileUpload
                label="Book Image"
                id="bookImg"
                files={book.bookImg}
                onChange={(files) => handleFileUpload("bookImg", files)}
              />
            </div>
            <InputField
              id="publicationYear"
              label="Publication Year"
              type="number"
              value={book.publicationYear}
              onChange={(e) => handleChange("publicationYear", e.target.value)}
              placeholder="Enter publication year"
            />
          </div>

          <div className="mt-4">
            <InputField
              id="bookUrl"
              label="Book URLs"
              value={book.bookUrl.join(", ")}
              onChange={(e) =>
                handleChange(
                  "bookUrl",
                  e.target.value.split(",").map((url) => url.trim())
                )
              }
              placeholder="Enter book URLs (comma-separated)"
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button loading={loading} label="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddBook;
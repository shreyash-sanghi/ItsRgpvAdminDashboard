import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";

const Notes = () => {
  const [notes, setNotes] = useState({
    subjectName: "",
    branch: "",
    subjectCode: "",
    contactNumber: "",
    thumbnailPicture: null, // Store the file object here
    year: null,
    department: "",
    semester: 0,
  });

  const handleChange = (field, value) => {
    setNotes((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Access the selected file
    if (file) {
      setNotes((prev) => ({
        ...prev,
        thumbnailPicture: file, // Store the file object in state
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Notes Data:", notes);

    const response = await addNotes(notes);
    if (response.status === 200) {
      console.log("Notes Data:", response);
    } else {
      console.log("Error:", response);
    }

    // Reset form after submission
    // setNotes({
    //   subjectName: "",
    //   branch: "",
    //   subjectCode: "",
    //   contactNumber: "",
    //   thumbnailPicture: null,
    //   year: null,
    //   department: "",
    //   semester: 0,
    // });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Notes Information
        </h2>

        {/* Notes Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Notes Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="subjectName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Subject Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="subjectName"
                value={notes.subjectName}
                onChange={(e) => handleChange("subjectName", e.target.value)}
                placeholder="Enter subject name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subjectCode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Subject Code <span className="text-red-500">*</span>
              </label>
              <InputField
                id="subjectCode"
                value={notes.subjectCode}
                onChange={(e) => handleChange("subjectCode", e.target.value)}
                placeholder="Enter subject code"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Branch <span className="text-red-500">*</span>
              </label>
              <InputField
                id="branch"
                value={notes.branch}
                onChange={(e) => handleChange("branch", e.target.value)}
                placeholder="Enter branch"
                required
              />
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Department <span className="text-red-500">*</span>
              </label>
              <InputField
                id="department"
                value={notes.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="Enter department"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Contact Number <span className="text-red-500">*</span>
            </label>
            <InputField
              id="contactNumber"
              value={notes.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              placeholder="Enter contact number"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="thumbnailPicture"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Thumbnail Picture <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="thumbnailPicture"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 dark:text-gray-300 border rounded-md"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Year <span className="text-red-500">*</span>
            </label>
            <InputField
              id="year"
              type="number"
              value={notes.year}
              onChange={(e) => handleChange("year", e.target.value)}
              placeholder="Enter year"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="semester"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Semester <span className="text-red-500">*</span>
            </label>
            <InputField
              id="semester"
              type="number"
              value={notes.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              placeholder="Enter semester"
              required
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

export default Notes;

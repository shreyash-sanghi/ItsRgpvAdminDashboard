import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import { addNotes } from "../../api/allApi/notes";
import FileUpload from "../ui/fileUpload";

const AddNotes = () => {
  const [notes, setNotes] = useState({
    subjectName: "",
    branch: "",
    subjectCode: "",
    contactNumber: "",
    thumbnailPicture: null,
    notesFile: null,
    year: null,
    department: "",
    semester: 0,
    nameOfPerson: "",
    batchOfPerson: "",
    descriptionNotes: "", // Updated field name
    hashtags: "",
    pagesNumber: 0,
    fileSize: 0,
    uploadedOnDate: new Date(), // Initialize date
  });

  // Update state for input fields
  const handleChange = (field, value) => {
    setNotes((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = (field, file) => {
    setNotes((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("formType","notes");
      Object.keys(notes).forEach((key) => {
        if (notes[key] instanceof File) {
          formData.append(key, notes[key]);
        } else {
          formData.append(key, notes[key]);
        }
      });


      const response = await addNotes(formData);
      if (response.status === 201) {
        alert("notes added")
        console.log("Notes added successfully:", response);
        setNotes({
          subjectName: "",
          branch: "",
          subjectCode: "",
          contactNumber: "",
          thumbnailPicture: null,
          notesFile: null,
          year: null,
          department: "",
          semester: 0,
          nameOfPerson: "",
          batchOfPerson: "",
          descriptionNotes: "",
          hashtags: "",
          pagesNumber: 0,
          fileSize: 0,
          uploadedOnDate: new Date(), // Reset date
        });
      } else {
        alert("error adding notes");
        console.error("Error adding notes:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Add Notes
        </h2>

        {/* Notes Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <InputField
    label="Subject Name"
    id="subjectName"
    value={notes.subjectName}
    placeholder="Enter subject name"
    onChange={(e) => handleChange("subjectName", e.target.value)}
    required
  />
  <InputField
    label="Branch"
    id="branch"
    value={notes.branch}
    placeholder="Enter branch name"
    onChange={(e) => handleChange("branch", e.target.value)}
    required
  />
  <InputField
    label="Subject Code"
    id="subjectCode"
    placeholder="Enter subject code"
    value={notes.subjectCode}
    onChange={(e) => handleChange("subjectCode", e.target.value)}
    required
  />
  <InputField
  label="Contact Number"
  id="contactNumber"
  type="number" 
  placeholder="Enter contact number"
  value={notes.contactNumber}
  onChange={(e) => handleChange("contactNumber", e.target.value)}
  required
/>
  <InputField
    label="Name of Person"
    id="nameOfPerson"
    placeholder="Enter name"
    value={notes.nameOfPerson}
    onChange={(e) => handleChange("nameOfPerson", e.target.value)}
    required
  />
  <InputField
    label="Batch of Person"
    id="batchOfPerson"
    placeholder="Enter batch"
    value={notes.batchOfPerson}
    onChange={(e) => handleChange("batchOfPerson", e.target.value)}
    required
  />
  <InputField
    label="Department"
    id="department"
    placeholder="Enter department"
    value={notes.department}
    onChange={(e) => handleChange("department", e.target.value)}
    required
  />
  <InputField
    label="Description"
    id="description"
    placeholder="Enter description"
    value={notes.descriptionNotes} 
    onChange={(e) => handleChange("descriptionNotes", e.target.value)}
    required
  />
  <InputField
    label="Hashtags (comma-separated)"
    id="hashtags"
    placeholder="Enter hashtags"
    value={notes.hashtags}
    onChange={(e) => handleChange("hashtags", e.target.value)}
    required
  />
</div>

        {/* Semester and Year Selection */}
        <div>
          <label>Semester:</label>
          <select
            id="semester"
            value={notes.semester}
            onChange={(e) => handleChange("semester", e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
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

        <div>
          <label>Year:</label>
          <select
            id="year"
            value={notes.year}
            onChange={(e) => handleChange("year", e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            required
          >

<option value="">Select semester</option>
                <option value="1">I</option>
                <option value="2">II</option>
                <option value="3">III</option>
                <option value="4">IV</option>
            
          </select>
        </div>

        {/* File Inputs */}
        <div className="mt-4">
          <label>Thumbnail Picture:</label>
          <FileUpload
            id="thumbnailPicture"
            files={notes.thumbnailPicture}
            onChange={(files) => handleFileUpload("thumbnailPicture", files)}
            accept=".jpg,.jpeg,.png"
          />
        </div>
        <div className="mt-4">
          <label>Notes File:</label>
          <FileUpload
            id="notesFile"
            files={notes.notesFile}
            onChange={(files) => handleFileUpload("notesFile", files)}
            accept="*"
          />
        </div>

        <div className="mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
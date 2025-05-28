import React, { useState, useContext, useEffect } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import { addNotes, editNotesAPI } from "../../api/allApi/notes";
import FileUpload from "../ui/fileUpload";
import Select from "../ui/select"
import { showSuccessToast, showErrorToast } from "../ui/toast";
import { UserContext } from "../../App";


const AddNotes = ({ editNotes = false, NotesData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState({
    subjectName: "",
    subjectCode: "",
    contactNumber: "",
    thumbnailPicture: null,
    notesFile: null,
    department: "",
    semester: 0,
    nameOfPerson: "",
    batchOfPerson: "",
    descriptionNotes: "", // Updated field name
    hashtags: "",
    uploadedOnDate: new Date(), // Initialize date
  });


  useEffect(() => {
    setSectionName(editNotes ? "Edit Notes" : "Add Notes");
  
    if (editNotes && NotesData) {
      const formattedDate = NotesData.createdDate?.split("T")[0] || "";
  
      setNotes({
        ...NotesData,
        createdDate: formattedDate,
        thumbnailPicture: null, // file input cannot be prefilled
        notesFile: null,
      });
    }
  }, [editNotes, NotesData, setSectionName]);

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
      setLoading(true);
      const formData = new FormData();
  
      const isEqual = (key, val1, val2) => {
        if (val1 instanceof File || val2 instanceof File) return false; // always send file if exists
        if (Array.isArray(val1) && Array.isArray(val2)) {
          return JSON.stringify(val1) === JSON.stringify(val2);
        }
        return val1 === val2;
      };
  
      if (editNotes) {
        let hasChanges = false;
  
        for (const [key, value] of Object.entries(notes)) {
          const originalValue = NotesData[key];
  
          if (key === "thumbnailPicture" && value) {
            formData.append("thumbnailPicture", value);
            hasChanges = true;
          } else if (key === "notesFile" && value) {
            formData.append("notesFile", value);
            hasChanges = true;
          } else if (!isEqual(key, value, originalValue)) {
            formData.append(key, value);
            hasChanges = true;
          }
        }
  
        if (!hasChanges) {
          showErrorToast("No changes made.");
          return;
        }
  
        formData.append("formType", "notes");
  
        await editNotesAPI(NotesData._id, formData);
        showSuccessToast("Notes edited successfully");
        setIsEditing(false);
      } else {
        for (const [key, value] of Object.entries(notes)) {
          if (value) {
            formData.append(key, value);
          }
        }
        await addNotes(formData);
        showSuccessToast("Notes added successfully");
        setNotes({
          subjectName: "",
          subjectCode: "",
          contactNumber: "",
          thumbnailPicture: null,
          notesFile: null,
          department: "",
          semester: "",
          nameOfPerson: "",
          batchOfPerson: "",
          descriptionNotes: "",
          hashtags: "",
          uploadedOnDate: new Date().toISOString().split("T")[0],
        });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      showErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl flex justify-between font-semibold text-gray-800 dark:text-gray-100 mb-6">
          <p>
            {editNotes ? "Edit Notes" : "Add Notes"}
          </p>
          {(editNotes) && (<>
            <Button onClick={() => setIsEditing(false)} label="<- Back"></Button>
          </>)}
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
            label="Subject Code"
            id="subjectCode"
            placeholder="Enter subject code"
            value={notes.subjectCode}
            onChange={(e) => handleChange("subjectCode", e.target.value)}
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
            label="Contact Number"
            id="contactNumber"
            type="number"
            placeholder="Enter contact number"
            value={notes.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
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

          {/* dropdown for dept */}

          <Select
            id="department"
            label="Department"
            placeholder="Select Department"
            value={notes.department}
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

        <Select
          id="semester"
          label="Semester"
          value={notes.semester}
          onChange={(e) => handleChange("semester", e.target.value)}
          options={[1, 2, 3, 4, 5, 6, 7, 8]}
          placeholder="Select semester"
          required
        />


        {/* File Inputs */}
        <div className="mt-4">
          <FileUpload
            label="Thumbnail Picture:"
            id="thumbnailPicture"
            files={notes.thumbnailPicture}
            onChange={(files) => handleFileUpload("thumbnailPicture", files)}
            accept=".jpg,.jpeg,.png"
          />
        </div>
        <div className="mt-4">
          <FileUpload
            label="Notes File:"
            id="notesFile"
            files={notes.notesFile}
            onChange={(files) => handleFileUpload("notesFile", files)}
            accept="*"
          />
        </div>

        <div className="mt-6">
          <Button loading={loading} type="submit" label={editNotes ? "Update" : "Submit"}  />
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
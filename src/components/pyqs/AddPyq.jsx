import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import Button from "../ui/button";
import InputField from "../ui/input";
import FileUpload from "../ui/fileUpload";
import Select from "../ui/select";
import { addPyq, editPyqAPI } from "../../api/allApi/pyq";
import { showSuccessToast, showErrorToast } from "../ui/toast";

const AddPyq = ({ editPyq = false, PyqQuestionData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [initialPyqData, setInitialPyqData] = useState({});

  const [pyqData, setPyqData] = useState({
    subjectName: "",
    subjectCode: "",
    paperPublishYear: "",
    semester: "",
    paperType: "",
    paperForYear: "",
    department: "",
    questionPaperImg: null,
    college: "",
  });

  // Setup for Edit Mode
  useEffect(() => {
    setSectionName(editPyq ? "Edit Pyq" : "Add Pyq");

    if (editPyq && PyqQuestionData) {
      const initialData = {
        subjectName: PyqQuestionData.subjectName || "",
        subjectCode: PyqQuestionData.subjectCode || "",
        paperPublishYear: PyqQuestionData.paperPublishYear || "",
        semester: PyqQuestionData.semester || "",
        paperType: PyqQuestionData.paperType || "",
        paperForYear: PyqQuestionData.paperForYear || "",
        department: PyqQuestionData.department || "",
        college: PyqQuestionData.college || "",
      };
      setPyqData({ ...initialData, questionPaperImg: null });
      setInitialPyqData(initialData);
    }
  }, [editPyq, PyqQuestionData, setSectionName]);

  // Update form fields
  const handleChange = (field, value) => {
    setPyqData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    setPyqData((prev) => ({
      ...prev,
      questionPaperImg: file,
    }));
  };

  // Form Submit Handler
  // Form Submit Handler
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const formData = new FormData();

    if (editPyq) {
      // Only append fields that have changed
      Object.entries(pyqData).forEach(([key, value]) => {
        if (key === "questionPaperImg" && value) {
          formData.append("questionPaperImg", value, value.name);
        } else if (value !== initialPyqData[key]) {
          formData.append(key, value);
        }
      });

      formData.append("formType", "pyq");
      formData.append("_id", PyqQuestionData._id); // ✅ important: send _id for edit

      const response = await editPyqAPI(PyqQuestionData._id, formData); // ✅ call correct API
      if (response.status === 200) {
        showSuccessToast("PYQ updated successfully.");
        if (setIsEditing) setIsEditing(false);
      } else {
        showErrorToast("Failed to update PYQ.");
      }
    } else {
      // Add mode: append all fields
      Object.entries(pyqData).forEach(([key, value]) => {
        if (key === "questionPaperImg" && value) {
          formData.append("questionPaperImg", value, value.name);
        } else {
          formData.append(key, value);
        }
      });

      formData.append("formType", "pyq");

      const response = await addPyq(formData); // ✅ call correct API
      if (response.status === 201) {
        showSuccessToast("PYQ added successfully.");
        setPyqData({
          subjectName: "",
          subjectCode: "",
          paperPublishYear: "",
          semester: "",
          paperType: "",
          paperForYear: "",
          department: "",
          questionPaperImg: null,
          college: "",
        });
      } else {
        showErrorToast("Failed to add PYQ.");
      }
    }
  } catch (error) {
    console.error("Submission Error:", error);
    showErrorToast("Error submitting PYQ.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {editPyq ? "Edit PYQ" : "Add PYQ"}
          </h2>
          {editPyq && (
            <Button onClick={() => setIsEditing(false)} label="← Back" />
          )}
        </div>

        <InputField
          id="subjectName"
          label="Subject Name"
          value={pyqData.subjectName}
          onChange={(e) => handleChange("subjectName", e.target.value)}
          placeholder="Enter subject name"
          required
        />

        <InputField
          id="subjectCode"
          label="Subject Code"
          value={pyqData.subjectCode}
          onChange={(e) => handleChange("subjectCode", e.target.value)}
          placeholder="Enter subject code"
          required
        />

        <InputField
          id="paperPublishYear"
          label="Publish Year"
          type="number"
          value={pyqData.paperPublishYear}
          onChange={(e) => handleChange("paperPublishYear", e.target.value)}
          placeholder="e.g., 2023"
          required
        />

        <Select
          id="paperForYear"
          label="Paper For Year"
          value={pyqData.paperForYear}
          onChange={(e) => handleChange("paperForYear", e.target.value)}
          placeholder="Select Year"
          options={[1, 2, 3, 4]}
          required
        />

        <Select
          id="department"
          label="Department"
          value={pyqData.department}
          onChange={(e) => handleChange("department", e.target.value)}
          placeholder="Select Department"
          options={[
            "Computer Science",
            "Information Technology",
            "Electronics",
            "Mechanical",
            "Civil",
            "Electrical and Electronics",
            "Petrochemical",
            "Automobile",
          ]}
          required
        />

        <Select
          id="paperType"
          label="Paper Type"
          value={pyqData.paperType}
          onChange={(e) => handleChange("paperType", e.target.value)}
          placeholder="Select Paper Type"
          options={["assignment", "midsem", "endsem", "back"]}
          required
        />

        <Select
          id="semester"
          label="Semester"
          value={pyqData.semester}
          onChange={(e) => handleChange("semester", e.target.value)}
          placeholder="Select Semester"
          options={[1, 2, 3, 4, 5, 6, 7, 8]}
          required
        />

        <Select
          id="college"
          label="College"
          value={pyqData.college}
          onChange={(e) => handleChange("college", e.target.value)}
          placeholder="Select College"
          options={["UIT", "SOIT"]}
          required
        />

        <FileUpload
          id="questionPaperImg"
          label="Upload Question Paper"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
        />
        <p className="text-sm text-gray-500 mt-2">
          Upload as JPG, PNG, or PDF (max size: 5MB).
        </p>

        <Button type="submit" label={editPyq ? "Update" : "Submit"} loading={loading} />
      </form>
    </div>
  );
};

export default AddPyq;
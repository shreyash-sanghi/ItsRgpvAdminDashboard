import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import FileUpload from "../ui/fileUpload";
import { addPyq } from "../../api/allApi/pyq";

const AddPyq = () => {
  const [pyqData, setPyqData] = useState({
    subjectName: "",
    subjectCode: "",
    paperPublishYear: 0,
    semester: 1,
    paperType: "",
    paperForYear: 0,
    department: "",
    questionPaperImg: null,
    college: "",
  });

  const handleChange = (field, value) => {
    setPyqData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (file) => {
    setPyqData((prev) => ({
      ...prev,
      questionPaperImg: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("subjectName", pyqData.subjectName);
      formData.append("subjectCode", pyqData.subjectCode);
      formData.append("paperPublishYear", pyqData.paperPublishYear);
      formData.append("semester", pyqData.semester);
      formData.append("paperType", pyqData.paperType);
      formData.append("paperForYear", pyqData.paperForYear);
      formData.append("department", pyqData.department);
      formData.append("college", pyqData.college);
      formData.append("formType", "pyq");

      if (pyqData.questionPaperImg) {
        formData.append("questionPaperImg", pyqData.questionPaperImg, pyqData.questionPaperImg.name);
      }

      const response = await addPyq(formData);
      if (response.status === 201) {
        alert("PYQ added successfully")
        console.log("PYQ added successfully:", response);
        setPyqData({
          subjectName: "",
          subjectCode: "",
          paperPublishYear: 0,
          semester: 1,
          paperType: "",
          paperForYear: 0,
          department: "",
          questionPaperImg: null,
          college: "",
        });
      } else {
        console.error("Error adding PYQ:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Add Previous Year Question Paper
        </h2>

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
  type="Number"  // Keep it as text to handle numeric input restrictions easily
  maxLength="4"  // Limit input length to 4 characters
  value={pyqData.paperPublishYear}
  onChange={(e) => handleChange("paperPublishYear", e.target.value)}
  onKeyPress={(e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault(); // Prevent non-numeric input
    }
  }}
  placeholder="Enter publish year"

  required
/>
<div>
  <label
    htmlFor="paperForYear"
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  >
    Paper For Year <span className="text-red-500">*</span>
  </label>
  <select
    id="paperForYear"
    value={pyqData.paperForYear}
    onChange={(e) => handleChange("paperForYear", e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    required
  >
    <option value="">Select year</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
</div>
        <InputField
          id="department"
          label="Department"
          value={pyqData.department}
          onChange={(e) => handleChange("department", e.target.value)}
          placeholder="Enter department"
          required
        />

        {/* Paper Type Dropdown */}
        <label htmlFor="paperType" className="block text-gray-700 dark:text-gray-200">Paper Type</label>
        <select
          id="paperType"
          value={pyqData.paperType}
          onChange={(e) => handleChange("paperType", e.target.value)}
          required
          className="block w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100"
        >
          <option value="">Select Paper Type</option>
          <option value="assignment">Assignment</option>
          <option value="midsem">Midsem</option>
          <option value="endsem">Endsem</option>
          <option value="back">Back</option>
        </select>

        {/* Semester Dropdown */}
        <label htmlFor="semester" className="block text-gray-700 dark:text-gray-200">Semester</label>
        <select
          id="semester"
          value={pyqData.semester}
          onChange={(e) => handleChange("semester", Number(e.target.value))}
          required
          className="block w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100"
        >
          <option value="">Select semester</option>
          <option value={1}>I</option>
          <option value={2}>II</option>
          <option value={3}>III</option>
          <option value={4}>IV</option>
          <option value={5}>V</option>
          <option value={6}>VI</option>
          <option value={7}>VII</option>
          <option value={8}>VIII</option>
        </select>

        {/* College Dropdown */}
        <label htmlFor="college" className="block text-gray-700 dark:text-gray-200">College</label>
        <select
          id="college"
          value={pyqData.college}
          onChange={(e) => handleChange("college", e.target.value)}
          required
          className="block w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100"
        >
          <option value="">Select College</option>
          <option value="UIT">UIT</option>
          <option value="SOIT">SOIT</option>
        </select>

        {/* File Upload */}
        <label htmlFor="questionPaperImg" className="block text-gray-700 dark:text-gray-200">Upload Question Paper</label>
        <FileUpload
          id="questionPaperImg"
          onChange={(file) => handleFileUpload(file)}
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <p className="text-sm text-gray-500 mt-2">
          Upload the question paper (JPG, PNG, PDF).
        </p>

        <Button label="Submit" />
      </form>
    </div>
  );
};

export default AddPyq;
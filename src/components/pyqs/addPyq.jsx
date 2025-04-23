
import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import FileUpload from "../ui/fileUpload";
import TextArea from "../ui/textarea";
import { addPyq } from "../../api/api";

const AddPyq = () => {
  const [pyqData, setPyqData] = useState({
    subjectName: "",
    paperPublishYear: 0,
    semester: "",
    paperType: "",
    paperForYear: "",
    department: "",
    questionPaperImg: [],
    college: "",
  });

  const handleChange = (field, value) => {
    setPyqData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    setPyqData((prev) => ({
      ...prev,
      questionPaperImg: [...prev.questionPaperImg, ...fileArray],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("PYQ Data Submitted:", pyqData);

    const response = await addPyq(pyqData);
    if (response.status === 200) {
      console.log("PYQ Data:", response);
    } else {
      console.log("Error:", response);
    }

    // Reset form after submission
    // setPyqData({
    //   subjectName: "",
    //   paperPublishYear: 0,
    //   semester: "",
    //   paperType: "",
    //   paperForYear: "",
    //   department: "",
    //   questionPaperImg: [],
    //   college: "",
    // });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Previous Year Question Paper 
        </h2>

        {/* General Information Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            General Information
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
                value={pyqData.subjectName}
                onChange={(e) => handleChange("subjectName", e.target.value)}
                placeholder="Enter subject name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="paperPublishYear"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Paper Publish Year <span className="text-red-500">*</span>
              </label>
              <InputField
                id="paperPublishYear"
                type="number"
                value={pyqData.paperPublishYear}
                onChange={(e) => handleChange("paperPublishYear", e.target.value)}
                placeholder="Enter publish year"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="semester"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Semester <span className="text-red-500">*</span>
              </label>
              <InputField
                id="semester"
                value={pyqData.semester}
                onChange={(e) => handleChange("semester", e.target.value)}
                placeholder="Enter semester"
                required
              />
            </div>
            <div>
              <label
                htmlFor="paperType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Paper Type <span className="text-red-500">*</span>
              </label>
              <InputField
                id="paperType"
                value={pyqData.paperType}
                onChange={(e) => handleChange("paperType", e.target.value)}
                placeholder="Enter paper type (e.g., Midterm, Final)"
                required
              />
            </div>
          </div>
        </section>

        {/* Paper Details Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Paper Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="paperForYear"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Paper For Year <span className="text-red-500">*</span>
              </label>
              <InputField
                id="paperForYear"
                value={pyqData.paperForYear}
                onChange={(e) => handleChange("paperForYear", e.target.value)}
                placeholder="Enter the year the paper is for"
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
                value={pyqData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="Enter department"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="college"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              College <span className="text-red-500">*</span>
            </label>
            <InputField
              id="college"
              value={pyqData.college}
              onChange={(e) => handleChange("college", e.target.value)}
              placeholder="Enter college name"
              required
            />
          </div>
        </section>

        {/* Question Paper Upload Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Upload Question Papers
          </h3>
          <div>
            <label
              htmlFor="questionPaperImg"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Question Paper Images <span className="text-red-500">*</span>
            </label>
            <FileUpload
              id="questionPaperImg"
              onChange={(e) => handleFileUpload(e.target.files)}
              multiple
              accept="image/*"
            />
            <p className="text-sm text-gray-500 mt-2">
              Upload images of the question paper (Supported formats: JPEG, PNG).
            </p>
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

export default AddPyq;

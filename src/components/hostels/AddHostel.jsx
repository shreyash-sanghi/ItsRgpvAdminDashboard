import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addHostel } from "../../api/allApi/hostel";
import FileUpload from "../ui/fileUpload";

const AddHostel = () => {
  const [hostel, setHostel] = useState({
    hostelName: "",
    hostelMessCharges: 0,
    hostelWardenName: "",
    totalStudentsInHostel: 0,
    hostelPictures: [],     
    hostelEvents: [""],
    hostelFacilities: [""],
    hostelWardenContactNumber: [],
    hostelRating: 0,
    roomsInHostel: 0,
    messRating: 0,
    hostelFeesPerSemester: 0,
  });


  const handleChange = (field, value) => {
    setHostel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (files) => {
    setHostel((prev) => ({
      ...prev,
      hostelPictures: [...prev.hostelPictures, ...Array.from(files)],  // Append new files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Basic Fields
    formData.append("hostelName", hostel.hostelName);
    formData.append("hostelWardenName", hostel.hostelWardenName);
    formData.append("hostelMessCharges", hostel.hostelMessCharges);
    formData.append("hostelFeesPerSemester", hostel.hostelFeesPerSemester);
    formData.append("totalStudentsInHostel", hostel.totalStudentsInHostel);
    formData.append("roomsInHostel", hostel.roomsInHostel);
    formData.append("hostelRating", hostel.hostelRating);
    formData.append("messRating", hostel.messRating);
  
    // Handle Array Fields Properly
    hostel.hostelEvents.forEach((event, index) => {
      formData.append(`hostelEvents[${index}]`, event);
    });
  
    hostel.hostelFacilities.forEach((facility, index) => {
      formData.append(`hostelFacilities[${index}]`, facility);
    });
  
    hostel.hostelWardenContactNumber.forEach((number, index) => {
      formData.append(`hostelWardenContactNumber[${index}]`, number);
    });
  
    // Handle File Uploads
    hostel.hostelPictures.forEach((file) => {
      if (file instanceof File) {
        formData.append("hostelPictures", file); // Append each file
      }
    });
  
    try {
      const response = await addHostel(formData);
      console.log(response);
  
      if (response.status === 201) {
        alert("Hostel Added Successfully..");
        // Corrected State Reset
        setHostel({
          hostelName: "",
          hostelMessCharges: 0,
          hostelWardenName: "",
          totalStudentsInHostel: 0,
          hostelPictures: [],
          hostelEvents: [""],
          hostelFacilities: [""],
          hostelWardenContactNumber: [],
          hostelRating: 0,
          roomsInHostel: 0,
          messRating: 0,
          hostelFeesPerSemester: 0,
        });
      } else {
        alert("Error adding hostel.");
      }
    } catch (error) {
      console.error("Error adding hostel:", error);
      alert("An error occurred while adding hostel.");
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Hostel Information
        </h2>

        {/* Hostel Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Hostel Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="hostelName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Hostel Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="hostelName"
                value={hostel.hostelName}
                onChange={(e) => handleChange("hostelName", e.target.value)}
                placeholder="Enter hostel name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hostelWardenName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Warden Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="hostelWardenName"
                value={hostel.hostelWardenName}
                onChange={(e) => handleChange("hostelWardenName", e.target.value)}
                placeholder="Enter warden name"
                required
              />
            </div>

            <div>
                            <label htmlFor="hostelWardenContactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Contact Number (comma-separated)
                            </label>
                            <InputField
                                id="hostelWardenContactNumber"
                                value={hostel.hostelWardenContactNumber.join(", ")}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9,]/g, ""); // Allow only numbers and commas
                                    handleChange("hostelWardenContactNumber", value.split(",").map((num) => num.trim()));
                                }}
                                placeholder="Enter phone numbers"
                            />
                        </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="hostelMessCharges"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mess Charges (per month) <span className="text-red-500">*</span>
              </label>
              <InputField
                id="hostelMessCharges"
                type="number"
                value={hostel.hostelMessCharges}
                onChange={(e) => handleChange("hostelMessCharges", Number(e.target.value))}
                placeholder="Enter mess charges"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hostelFeesPerSemester"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Fees (per semester) <span className="text-red-500">*</span>
              </label>
              <InputField
                id="hostelFeesPerSemester"
                type="number"
                value={hostel.hostelFeesPerSemester}
                onChange={(e) =>
                  handleChange("hostelFeesPerSemester", Number(e.target.value))
                }
                placeholder="Enter hostel fees"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="totalStudentsInHostel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Total Students <span className="text-red-500">*</span>
              </label>
              <InputField
                id="totalStudentsInHostel"
                type="number"
                value={hostel.totalStudentsInHostel}
                onChange={(e) =>
                  handleChange("totalStudentsInHostel", Number(e.target.value))
                }
                placeholder="Enter total students"
                required
              />
            </div>
            <div>
              <label
                htmlFor="roomsInHostel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Total Rooms <span className="text-red-500">*</span>
              </label>
              <InputField
                id="roomsInHostel"
                type="number"
                value={hostel.roomsInHostel}
                onChange={(e) => handleChange("roomsInHostel", Number(e.target.value))}
                placeholder="Enter total rooms"
                required
              />
            </div>
          </div>
        </section>

        {/* Media Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Media & Ratings
          </h3>
          <div>
            <label
              htmlFor="hostelPictures"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Hostel Pictures
            </label>
            <FileUpload
                        id="hostelPictures"
                        multiple={true}  // Enable multiple uploads
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="hostelRating"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Hostel Rating
              </label>
              <InputField
                id="hostelRating"
                type="number"
                value={hostel.hostelRating}
                onChange={(e) => handleChange("hostelRating", Number(e.target.value))}
                placeholder="Enter rating (out of 5)"
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            <div>
              <label
                htmlFor="messRating"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mess Rating
              </label>
              <InputField
                id="messRating"
                type="number"
                value={hostel.messRating}
                onChange={(e) => handleChange("messRating", Number(e.target.value))}
                placeholder="Enter mess rating (out of 5)"
                step="0.1"
                min="0"
                max="5"
              />
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Facilities
          </h3>
          <div>
            <label
              htmlFor="hostelFacilities"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Hostel Facilities
            </label>
            <InputField
              id="hostelFacilities"
              value={hostel.hostelFacilities.join(", ")}
              onChange={(e) =>
                handleChange(
                  "hostelFacilities",
                  e.target.value.split(",").map((facility) => facility.trim())
                )
              }
              placeholder="Enter facilities (comma-separated)"
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

export default AddHostel; 
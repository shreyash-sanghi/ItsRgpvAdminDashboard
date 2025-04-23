import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addHostelInfo } from "../../api/api";

const HostelInfo = () => {
  const [hostel, setHostel] = useState({
    hostelName: "",
    hostelMessCharges: 0,
    hostelWardenName: "",
    totalStudentsInHostel: 0,
    hostelPictures: [],
    hostelEvents: [""],
    hostelFacilities: [""],
    hostelRating: null,
    roomsInHostel: 0,
    messRating: null,
    hostelFeesPerSemester: 0,
  });

  const handleChange = (field, value) => {
    setHostel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setHostel((prev) => ({
      ...prev,
      hostelPictures: files,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Hostel Data:", hostel);

    const response = await addHostelInfo(hostel);
    if (response.status === 200) {
      console.log("Hostel Data:", response);
    } else {
      console.log("Error:", response);
    }

    // Reset form after submission
    // setHostel({
    //   hostelName: "",
    //   hostelMessCharges: 0,
    //   hostelWardenName: "",
    //   totalStudentsInHostel: 0,
    //   hostelPictures: [],
    //   hostelEvents: [""],
    //   hostelFacilities: [""],
    //   hostelRating: null,
    //   roomsInHostel: 0,
    //   messRating: null,
    //   hostelFeesPerSemester: 0,
    // });
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
            <input
              type="file"
              id="hostelPictures"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
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
              />
            </div>
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

export default HostelInfo;

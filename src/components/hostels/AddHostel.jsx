import React, { useState, useEffect, useContext } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addHostel, editHostelAPI } from "../../api/allApi/hostel";
import FileUpload from "../ui/fileUpload";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import { UserContext } from "../../App";

const AddHostel = ({editHostel = false, HostelData = {}, setIsEditing}) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setSectionName(editHostel ? "Edit Hostel" : "Add Hostel");
  
    if (editHostel && HostelData) {
      setHostel({
        hostelName: HostelData.hostelName || "",
        hostelMessCharges: HostelData.hostelMessCharges || 0,
        hostelWardenName: HostelData.hostelWardenName || "",
        totalStudentsInHostel: HostelData.totalStudentsInHostel || 0,
        hostelPictures: HostelData.hostelPictures || [],
        hostelEvents: HostelData.hostelEvents?.length ? HostelData.hostelEvents : [""],
        hostelFacilities: HostelData.hostelFacilities?.length ? HostelData.hostelFacilities : [""],
        hostelWardenContactNumber: HostelData.hostelWardenContactNumber || [],
        hostelRating: HostelData.hostelRating || 0,
        roomsInHostel: HostelData.roomsInHostel || 0,
        messRating: HostelData.messRating || 0,
        hostelFeesPerSemester: HostelData.hostelFeesPerSemester || 0,
      });
    }
  }, [editHostel, HostelData, setSectionName]);


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
    setLoading(true);
  
    try {
      const formData = new FormData();
  
      // Append primitive fields
      formData.append("hostelName", hostel.hostelName);
      formData.append("hostelWardenName", hostel.hostelWardenName);
      formData.append("hostelMessCharges", hostel.hostelMessCharges);
      formData.append("hostelFeesPerSemester", hostel.hostelFeesPerSemester);
      formData.append("totalStudentsInHostel", hostel.totalStudentsInHostel);
      formData.append("roomsInHostel", hostel.roomsInHostel);
      formData.append("hostelRating", hostel.hostelRating);
      formData.append("messRating", hostel.messRating);
  
      // Append array fields
      hostel.hostelEvents.forEach((event, index) =>
        formData.append(`hostelEvents[${index}]`, event)
      );
      hostel.hostelFacilities.forEach((facility, index) =>
        formData.append(`hostelFacilities[${index}]`, facility)
      );
      hostel.hostelWardenContactNumber.forEach((number, index) =>
        formData.append(`hostelWardenContactNumber[${index}]`, number)
      );
  
      // Append images
      hostel.hostelPictures.forEach((file) => {
        if (file instanceof File) {
          formData.append("hostelPictures", file);
        }
      });
  
      if (editHostel) {
        await editHostelAPI(HostelData._id, formData);
        showSuccessToast("Hostel updated successfully");
        setIsEditing(false);
      } else {
        const response = await addHostel(formData);
        if (response.status === 201) {
          showSuccessToast("Hostel added successfully");
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
          showErrorToast("Error while adding hostel");
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
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
            {editHostel ? "Edit Hostel" : "Add Hostel"}
          </p>
          {(editHostel) && (<>
            <Button onClick={() => setIsEditing(false)} label="<- Back"></Button>
          </>)}
        </h2>

        {/* Hostel Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Hostel Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              
              <InputField
                label="Hostel Name"
                id="hostelName"
                value={hostel.hostelName}
                onChange={(e) => handleChange("hostelName", e.target.value)}
                placeholder="Enter hostel name"
                required
              />
            </div>
            <div>
              <InputField
                label="Warden Name"
                id="hostelWardenName"
                value={hostel.hostelWardenName}
                onChange={(e) => handleChange("hostelWardenName", e.target.value)}
                placeholder="Enter warden name"
                required
              />
            </div>

            <div>
              <InputField
              label="Contact Number (comma-separated)"
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
              
              <InputField
              label="Mess Charges (per month)"
                id="hostelMessCharges"
                type="number"
                value={hostel.hostelMessCharges}
                onChange={(e) => handleChange("hostelMessCharges", e.target.value)}
                placeholder="Enter mess charges"
                required
              />
            </div>
            <div>
              
              <InputField
              label="Fees (per semester)"
                id="hostelFeesPerSemester"
                type="number"
                value={hostel.hostelFeesPerSemester}
                onChange={(e) =>
                  handleChange("hostelFeesPerSemester", e.target.value)
                }
                placeholder="Enter hostel fees"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
             
              <InputField
              label="Total Students"
                id="totalStudentsInHostel"
                type="number"
                value={hostel.totalStudentsInHostel}
                onChange={(e) =>
                  handleChange("totalStudentsInHostel", (e.target.value))
                }
                placeholder="Enter total students"
                required
              />
            </div>
            <div>
             
              <InputField
              label="Total Rooms"
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
            <FileUpload
            label="Hostel Pictures"
              id="hostelPictures"
              multiple={true}  // Enable multiple uploads
              onChange={handleFileUpload}
              accept="image/*"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <InputField
              label="Hostel Rating"
                id="hostelRating"
                type="number"
                value={hostel.hostelRating}
                onChange={(e) => handleChange("hostelRating", (e.target.value))}
                placeholder="Enter rating (out of 5)"
                step="1"
                min="0"
                max="5"
              />
            </div>
            <div>
             
              <InputField
              label="Mess Rating"
                id="messRating"
                type="number"
                value={hostel.messRating}
                onChange={(e) => handleChange("messRating", (e.target.value))}
                placeholder="Enter mess rating (out of 5)"
                step="1"
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
            <InputField
            label="Hostel Facilities"
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
          <Button loading={loading} type="submit"  label={editHostel ? "Update" : "Submit"} />
        </div>
      </form>
    </div>
  );
};

export default AddHostel; 
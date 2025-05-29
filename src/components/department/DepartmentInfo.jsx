import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import FileUpload from "../../components/ui/fileUpload";
import { addDepartment, editDepartmentAPI } from "../../api/allApi/department";
import Select from "../ui/select";
import { showSuccessToast, showErrorToast } from "../ui/toast";
import { UserContext } from "../../App";

const DepartmentInfo = ({ editDepartmentInfo = false, DepartmentInfoData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState({
    departmentName: "",
    descriptionOfDepartment: "",
    headOfDepartment: "",
    totalSeats: 0,
    yearOfEstablishment: 0,
    contactEmail: "",
    departmentImages: [],
    contactPhone: 0,
  });

  useEffect(() => {
    setSectionName(editDepartmentInfo ? "Edit Department Info" : "Add Department");

    if (editDepartmentInfo && DepartmentInfoData) {
      setDepartment({
        ...DepartmentInfoData,
        departmentImages: [], // Clear old images to avoid file object issues
      });
    }
  }, [editDepartmentInfo, DepartmentInfoData, setSectionName]);

  const handleChange = (field, value) => {
    setDepartment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (files) => {
    setDepartment((prev) => ({
      ...prev,
      departmentImages: [...prev.departmentImages, ...Array.from(files)],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const formData = new FormData();

        const isEqual = (val1, val2) => {
            if (Array.isArray(val1) && Array.isArray(val2)) {
                return JSON.stringify(val1) === JSON.stringify(val2);
            }
            return val1 === val2;
        };

        if (editDepartmentInfo) {
            // Only append fields that have changed
            for (const [key, value] of Object.entries(department)) {
                const originalValue = DepartmentInfoData[key];

                if (key === "departmentImages") {
                    if (value?.length) {
                        value.forEach((file, i) => {
                            if (file instanceof File) {
                                formData.append("departmentImages", file);
                            }
                        });
                    }
                } else if (!isEqual(value, originalValue)) {
                    formData.append(key, value);
                }
            }

            if ([...formData.entries()].length === 0) {
                showErrorToast("No changes detected.");
                return;
            }

            await editDepartmentAPI(DepartmentInfoData._id, formData);
            showSuccessToast("Department updated successfully");
            setIsEditing(false);
        } else {
            // For new departments, send everything
            for (const [key, value] of Object.entries(department)) {
                if (key === "departmentImages" && value?.length) {
                    value.forEach((file) => formData.append("departmentImages", file));
                } else {
                    formData.append(key, value);
                }
            }

            formData.append("formType", "department");

            await addDepartment(formData);
            showSuccessToast("Department added successfully");
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
          <p>{editDepartmentInfo ? "Edit Department Info" : "Add Department"}</p>
          {editDepartmentInfo && (
            <Button onClick={() => setIsEditing(false)} label="<- Back" />
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            id="department"
            label="Department Name"
            value={department.departmentName}
            onChange={(e) => handleChange("departmentName", e.target.value)}
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
            placeholder="Select Department"
            required
          />
          <InputField
            id="headOfDepartment"
            label="Head of Department"
            value={department.headOfDepartment}
            onChange={(e) => handleChange("headOfDepartment", e.target.value)}
            placeholder="Enter head of department name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="totalSeats"
            type="number"
            label="Total Seats"
            value={department.totalSeats || ""}
            onChange={(e) => handleChange("totalSeats", e.target.value)}
            placeholder="Enter total number of seats"
            required
          />
          <InputField
            id="yearOfEstablishment"
            label="Year of Establishment"
            type="number"
            value={department.yearOfEstablishment || ""}
            onChange={(e) => handleChange("yearOfEstablishment", e.target.value)}
            placeholder="Enter year of establishment"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="contactEmail"
            label="Contact Email"
            type="email"
            value={department.contactEmail}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
            placeholder="Enter contact email"
            required
          />
          <InputField
            id="contactPhone"
            label="Contact Phone"
            type="number"
            value={department.contactPhone || ""}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
            placeholder="Enter contact phone number"
            required
          />
        </div>

        <FileUpload
          id="departmentImages"
          label="Department Image"
          multiple={true}
          onChange={handleFileUpload}
          accept="image/*"
        />

        <InputField
          label="Description of Department"
          id="descriptionOfDepartment"
          value={department.descriptionOfDepartment}
          onChange={(e) => handleChange("descriptionOfDepartment", e.target.value)}
          placeholder="Enter description of department"
          required
        />

        <div className="text-center mt-6">
          <Button type="submit" loading={loading} label={editDepartmentInfo ? "Update" : "Submit"} />
        </div>
      </form>
    </div>
  );
};

export default DepartmentInfo;
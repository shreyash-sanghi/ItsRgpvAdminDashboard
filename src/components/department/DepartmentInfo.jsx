import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import FileUpload from "../../components/ui/fileUpload";
import { addDepartment } from "../../api/allApi/department";


const DepartmentInfo = () => {

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

    const handleChange = (field, value) => {
        setDepartment((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle file upload
const handleFileUpload = (files) => {
    setDepartment((prev) => ({
        ...prev,
        departmentImages: [...prev.departmentImages, ...Array.from(files)], // Append new files
    }));
};

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("departmentName", department.departmentName);
        formData.append("descriptionOfDepartment", department.descriptionOfDepartment);
        formData.append("headOfDepartment", department.headOfDepartment);
        formData.append("totalSeats", department.totalSeats);
        formData.append("yearOfEstablishment", department.yearOfEstablishment);
        formData.append("contactEmail", department.contactEmail);
        formData.append("contactPhone", department.contactPhone);
        formData.append("formType", "department");
    
        // Corrected way to append multiple files
        department.departmentImages.forEach((file) => {
            formData.append("departmentImages", file); // Same key for all files
        });
    
        try {
            const response = await addDepartment(formData);
    
            // Log the full response to check what you're getting
            console.log("API Response:", response);
    
            if (response.status === 201) {
                alert("Department added successfully!");
                // Reset form after successful submission
                setDepartment({
                    departmentName: "",
                    descriptionOfDepartment: "",
                    headOfDepartment: "",
                    totalSeats: null,
                    yearOfEstablishment: null,
                    contactEmail: "",
                    departmentImages: [],
                    contactPhone: null,
                });
            } else {
                alert("Error adding department.");
            }
        } catch (error) {
            console.error("Error adding department:", error);
            alert("An error occurred while adding department.");
        }
    };

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Department Information Form</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Department Name <span className="text-red-500">*</span>
                        </label>
                        <InputField
                            id="departmentName"
                            value={department.departmentName}
                            onChange={(e) => handleChange("departmentName", e.target.value)}
                            placeholder="Enter department name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Head of Department <span className="text-red-500">*</span>
                        </label>
                        <InputField
                            id="headOfDepartment"
                            value={department.headOfDepartment}
                            onChange={(e) => handleChange("headOfDepartment", e.target.value)}
                            placeholder="Enter head of department name"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Total Seats <span className="text-red-500">*</span>
                        </label>
                        <InputField
                            id="totalSeats"
                            type="number"
                            value={department.totalSeats || ""}
                            onChange={(e) => handleChange("totalSeats", e.target.value)}
                            placeholder="Enter total number of seats"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="yearOfEstablishment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Year of Establishment <span className="text-red-500">*</span>
                        </label>
                        <InputField
                            id="yearOfEstablishment"
                            type="number"
                            value={department.yearOfEstablishment || ""}
                            onChange={(e) => handleChange("yearOfEstablishment", e.target.value)}
                            placeholder="Enter year of establishment"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contact Email <span className="text-red-500">*</span>
                        </label>
                        <InputField
                            id="contactEmail"
                            type="email"
                            value={department.contactEmail}
                            onChange={(e) => handleChange("contactEmail", e.target.value)}
                            placeholder="Enter contact email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contact Phone <span className="text-red-500">*</span>
                        </label>
                        <InputField
                            id="contactPhone"
                            type="number"
                            value={department.contactPhone || ""}
                            onChange={(e) => handleChange("contactPhone", e.target.value)}
                            placeholder="Enter contact phone number"
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor="departmentImages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    </label>
                    <FileUpload
                        id="departmentImages"
                        multiple={true}  // Enable multiple uploads
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="descriptionOfDepartment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description of Department <span className="text-red-500">*</span>
                    </label>
                    <InputField
                        id="descriptionOfDepartment"
                        value={department.descriptionOfDepartment}
                        onChange={(e) => handleChange("descriptionOfDepartment", e.target.value)}
                        placeholder="Enter description of department"
                        required
                    />
                </div>

                <div className="text-center mt-6">
                    <Button label="Submit" />
                </div>
            </form>
        </div>
    );
};

export default DepartmentInfo;


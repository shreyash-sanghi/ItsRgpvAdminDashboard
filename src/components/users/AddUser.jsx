import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addUser } from "../../api/api";

const AddUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dateOfBirth: null,
    profilePicture: null,
    role: [],
    enrollmentNumber: "",
    department: "",
    passoutYear: 0,
    semester: 0,
  });

  const handleChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({
        ...prev,
        profilePicture: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        if (key === 'role') {
          formData.append(key, JSON.stringify(user[key]));
        } else if (key === 'profilePicture' && user[key]) {
          formData.append(key, user[key]);
        } else {
          formData.append(key, user[key]);
        }
      });

      const response = await addUser(formData);
      if (response.status === 200) {
        console.log("User added successfully:", response);
        // Reset form
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          dateOfBirth: null,
          profilePicture: null,
          role: [],
          enrollmentNumber: "",
          department: "",
          passoutYear: 0,
          semester: 0,
        });
      } else {
        console.error("Error adding user:", response);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">User Information</h2>

        {/* User Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="firstName"
                value={user.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="lastName"
                value={user.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <InputField
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <InputField
                id="contactNumber"
                value={user.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                placeholder="Enter contact number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={user.dateOfBirth || ""}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
            </div>
          </div>
        </section>

        {/* Additional Details Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <InputField
                id="role"
                value={user.role.join(", ")}
                onChange={(e) => handleChange("role", e.target.value.split(",").map((r) => r.trim()))}
                placeholder="Enter roles (comma-separated)"
              />
            </div>
            <div>
              <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enrollment Number
              </label>
              <InputField
                id="enrollmentNumber"
                value={user.enrollmentNumber}
                onChange={(e) => handleChange("enrollmentNumber", e.target.value)}
                placeholder="Enter enrollment number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <InputField
                id="department"
                value={user.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="Enter department"
              />
            </div>
            <div>
              <label htmlFor="passoutYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Passout Year
              </label>
              <InputField
                id="passoutYear"
                type="number"
                value={user.passoutYear}
                onChange={(e) => handleChange("passoutYear", e.target.value)}
                placeholder="Enter passout year"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Semester
            </label>
            <select
              id="semester"
              value={user.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select semester</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
            </select>
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

export default AddUser; 
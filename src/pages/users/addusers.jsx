import React, { useState,useEffect } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import TextArea from "../../components/ui/textarea";
import { addUser } from "../../api/api";
import { UserContext } from "../../App";
import { useContext } from "react";

const AddUsers = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Add Users");
  },[])

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dateOfBirth: null,
    profilePicture: null, // Change this to null instead of an empty string
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
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setUser((prev) => ({
        ...prev,
        profilePicture: file, // Store the file object
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("User Data:", user);

    const response = await addUser(user);
    if (response.status === 200) {
      console.log("User Data:", response);
    }
    else {  
      console.log("Error:", response);
    }

    // Reset form after submission
    // setUser({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   contactNumber: "",
    //   dateOfBirth: null,
    //   profilePicture: null, // Reset to null
    //   role: [],
    //   enrollmentNumber: "",
    //   department: "",
    //   passoutYear: 0,
    //   semester: 0,
    // });
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
              <InputField
                id="dateOfBirth"
                type="date"
                value={user.dateOfBirth || ""}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                type="file"
                onChange={handleFileChange} // Use the file input handler
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
            <InputField
              id="semester"
              type="number"
              value={user.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              placeholder="Enter semester"
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

export default AddUsers;

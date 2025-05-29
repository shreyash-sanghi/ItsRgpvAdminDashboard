import { useEffect, useState, useContext } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import Select from "../ui/select";
import { UserContext } from "../../App";
import { addAchievement, editAchievementAPI } from "../../api/allApi/achivement.js";
import FileUpload from "../ui/fileUpload.jsx";
import { showSuccessToast, showErrorToast } from "../ui/toast.jsx";

const AddAchievement = ({ editAchievement = false, AchievementData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [achievement, setAchievement] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Year: "",
    achievementDate: "",
    branch: "",
    fieldOfAchievement: [""],
    enrollmentNumber: "",
    department: "",
    achievementTitle: "",
    semester: "",
    achievementDescription: "",
    recognitionLevel: "",
    awards: "",
    photos: "",
    socialMediaLinks: [""],
    mentor: [""]
  });

  const [tempLinks, setTempLinks] = useState("");

  useEffect(() => {
    setSectionName(editAchievement ? "Edit Achievement" : "Add Achievement");

    if (editAchievement && AchievementData) {
      const isoDate = AchievementData.achievementDate;
      const formattedDate = isoDate ? isoDate.split("T")[0] : "";

      setAchievement({
        ...AchievementData,
        achievementDate: formattedDate,
        fieldOfAchievement: AchievementData.fieldOfAchievement?.length
          ? AchievementData.fieldOfAchievement
          : [""],
        socialMediaLinks: AchievementData.socialMediaLinks?.length
          ? AchievementData.socialMediaLinks
          : [""],
        mentor: AchievementData.mentor?.length
          ? AchievementData.mentor
          : [""],
      });

      setTempLinks(
        AchievementData.socialMediaLinks
          ? AchievementData.socialMediaLinks.join(" ")
          : ""
      );
    }
  }, [editAchievement, AchievementData, setSectionName]);

  const handleChange = (field, value) => {
    setAchievement((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, value, index) => {
    setAchievement((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleStringArrayChange = (field, value) => {
    setAchievement((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleAddField = (field) => {
    setAchievement((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveField = (field, index) => {
    setAchievement((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleFileUpload = (field, file) => {
    setAchievement((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
  
      const isEqual = (key, val1, val2) => {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          return JSON.stringify(val1) === JSON.stringify(val2);
        }
        return val1 === val2;
      };
  
      if (editAchievement) {
        for (const [key, value] of Object.entries(achievement)) {
          const originalValue = AchievementData[key];
  
          if (key === "photos") {
            if (value) {
              formData.append("photos", value);
            }
          } else if (
            key === "fieldOfAchievement" ||
            key === "socialMediaLinks" ||
            key === "mentor"
          ) {
            if (!isEqual(key, value, originalValue)) {
              formData.append(key, JSON.stringify(value)); // ✅ convert to JSON string
            }
          } else {
            if (!isEqual(key, value, originalValue)) {
              formData.append(key, value);
            }
          }
        }
  
        formData.append("formType", "achievement");
  
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }
  
        await editAchievementAPI(AchievementData._id, formData);
        showSuccessToast("Achievement edited successfully");
        setIsEditing(false);
      } else {
        for (const [key, value] of Object.entries(achievement)) {
          if (
            key === "fieldOfAchievement" ||
            key === "socialMediaLinks" ||
            key === "mentor"
          ) {
            formData.append(key, JSON.stringify(value)); // ✅ convert to JSON string
          } else if (key === "photos" && value) {
            formData.append("photos", value);
          } else {
            formData.append(key, value);
          }
        }
  
        const response = await addAchievement(formData);
        showSuccessToast("Achievement added successfully");
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
          <p>
            {editAchievement ? "Edit Achievement" : "Add Achievement"}
          </p>
          {(editAchievement) && (<>
            <Button onClick={() => setIsEditing(false)} label="<- Back"></Button>
          </>)}
        </h2>

        {/* Inline Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="Enter first name"
            value={achievement.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Enter last name"
            value={achievement.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            value={achievement.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <InputField
            id="enrollmentNumber"
            label="Enrollment Number"
            placeholder="Enter enrollment number"
            value={achievement.enrollmentNumber}
            onChange={(e) => handleChange("enrollmentNumber", e.target.value)}
            required
          />

          {/* dropdown for department */}
          <Select
            id="department"
            label="Department"
            value={achievement.department}
            onChange={(e) => handleChange("department", e.target.value)}
            options={[
              "Computer Science",
              "Information Technology",
              "Electronics",
              "Mechanical",
              "Civil",
              "Electrical and Electronics",
              "Petrochemical",
              "Automobile"
            ]}
            placeholder="Select Department"
            required
          />

          <InputField
            id="achievementTitle"
            label="Achievement Title"
            placeholder="Enter achievement title"
            value={achievement.achievementTitle}
            onChange={(e) => handleChange("achievementTitle", e.target.value)}
            required
          />
          <InputField
            id="achievementDate"
            label="Achievement Date"
            type="date"
            placeholder="Enter Date"
            value={achievement.achievementDate}
            onChange={(e) => handleChange("achievementDate", e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            required
          />

          <Select
            id="semester"
            label="Semester"
            value={achievement.semester}
            onChange={(e) => handleChange("semester", e.target.value)}
            options={[1, 2, 3, 4, 5, 6, 7, 8]}
            placeholder="Select semester"
            required
          />
        </div>

        {/* Description and Other Details */}
        <TextArea
          id="achievementDescription"
          label="Achievement Description"
          placeholder="Enter achievement description"
          value={achievement.achievementDescription}
          onChange={(e) => handleChange("achievementDescription", e.target.value)}
        />
        <Select
          id="recognitionLevel"
          label="Recognition Level"
          value={achievement.recognitionLevel}
          placeholder="Select Recognition Level"
          onChange={(e) => handleChange("recognitionLevel", e.target.value)}
          options={["gold level", "silver level", "bronze level"]}
        />
        <InputField
          id="awards"
          label="Awards"
          placeholder="Enter awards received"
          value={achievement.awards}
          onChange={(e) => handleChange("awards", e.target.value)}
        />

        <FileUpload
          required={editAchievement ? false : true}
          label="Achievement Images"
          id="photos"
          files={achievement.photos}
          onChange={(files) => handleFileUpload("photos", files)}
        />

        {/* Fields of Achievement */}
        <div>
          <label
            htmlFor="fieldOfAchievement"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Fields of Achievement
          </label>
          {achievement.fieldOfAchievement.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <InputField
                id={`fieldOfAchievement-${index}`}
                value={field}
                onChange={(e) =>
                  handleArrayChange("fieldOfAchievement", e.target.value, index)
                }
                placeholder="Enter field"
              />
              <Button
                label="Remove"
                onClick={() => handleRemoveField("fieldOfAchievement", index)}
              />
            </div>
          ))}
          <Button type="button" label="Add Field" onClick={() => handleAddField("fieldOfAchievement")} />
        </div>

        {/* Social Media Links */}
        <div>
          <InputField
            label="Social Media Links (seprated by spaces"
            id="socialMediaLinks"
            value={tempLinks}
            onChange={(e) => setTempLinks(e.target.value)}
            onBlur={() =>
              handleChange(
                "socialMediaLinks",
                tempLinks
                  .split(" ")
                  .filter((link) => link.trim() !== "")
              )
            }
            placeholder="Enter links separated by spaces"
          />
        </div>
        {/* mentors */}
        <div>
          <InputField
            label="Mentors Name"
            id="mentor"
            type="text"  // Explicitly set type to text
            value={achievement.mentor.join(", ")}
            placeholder="Enter Mentors (comma-separated)"
            onChange={(e) => handleStringArrayChange("mentor", e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button loading={loading} type="submit" label={editAchievement ? "Update" : "Submit"} />
        </div>
      </form>
    </div>
  );
};

export default AddAchievement;

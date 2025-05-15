import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import SelectField from "../ui/select";
import { addClub } from "../../api/allApi/club";

const AddClub = () => {
        const [club, setClub] = useState({
            clubName: "",
            founderName: "",
            description: "",
            typeOfClub: "",
            dateOfEstablishment: "",
            contactEmail: "",
            contactPhone: [],
            socialLinks: [""],
            logoImg: null,
            coverImg: null,
        });
    
        const handleChange = (field, value) => {
            setClub((prev) => ({
                ...prev,
                [field]: value,
            }));
        };
    
        const handleFileChange = (field, file) => {
            setClub((prev) => ({
                ...prev,
                [field]: file,
            }));
            console.log(file);
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            const formData = new FormData();
            formData.append("clubName", club.clubName);
            formData.append("founderName", club.founderName);
            formData.append("description", club.description);
            formData.append("typeOfClub", club.typeOfClub);
            formData.append("dateOfEstablishment", club.dateOfEstablishment);
            formData.append("contactEmail", club.contactEmail);
            formData.append("contactPhone",club.contactPhone);
            formData.append("socialLinks", JSON.stringify(club.socialLinks));
            formData.append("formType", "club"); 
    
            if (club.logoImg) {
                formData.append("logoImg", club.logoImg, club.logoImg.name);
            }
            console.log(club.logoImg);
            
            if(club.coverImg){
                formData.append("coverImg", club.coverImg, club.coverImg.name)
            }
            console.log(club.coverImg);

    
            try {
                const response = await addClub(formData);
                if (response.status === 201) {
                    alert("Club added successfully!");
                    setClub({
                        clubName: "",
                        founderName: "",
                        description: "",
                        typeOfClub: "",
                        dateOfEstablishment: "",
                        contactEmail: "",
                        contactPhone: [],
                        socialLinks: [""],
                        logoImg: null,
                        coverImg: null,
                    });
                } else {
                    alert("Failed to add club");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while adding the club");
            }
        };


    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Add Club</h2>

                {/* Club Details Section */}
                <section>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Club Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Club Name <span className="text-red-500">*</span>
                            </label>
                            <InputField
                                id="clubName"
                                value={club.clubName}
                                onChange={(e) => handleChange("clubName", e.target.value)}
                                placeholder="Enter club name (min 3 characters)"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="founderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Founder Name <span className="text-red-500">*</span>
                            </label>
                            <InputField
                                id="founderName"
                                value={club.founderName}
                                onChange={(e) => handleChange("founderName", e.target.value)}
                                placeholder="Enter founder name (min 3 characters)"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <TextArea
                            id="description"
                            value={club.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Enter description (max 80 characters)"
                            rows={3}
                            required
                        />
                    </div>
                </section>

                {/* Additional Details Section */}
                <section className="mt-6">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="typeOfClub" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Type of Club <span className="text-red-500">*</span>
                            </label>
                            <SelectField
                                id="typeOfClub"
                                value={club.typeOfClub}
                                onChange={(e) => handleChange("typeOfClub", e.target.value)}
                                options={[
                                    "Tech",
                                    "Non-tech",
                                    "Cultural",
                                    "Finance",
                                    "Graphic",
                                    "Robotic",
                                    "Political",
                                ]}
                                placeholder="Select club type"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dateOfEstablishment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date of Establishment
                            </label>
                            <input
                                type="date"
                                id="dateOfEstablishment"
                                value={club.dateOfEstablishment}
                                onChange={(e) => handleChange("dateOfEstablishment", e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Contact Email
                            </label>
                            <InputField
                                id="contactEmail"
                                type="email"
                                value={club.contactEmail}
                                onChange={(e) => handleChange("contactEmail", e.target.value)}
                                placeholder="Enter contact email"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Contact Phone (comma-separated)
                            </label>
                            <InputField
                                id="contactPhone"
                                value={club.contactPhone.join(", ")}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9,]/g, ""); // Allow only numbers and commas
                                    handleChange("contactPhone", value.split(",").map((num) => num.trim()));
                                }}
                                placeholder="Enter phone numbers"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Social Links (comma-separated)
                        </label>
                        <InputField
                            id="socialLinks"
                            value={club.socialLinks.join(", ")}
                            onChange={(e) =>
                                handleChange("socialLinks", e.target.value.split(",").map((link) => link.trim()))
                            }
                            placeholder="Enter social links"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="logoImg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Logo Image
                        </label>
                        <input
                            id="logoImg"
                            type="file"
                            onChange={(e) => handleFileChange("logoImg", e.target.files[0])}
                            className="block w-full text-sm text-gray-500 dark:text-gray-400"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="coverImg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cover Image
                        </label>
                        <input
                            id="coverImg"
                            type="file"
                            onChange={(e) => handleFileChange("coverImg", e.target.files[0])}
                            className="block w-full text-sm text-gray-500 dark:text-gray-400"
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

export default AddClub; 
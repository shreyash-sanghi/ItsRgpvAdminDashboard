import React, { useState, useEffect, useContext } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import SelectField from "../ui/select";
import { addClub, editClubAPI } from "../../api/allApi/club";
import { showSuccessToast, showErrorToast } from "../ui/toast";
import FileUpload from "../ui/fileUpload";
import { UserContext } from "../../App";


const AddClub = ({ editClub = false, clubData = {}, setIsEditing }) => {

    const { setSectionName } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
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


    useEffect(() => {

        setSectionName(editClub ? "Edit Club" : "Add Club");

        if (editClub && clubData) {

            setClub({
                ...clubData,
                contactPhone: clubData.contactPhone || [],
                socialLinks: clubData.socialLinks || [""],
                logoImg: null,
                coverImg: null,
            });
        }
    }, [editClub, clubData, setSectionName]);


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
        try {
            setLoading(true);
            const formData = new FormData();

            // Always append all fields whether editing or adding
            formData.append("clubName", club.clubName);
            formData.append("founderName", club.founderName);
            formData.append("description", club.description);
            formData.append("typeOfClub", club.typeOfClub);
            formData.append("dateOfEstablishment", club.dateOfEstablishment);
            formData.append("contactEmail", club.contactEmail);
            formData.append("contactPhone", club.contactPhone);
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

            if (editClub) {
                const response = await editClubAPI(club._id, formData); // Make sure editClubAPI is correctly defined
                if (response.status === 200) {
                    showSuccessToast("Club updated successfully");
                    setIsEditing(false);
                } else {
                    showErrorToast("Failed to update club");
                }
            } else {
                const response = await addClub(formData);
                if (response.status === 201) {
                    showSuccessToast("Club added successfully");
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
                    showErrorToast("Failed to add club");
                }
            }
        } catch (error) {
            console.error("Error during submission:", error);
            showErrorToast(error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl flex justify-between font-semibold text-gray-800 dark:text-gray-100 mb-6">

                    <p>
                        {editClub ? "Edit Club" : "Add Club"}
                    </p>
                    {(editClub) && (<>
                        <Button onClick={() => setIsEditing(false)} label="<- Back"></Button>
                    </>)}

                </h2>

                {/* Club Details Section */}
                <section>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Club Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputField
                                label="Club Name"
                                id="clubName"
                                value={club.clubName}
                                onChange={(e) => handleChange("clubName", e.target.value)}
                                placeholder="Enter club name (min 3 characters)"
                                required
                            />
                        </div>
                        <div>
                            <InputField
                                label="Founder Name"
                                id="founderName"
                                value={club.founderName}
                                onChange={(e) => handleChange("founderName", e.target.value)}
                                placeholder="Enter founder name (min 3 characters)"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <TextArea
                            label="Description"
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
                            <SelectField
                                label="Type of Club"
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
                            <InputField
                                label="Date of Establishment"
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
                            <InputField
                                label="Contact Email"
                                id="contactEmail"
                                type="email"
                                value={club.contactEmail}
                                onChange={(e) => handleChange("contactEmail", e.target.value)}
                                placeholder="Enter contact email"
                            />
                        </div>
                        <div>
                            <InputField
                                label="Contact Phone"
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
                        <InputField
                            label="Social Links"
                            id="socialLinks"
                            value={club.socialLinks.join(", ")}
                            onChange={(e) =>
                                handleChange("socialLinks", e.target.value.split(",").map((link) => link.trim()))
                            }
                            placeholder="Enter social links"
                        />
                    </div>
                    <div className="mt-4">

                        <FileUpload
                            label="Logo Image"
                            id="logoImg"
                            files={club.logoImg}
                            onChange={(e) => handleChange("logoImg", e)}
                            accept="image/*"
                        />

                    </div>

                    <div className="mt-4">
                        <FileUpload
                            label="Cover Image"
                            id="coverImg"
                            files={club.coverImg}
                            onChange={(e) => handleChange("coverImg", e)}
                            accept="image/*"
                        />

                    </div>
                </section>

                {/* Submit Button */}
                <div className="text-center mt-6">
                    <Button loading={loading} type="submit" label={editClub ? "Update" : "Submit"} />
                </div>
            </form>
        </div>
    );
};

export default AddClub; 
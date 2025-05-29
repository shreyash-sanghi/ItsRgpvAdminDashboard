import {Instance , formInstance} from "../axios";

const apiType = "club";

// done
export const addClub = async (data) => {
    try {
        const result = await formInstance.post(`/${apiType}/add-club`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

// done
export const getAllClubs = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-club`);
        return result;
    } catch (error) {
        throw error;
    }
}

// done 
export const getClubById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-club/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

// done 
export const editClubAPI = async (id, data) => {
    try {
        const result = await formInstance.put(`/${apiType}/edit-club/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

// done
export const deleteClub = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-club/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}
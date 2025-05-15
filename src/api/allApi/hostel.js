import {Instance, formInstance} from "../axios";

const apiType = "hostel";

export const addHostel = async (data) => {
    try {
        const result = await formInstance.post(`/${apiType}/add-hostel`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllHostels = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-hostel`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getHostelById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-hostel/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editHostel = async (id, data) => {
    try {
        const result = await Instance.put(`/${apiType}/edit-hostel/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteHostel = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-hostel/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}



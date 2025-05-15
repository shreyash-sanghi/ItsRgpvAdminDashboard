import {Instance} from "../axios";

const apiType = "scholarship";

export const addScholarship = async (data) => {
    try {
        const result = await Instance.post(`/${apiType}/add-scholarship`,data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllScholarships = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-scholarship`);   
        return result;
    } catch (error) {
        throw error;
    }
}

export const getScholarshipById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-scholarship/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editScholarship = async (id,data) => {
    try {
        const result = await Instance.put(`/${apiType}/edit-scholarship/${id}`,data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteScholarship = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-scholarship/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}


import {Instance, formInstance} from "../axios";

const apiType = "fest";

export const addFest = async (data) => {
    try {
        const result = await formInstance.post(`/${apiType}/add-fest`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllFests = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-fests`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getFestById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-fest/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editFest = async (id, data) => {
    try {
        const result = await Instance.put(`/${apiType}/edit-fest/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteFest = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-fest/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}   




import { formInstance, Instance } from "../axios";

const apiType = "pyq";

export const addPyq = async(data) => {

    try{
        const result = await formInstance.post(`/${apiType}/add-pyq`, data);
        return result;
    } catch(error) {
        throw error;
    }
}

export const getAllPyqs = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-pyq`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getPyqById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-pyq/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editPyqAPI = async (id, data) => {
    try {
        const result = await formInstance.put(`/${apiType}/edit-pyq/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deletePyq = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-pyq/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}


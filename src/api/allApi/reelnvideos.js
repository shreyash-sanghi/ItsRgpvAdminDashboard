import { Instance, formInstance } from "../axios";

const apiType = "video";

export const addVideo = async(data) => {

    try{
        const result = await formInstance.post(`/${apiType}/add-pyq`, data);
        return result;
    } catch(error) {
        throw error;
    }
}

export const getAllVideo = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-video`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getVideoById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-video/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editVideo = async (id, data) => {
    try {
        const result = await formInstance.put(`/${apiType}/edit-video/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteVideo = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-video/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}


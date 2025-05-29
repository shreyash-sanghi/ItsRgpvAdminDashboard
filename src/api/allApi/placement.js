import { Instance, formInstance } from "../axios";

const apiType = "placement";

export const addPlacement = async (data) => {
    try {
        const result = await formInstance.post(`/${apiType}/add-placement`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllPlacements = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-placement`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getPlacementById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-placement/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editPlacementAPI = async (id, data) => {
    try {
        const result = await formInstance.put(`/${apiType}/edit-placement/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deletePlacement = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-placement/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}
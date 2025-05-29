import {formInstance, Instance} from "../axios";

const apiType = "demand"

export const addDemand = async (data) => {
    try {
        const result = await formInstance.post(`/${apiType}/add-demand`,data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllDemands = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-demand`);  
        return result;
    } catch (error) {
        throw error;
    }
}

export const getDemandById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-demand/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}   

export const editDemandAPI = async (id,data) => {
    try {
        const result = await formInstance.put(`/${apiType}/edit-demand/${id}`,data);
        return result;
    } catch (error) {
        throw error;
    }
}   

export const deleteDemand = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-demand/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}   
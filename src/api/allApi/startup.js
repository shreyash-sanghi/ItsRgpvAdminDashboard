import exp from "constants";
import { Instance, formInstance } from "../axios";

const apiType = "startup";

export const addStartup = async (data) => {
    try{
        const result = formInstance.post(`/${apiType}/add-startup`, data);
        return result;
    } catch(error){
        throw error;
    }
}

export const getAllStartup = async() => {
    try{
        const result = Instance.get(`${apiType}/get-startup`);
        console.log("Api result", result);
        return result;
    } catch(error){
        throw error;
    }
}

export const getStartuplById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-startup/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editStartupAPI = async (id, data) => {
    try {
        const result = await formInstance.put(`/${apiType}/edit-startup/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteStartup = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-startup/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}



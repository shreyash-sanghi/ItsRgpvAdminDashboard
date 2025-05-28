import {Instance,formInstance} from "../axios";

const apiType = "achievement";

export const addAchievement = async(data)=>{
    try {
        const result = await formInstance.post(`/${apiType}/add-achievement`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllachievements = async(page = 1)=>{
    try {
        const result = await Instance.get(`/${apiType}/get-achievements?page=${page}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAchievementById = async(id)=> {
    try {
        const result = await Instance.get(`/${apiType}/get-achievement/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editAchievementAPI= async(id,data)=> {
    try{
        const result = await formInstance.put(`/${apiType}/edit-achievement/${id}`,data);
        return result;  
    } catch (error) {
        throw error;
    }
}

export const deleteAchievement = async(id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-achievement/${id}`);
        return result;
    } catch(error){
        throw error;
    }
}
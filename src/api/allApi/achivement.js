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

export const getAllachievements = async()=>{
    try {
        const result = await Instance.get(`/${apiType}/get-achievements`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAchievementById = async(id)=> {
    try {
        const result = await Instance.get(`/${apiType}/get-achievements/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editAchievement = async(id,data)=> {
    try{
        const result = await Instance.put(`/${apiType}/edit-achievements/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteAchievement = async(id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-achievements/${id}`);
        return result;
    } catch(error){
        throw error;
    }
}
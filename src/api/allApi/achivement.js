import Instance from "../axios";

const apiType = "achivement";

export const addAchivement = async(data)=>{
    try {
        const result = Instance.post(`/${apiType}/add-achievement`,data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllachievements = async()=>{
    try {
        const result = Instance.get(`/${apiType}/get-achievements`);
        return result;
    } catch (error) {
        throw error;
    }
}
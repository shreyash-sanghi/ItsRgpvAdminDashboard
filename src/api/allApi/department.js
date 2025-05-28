import { Instance, formInstance } from "../axios";

const apiType = "department"

export const addDepartment = async(data) => {
    try {
        const result = await formInstance.post(`/${apiType}/add-department`, data);
        return result;
    } catch(error){
        throw error;
    }
}

export const getAllDepartments = async () =>{

    try{
        const result = await Instance.get(`/${apiType}/get-department`);
        return result;
    } catch(error){
        throw error;
    }
}

export const getDepartmentById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-department/${id}`)
        return result;
    } catch(error){
        throw error;
    }
}

export const editDepartmentAPI = async(id) => {
    try{
        const result = await formInstance.put(`/${apiType}/edit-department/${id}`)
        return result;
    } catch(error){
        throw error;
    }
}

export const deleteDepartment = async(id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-department/${id}`);
        return result;
    } catch(error){
        throw error;
    }
}
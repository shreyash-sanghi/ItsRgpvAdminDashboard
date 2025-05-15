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

export const editDepartment = async(id) => {
    try{
        const result = await Instance.put(`/${apiType}/edit-department/${id}`)
        return result;
    } catch(error){
        throw error;
    }
}

export const deleteDepartment = async(data,id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-department/${id}`);
    } catch(error){
        throw error;
    }
}
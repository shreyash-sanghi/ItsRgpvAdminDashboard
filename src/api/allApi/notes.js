import { formInstance, Instance } from "../axios";

const apiType = "notes"

// done
export const addNotes = async(data)=> {

    try{
        const result = formInstance.post(`${apiType}/add-notes`, data);
        return result;
    } catch(error){
        throw error;
    }
}

// done
export const getAllNotes = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-notes`);
        return result;
    } catch (error) {
        throw error;
    }
}

// done
export const getNotesById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-notes/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

// done
export const editNotesAPI = async (id, data) => {
    try {
        const result = await formInstance.put(`/${apiType}/edit-notes/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

// done
export const deleteNotes = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-notes/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}



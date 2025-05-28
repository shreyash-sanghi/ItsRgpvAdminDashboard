import {Instance , formInstance} from "../axios";

const apiType = "book";

// done
export const addBook = async(data) => {

    try {
        const result = await formInstance.post(`/${apiType}/add-book`,data);
        return result;
    } catch(error){
        throw error;
    }
}

// done
export const getAllBooks = async () => {
    try {
        const result = Instance.get(`/${apiType}/get-book`);
        return result;
    } catch(error){
        throw error;
    }
}

// done
export const getBookById = async (id) => {
    try {
        const result = Instance.get(`/${apiType}/get-book/${id}`);
        return result;
    } catch(error){
        throw error;
    }
}

// done
export const editBookAPI = async (id,data) => {
    try {
        const result = formInstance.put(`/${apiType}/edit-book/${id}`,data);
        return result;
    } catch(error){
        throw error;
    }
}   


// done
export const deleteBook = async (id) => {
    try {
        const result = Instance.delete(`/${apiType}/delete-book/${id}`);
        return result;
    } catch(error){
        throw error;
    }
}




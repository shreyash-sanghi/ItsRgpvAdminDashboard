import axios from "axios";
import { formInstance, Instance } from "../axios";

const apiType = "event";

export const addEvent = async (data) => {
    try {
        const result = await formInstance.post(`/${apiType}/add-event`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getAllEvents = async () => {
    try {
        const result = await Instance.get(`/${apiType}/get-event`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getEventById = async (id) => {
    try {
        const result = await Instance.get(`/${apiType}/get-event/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}

export const editEvent = async (id, data) => {
    try {
        const result = await Instance.put(`/${apiType}/edit-event/${id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteEvent = async (id) => {
    try {
        const result = await Instance.delete(`/${apiType}/delete-event/${id}`);
        return result;
    } catch (error) {
        throw error;
    }
}


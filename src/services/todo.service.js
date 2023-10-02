import api from "../config/authApi.config";

export const todoListService = async (page) => {
	try {
		const response = await api.get(`/auth/todo/list?page=${page}`);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const todoAddService = async (data) => {
	try {
		const response = await api.post(`/auth/todo/add`,data);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const todoDetailsService = async (id) => {
	try {
		const response = await api.get(`/auth/todo/details/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const todoEditService = async (id,data) => {
	try {
		const response = await api.put(`/auth/todo/edit/${id}`,data);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const todoDeleteService = async (id) => {
	try {
		const response = await api.delete(`/auth/todo/delete/${id}`);
		return response;
	} catch (error) {
		return error.response;
	}
};

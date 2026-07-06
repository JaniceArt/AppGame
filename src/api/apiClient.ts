import { Platform } from 'react-native';

const BASE_URL = 'http://192.168.1.52:8080/api';

let userToken = '';
let currentUser: any = null;

export const setToken = (token: string, user: any = null) => {
    userToken = token;
    currentUser = user;
};

export const getToken = () => userToken;
export const getUser = () => currentUser;

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json',
        ...(userToken ? { 'Authorization': `Bearer ${userToken}` } : {}),
        ...options.headers,
    };

    try {
        const response = await fetch(url, { ...options, headers });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Lỗi kết nối API');
        }
        
        return data;
    } catch (error: any) {
        throw error;
    }
};

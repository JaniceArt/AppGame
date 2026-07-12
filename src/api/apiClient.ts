import { Platform } from 'react-native';

const BASE_URL = 'http://192.168.1.52:8080/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

let userToken = '';
let currentUser: any = null;

export const loadAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    if (token && user) {
        userToken = token;
        currentUser = JSON.parse(user);
    }
};

export const setToken = async (token: string, user: any = null) => {
    userToken = token;
    currentUser = user;
    if (token) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    }
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

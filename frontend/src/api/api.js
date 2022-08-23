import axios from 'axios';

export const getTasksData = async () => {
    const TASKS_URL = '/tasks';
    const response = await axios.get(TASKS_URL).then((response) => response.data);
    return response.data;
}

export const getStatusData = async () => {
    const STATUS_URL = '/statuses';
    const response = await axios.get(STATUS_URL).then((response) => response.data);
    return response.data;
}

export const loginUser = async (user, pwd) => {
    const LOGIN_URL = '/auth'; 
    const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    return response;
}

export const registerUser = async (user, pwd) => {
    const REGISTER_URL = '/register';
    const response = await axios.post(REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    return response;
}


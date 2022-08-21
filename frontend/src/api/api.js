import axios from 'axios';

const TASKS_URL = '/tasks';

export const getTasksData = async () => {
    const response = await axios.get(TASKS_URL);
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


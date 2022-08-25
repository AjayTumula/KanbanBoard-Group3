import axios from 'axios';

const TASKS_URL = '/tasks';
const STATUS_URL = '/statuses';
const LOGIN_URL = '/login'; 
const REGISTER_URL = '/register';
const PROJECTS_URL = '/projects';

export const getTasksData = async () => {
    const response = await axios.get(TASKS_URL).then((response) => response.data);
    return response.data;
}

export const addNewTask = async (params) => {
    const response = await axios.post(TASKS_URL, params).then((response) => response);
    return response;
}

export const getStatusData = async () => {
    const response = await axios.get(STATUS_URL).then((response) => response.data);
    return response.data;
}

export const loginUser = async (user, pwd) => {
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
    const response = await axios.post(REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    return response;
}

export const addNewStatus = async (params) => {
    const response = await axios.post(STATUS_URL, params).then((response) => response);
    return response;
}

export const getProjectsList = async () => {
    const response = await axios.get(PROJECTS_URL).then((response) => response.data);
    return response.data;
}

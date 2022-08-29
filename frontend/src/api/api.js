import axios from 'axios';

const TASKS_URL = '/tasks';
const STATUS_URL = '/statuses';
const LOGIN_URL = '/login'; 
const REGISTER_URL = '/register';
const PROJECTS_URL = '/projects';
const PRIORITY_URL = '/priorities';
const COMMENTS_URL = '/comments';

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

export const getPriorityList = async () => {
    const response = await axios.get(PRIORITY_URL).then((response) => response.data);
    return response.data;
}

export const addProject = async (params) => {
    const response = await axios.post(PROJECTS_URL, params).then((response) => response);
    return response;
}

export const addComment = async (params) => {
    const response = await axios.post(COMMENTS_URL, params).then((response) => response);
    return response;
}

export const getCommentsListByTask = async (id) => {
    const response = await axios.get(`${COMMENTS_URL}/${id}`).then((response) => response.data);
    return response.data;
}

export const deleteComment = async (id) => {
    const response = await axios.delete(`${COMMENTS_URL}/${id}`).then((response) => response.data);
    return response;
}
import axios from 'axios';

const TASKS_URL = '/tasks';
const STATUS_URL = '/statuses';
const LOGIN_URL = '/login'; 
const REGISTER_URL = '/register';
const PROJECTS_URL = '/projects';
const PRIORITY_URL = '/priorities';
const USERS_LIST_URL = '/users/list';
const ROLES_URL = '/roles';
const PROJECT_USER_URL = '/projectroles'
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


export const login = async (params) => {
    const response = await axios.post(LOGIN_URL, params).then((response) => response);
    return response;
}


export const addNewUser = async (params) => {
    const response = await axios.post(REGISTER_URL, params).then((response) => response);
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

export const changePassword = async (params) => {
    const response = await axios.post(PROJECTS_URL, params).then((response) => response);
    return response;
}
export const getRolesList = async () => {
    const response = await axios.get(ROLES_URL).then((response) => response.data);
    return response.data;
}

export const getUsersList = async () => {
    const response = await axios.get(USERS_LIST_URL).then((response) => response.data);
    return response.data;
}

export const assignUserToProject = async (params) => {
    console.log(params)
    const response = await axios.post(PROJECT_USER_URL, params).then((response) => response);
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

export const ChangePassword = async (id) => {
    const response = await axios.put(`${LOGIN_URL}/${id}`).then((response) => response.data);
    return response;
}
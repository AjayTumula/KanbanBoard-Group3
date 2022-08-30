import React, { useCallback, useEffect, useState } from "react";
import { getProjectsList, addProject } from '../api/api';
import CustomInput from "./CustomInput";
import AssignUser from "./AssignUser";
import ChangePassword from "./ChangePassword";

// display project and assign users
//user assigned to project and diff roles

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [refetchData, setRefetchData] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    
    const fetchData = useCallback(
        async () => {
            const projectListResponse = await getProjectsList()
            setProjects(projectListResponse);
            setRefetchData(false);
        },
        [setProjects],
    );

    useEffect(
        () => {
            refetchData && fetchData();
        },
        [fetchData, refetchData]
    );

    const addNewProject =
        useCallback(
            async (values) => {
                const newProjectData = { ...values, "id": projects.length + 1 };
                const response = await addProject(newProjectData)
                if (response.data.status === 'success') {
                    setRefetchData(true)
                }
            },
            [projects, setRefetchData]
        );

           return (
        <div className="app">
            <div className="app-nav">
                <h1>Projects Dashboard</h1>
                <div>
                    <CustomInput
                        displayClass="app-boards-add-board"
                        editClass="app-boards-add-board-edit"
                        text="Add Project"
                        buttonText="Add Project"
                        onSubmit={addNewProject}
                        isAddProject={true}
                        placeholder="Add project name"
                    />
                </div>
                
                <div className="app">
                    <div>
                       <button onClick={setShowChangePassword(true)}> Change Password</button>
                       <ChangePassword/>
                    </div>
                </div>
            </div>
           
            <div className="app-boards-container">
                <div className="app-boards">
                    {projects.map((item) => (
                        <div className="board">
                            <div className="board-inner" key={item?.id}>
                                <div className="board-header">
                                    {/* <img src={item.avatar_image_url}/> */}
                                    <p className="board-header-title">
                                        {item?.name}
                                    </p>
                                </div>
                                <div className="board-cards custom-scroll">
                                    <p>{item.description}</p></div>
                                <AssignUser
                                    projectId={item.id} />
                            </div></div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Project
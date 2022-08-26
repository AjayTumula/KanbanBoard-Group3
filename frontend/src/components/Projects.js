import React, { useCallback, useEffect, useState } from "react";
import { getProjectsList } from '../api/api';

// display project and assign users
//user assigned to project and diff roles

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [refetchData, setRefetchData] = useState(true);

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

    return (
        <div className="app">
            <div className="app-nav">
                <h1>Projects Dashboard</h1>
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
                    <p>{item.description}</p></div></div></div>
              ))}
            </div>
            </div>
        </div>
      );
    
};

export default Project
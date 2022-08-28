import React, { useCallback, useEffect, useState } from "react";
import { getRolesList, getUsersList, assignUserToProject } from '../api/api';

// display project and assign users
//user assigned to project and diff roles

const AssignUser = (props) => {
    const {projectId} = props;
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [roleSelected, setRoleSelected] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const [assignUserInd, setAssignUserInd] = useState(false);
    const [refetchData, setRefetchData] = useState(true);

    const fetchData = useCallback(
        async () => {
            const usersList = await getUsersList();
            const rolesList = await getRolesList();
            setUsers(usersList);
            setRoles(rolesList);
            setRefetchData(false);
        },
        [setUsers, setRoles],
    );

    useEffect(
        () => {
            refetchData && fetchData();
        },
        [fetchData, refetchData]
    );

    const assignToProject =
        useCallback(
            async (role,user) => {
                const assignedUser = { "roleId": role,"userId":user,"projectId":projectId};
                const response = await assignUserToProject(assignedUser)
                if (response.data.status === 'success') {
                    setRefetchData(true)
                }
            },
            [setRefetchData]
        );
        const submission = (e) => {
            e.preventDefault();
            if (roleSelected && userSelected) {
                setRoleSelected(""); 
                setUserSelected("");
                assignToProject(roleSelected, userSelected);
            }
            setAssignUserInd(false);
          };

    return (
        <div className="custom-input">
            {assignUserInd ? (
                <form
                    className={`custom-input-edit`}
                    onSubmit={submission}
                >
                    <select id="roles" onChange={(event) => setRoleSelected(event.target.value)}>
                        <option value="">Select one</option>
                        {roles.map((role) => <option value={role.id}>{role.name}</option>)}
                    </select>
                    <select id="users" onChange={(event) => setUserSelected(event.target.value)}>
                        <option value="">Select one</option>
                        {users.map((user) => <option value={user.id}>{user.name}</option>)}
                    </select>
                    <div className="custom-input-edit-footer">
                        <button type="submit">Add</button>
                        <button type="submit" onClick={() => setAssignUserInd(false)}>{"Cancel"}</button>
                    </div>
                </form>
            ) : (
                <p
                    className="custom-input-display"
                    onClick={() => setAssignUserInd(true)}
                >Assign Users to Project</p>
            )}
        </div>
    );

};

export default AssignUser;
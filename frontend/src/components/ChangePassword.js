import React, { useState, useContext, useCallback } from "react";
import AuthContext from "../context/AuthProvider";
import {changePassword} from '../api/api';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [successMsgInd, setSuccessMsgInd] = useState('');
    const {auth} = useContext(AuthContext);

      const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const fetchUser = {"password": newPassword, "id":auth.data.id};
            const response = await changePassword(fetchUser);
            console.log(response);
            if(response){
                showChangePassword(false);
                setErrMsg('');
                setSuccessMsgInd(true);
            }
            else{
                setErrMsg("Change password failed. Please try again");
            }
        },
    
    );

      return ( <div>
        {showChangePassword ? <section>
                <h1>Change Password</h1>
                <span className={errMsg ? "errorMessg" : "" }>{errMsg}</span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="oldpassword">Old Password:</label>
                    <input
                    type= "password"
                    id="oldpassword"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    />
                    <label htmlFor="newpassword">New Password:</label>
                    <input
                    type= "password"
                    id="name"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    />
                    <button type="submit">Change Password</button>
                    <button onClick={() => setShowChangePassword(false)}>Cancel</button>
                </form>
            </section> : 
            <><button onClick={() => setShowChangePassword(true)}> Change Password</button>
            {successMsgInd && <p>Password updated successfully</p>}</>}
      </div>
                    
      )
}

export default ChangePassword
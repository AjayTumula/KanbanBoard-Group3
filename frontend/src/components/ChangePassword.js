import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../context/AuthProvider";
import { login } from "../api/api";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef  = useRef();

    useEffect(() => {
        userRef.current.focus();
       }, [])

      useEffect(() => { 
        setErrMsg('');
      }, [setErrMsg])

      const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const fetchUser = {"email" : email, "password": password};
            const response = await changePassword(fetchUser);
            console.log(response);
            if(response.data.loggedIn){
                setSuccess(true);
            }
            else{
                setSuccess(false);
                setErrMsg("Change Password failed. Please try again");
            }
        },
    
    );

      return ( 
            <section>
                <p ref ={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive">{errMsg}</p>
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="oldpassword">Old Password:</label>
                    <input
                    type= "password"
                    id="oldpassword"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    required
                    />

                    <label htmlFor="newpassword">New Password:</label>
                    <input
                    type= "newpassword"
                    id="name"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                    />
                    <button>Change Password</button>
                </form>
            </section>
      )
}

export default ChangePassword
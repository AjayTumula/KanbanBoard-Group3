import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../context/AuthProvider";
import { login } from "../api/api";

const Login = () => {
      const { setAuthData } = useContext(AuthContext);
      const userRef = useRef();
      const errRef  = useRef();

      const [email, setEmail] = useState('');
      const [password, setPwd] = useState('');
      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      useEffect(() => {
        userRef.current.focus();
       }, [])

      useEffect(() => { 
        setErrMsg('');
      }, [email, password])

      const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const fetchUser = {"email" : email, "password": password};
            const response = await login(fetchUser);
            console.log(response);
            if(response.data.loggedIn){
                setSuccess(true);
                setAuthData({"name":response.data.name, "id":response.data.id, "email":response.data.email, "isAdmin":"", "projectId":""})
            }
            else{
                setSuccess(false);
                setErrMsg("Login failed. Please try again");
            }

        },
    
    );

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const fetchUser = {"email" : email, "password": password};
//           const response = getUser(fetchUser);
//           //console.log(JSON.stringify(response?.data));
//           //console.log(JSON.stringify(response));
//           //const accessToken = response?.data?.accessToken;
//           //const roles = response?.data?.roles;
//           //setAuth({ name, password, roles, accessToken });
//           setAuth({email, password});
//           //setUser('');
//           //setPwd('');
//           console.log(response);
//           setSuccess(true);
//       } catch (err) {
//           if (!err?.response) {
//               setErrMsg('No Server Response');
//           } else if (err.response?.status === 400) {
//               setErrMsg('Missing Username or Password');
//           } else if (err.response?.status === 401) {
//               setErrMsg('Unauthorized');
//           } else {
//               setErrMsg('Login Failed');
//           }
//           errRef.current.focus();
//       }
//   }

      return ( 
        <main className="App">
           {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="http://localhost:3000/projects">Go to Projects</a>
                </p>
            </section>
           ) : (
            
            <section>
                <p ref ={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Email:</label>
                    <input
                    type= "text"
                    id="email"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                    type= "password"
                    id="name"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="Line">
                    {/*put router link here*/}
                    <a href="http://localhost:3000/register">Sign Up</a>
                    </span>
                </p>
            </section>
           )}
        </main>
    )
}

export default Login
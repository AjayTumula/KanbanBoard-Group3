import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({data:null});

    const setAuthData = (data) => {
        setAuth({data: data});
      };

    return (
        <AuthContext.Provider value={{ auth, setAuthData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
import axios from "axios";
import { useState,useEffect, useContext,createContext } from "react";

const authContext = createContext();


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token:""
    })
    axios.defaults.headers.common['Authorization'] = auth ? auth.token : "";
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token:parseData.token
            })
        }
        //eslint-disable-next-line
    },[])
    return (
        <authContext.Provider value={[auth,setAuth]}>
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => useContext(authContext);
export { useAuth, AuthProvider };
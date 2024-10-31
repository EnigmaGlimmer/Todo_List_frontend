import {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AutoProvider = ({children}) => {
    const [auth, setAuth] = useState({token: null, user: null});
    
    const login = (user, token) => setAuth(token, user);
    const logout = (user, token) => setAuth({user: null, token: null});

    useEffect(() => {
        const saveAuth = JSON.parse(localStorage.getItem('auth'));
        if(saveAuth)
            setAuth(saveAuth);
    }, []);

    useEffect(() => {
        localStorage.setItem("token",JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value = {{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
import {createContext, useState} from "react";
import {useCookies} from "react-cookie";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const logout = () => {
        removeCookie('token')
    }

    return (
        <AuthContext.Provider value={{logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
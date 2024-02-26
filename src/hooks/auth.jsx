import {createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext({})
import { api } from "../services/api";

function AuthProvider({children}) {
    const [data, setData] = useState({})

    async function signIn({username, password}) {
        try {
            const response = await api.post("/users/auth", {email:username, password})
            const token = response.data.access_token
            const user = response.data.user
            api.defaults.headers.common['Authorization'] = token
            localStorage.setItem("@gestaohelpdesk:user", JSON.stringify(user))
            localStorage.setItem("@gestaohelpdesk:token", token)
            setData({user, token})
        } catch (error) {
            if (error.response) {
                alert(error.response.data)
                console.log(error.response.data)
            } else {
                alert ("Não foi possível entrar")
                console.log(error.message)
            }
        }
    }

    function signOut() {
        localStorage.removeItem("@gestaohelpdesk:user")
        localStorage.removeItem("@gestaohelpdesk:token")
        api.defaults.headers.common['Authorization'] = "";
        setData({})
    }

    useEffect(() => {
        const user = localStorage.getItem("@gestaohelpdesk:user")
        const token = localStorage.getItem("@gestaohelpdesk:token")

        if(user && token) {
            api.defaults.headers.common['Authorization'] = token;
            setData({
                token,
                user: JSON.parse(user)
            })
        }
    },[])

    return (
        <AuthContext.Provider value = {{
            signIn,
            user:data.user,
            signOut
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;
}

export {AuthProvider, useAuth}
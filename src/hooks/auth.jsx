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

    async function updateProfile(userUpdated, avatarFile) {
        
        try {
            await api.put(`/users/${data.user.id}`, userUpdated)
            localStorage.setItem("@gestaohelpdesk:user", JSON.stringify(userUpdated))
            setData({user:userUpdated, token:data.token})
            
            if (avatarFile) {
                const fileUploadForm = new FormData
                fileUploadForm.append("avatar", avatarFile)
                await api.put(`/users/avatar`, fileUploadForm)
            }

            return alert ("Os seus dados foram atualizados com sucesso.")
  
            
       } catch (error) {
            if (error.response) {
                 return alert(error.response.data)
            }else {
                 alert("Não foi possível atualizar as suas informações. Tente novamente.")
                 return console.log(error.message)
            }
       }
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
            signOut,
            updateProfile
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
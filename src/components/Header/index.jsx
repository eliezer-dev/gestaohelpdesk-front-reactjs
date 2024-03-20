import { Container, Profile, Menu, Logo } from "./styles";
import line1 from "../../assets/Pages/Header/Line 1.svg"
import {Button} from "../Button"
import { FaEnvelope  } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"

export function Header() {
    const navigate = useNavigate();
    const {user, signOut} = useAuth();
    const [itensMenu, setItensMenu] = useState(["Chamados", "Clientes", "Ajuda", "Downloads"])
    const [username, setUsername] = useState("")
    const [userAvatar, setUserAvatar] = useState(avatarPlaceHolder)

    function handleSignOut() {
        signOut()
        navigate("/login")
    }

    function handleProfile() {
        navigate("/profile")
    }

    function handleBack() {
        navigate("/")
    }

    function handleNewTicket() {
        navigate("/ticket/new")
    }

    async function getAvatar(){
        const response = await api.get(`/users/avatar`)
        const base64Data = response.data;
        setUserAvatar(`data:image/jpeg;base64,${base64Data}`)

    }

    useEffect(() => {
        setUsername(user.name)
        getAvatar()

    }, [])

    return (
        <Container>
            <Logo>
                <p onClick={handleBack}>Gestão Heldesk</p>
            </Logo>
            <Menu>
                    {   
                        itensMenu.map((item, index) => (
                            <Fragment key={index}>
                            <span>{item}</span>
                            <img src={line1} alt="linha vertical para separar"/>
                            </Fragment>
                        ))
                    }
                <Button title="Novo Chamado" icon={FaEnvelope } onClick={handleNewTicket}/>
            </Menu>
            <Profile>
                <ul>
                    <li onClick={handleProfile}>{user.name}</li>    
                    <li onClick={handleSignOut}>Sair</li>
                </ul>
                <img src={userAvatar}/>


            </Profile>            
        </Container>
    )
}
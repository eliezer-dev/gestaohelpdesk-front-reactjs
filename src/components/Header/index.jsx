import { Container, Profile, Menu, Logo } from "./styles";
import line1 from "../../assets/Pages/Header/Line 1.svg"
import {Button} from "../Button"
import { FaEnvelope  } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"

export function Header({logo=true}) {
    const navigate = useNavigate();
    const {user, signOut} = useAuth();
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
        console.log("chegou aqui")
        navigate("/")
    }

    function handleNewTicket() {
        navigate("/ticket/new")
    }

    function handleClickMenuHeader(option) {
        //chamados
        if (option == 1) {
            navigate("/")
        }
        //clientes
        if (option == 2) {
            navigate("/clients")
        }

        //usuarios
        if (option == 3) {
            navigate("/users")
        }
    }

    async function getAvatar(){
        const response = await api.get(`/users/avatar/${user.id}`)
        const avatar = response.data;
        if (avatar == ''){
            return;
        }
        setUserAvatar(`data:image/jpeg;base64,${avatar}`)
    }

    useEffect(() => {
        setUsername(user.name)
        getAvatar()
    }, [])

    return (
        <Container>
            {
                logo == true && 
                <Logo onClick={() => {handleBack()}}>
                    <img  onClick={() => {handleBack()}} src={LogoGestaoHelpdesk}/>
                </Logo>
            }
            
            <Menu>
                    <span onClick={() => {handleClickMenuHeader(1)}}>Chamados</span>
                    <img src={line1} alt="linha vertical para separar"/>
                    <span onClick={() => {handleClickMenuHeader(2)}}>Clientes</span>
                    <img src={line1} alt="linha vertical para separar"/>
                    <span onClick={() => {handleClickMenuHeader(3)}}>Usuários</span>
                    <img src={line1} alt="linha vertical para separar"/>
                    <span onClick={() => {handleClickMenuHeader(4)}}>Ajuda</span>
                <Button title="Novo Chamado" icon={FaEnvelope } onClick={handleNewTicket}/>
            </Menu>
            <Profile>
                <ul>
                    <li onClick={handleProfile}>{user.name.split(" ", 1)[0]}</li>    
                    <li onClick={handleSignOut}>Sair</li>
                </ul>
                <img 
                    src={userAvatar || avatarPlaceHolder}
                    onClick={handleProfile }
                />


            </Profile>            
        </Container>
    )
}
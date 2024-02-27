import { Container, Profile, Menu, Logo } from "./styles";
import line1 from "../../assets/Pages/Header/Line 1.svg"
import {Button} from "../Button"
import { FaEnvelope  } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";


export function Header() {
    const navigate = useNavigate();
    const {user, signOut} = useAuth();
    const [itensMenu, setItensMenu] = useState(["Chamados", "Ajuda", "Downloads"])
    const [username, setUsername] = useState("")
    const [userAvatar, setUserAvatar] = useState("https://github.com/eliezer-dev.png")

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

    useEffect(() => {
        setUsername(user.name)
    }, [])

    return (
        <Container>
            <Logo>
                <p onClick={handleBack}>Gestão Heldesk</p>
            </Logo>
            <Menu>
                    {   
                        itensMenu.map((item, index) => (
                            <>
                            <span key={index}>{item}</span>
                            <img key={index} src={line1} alt="linha vertical para separar"/>
                            </>
                        ))
                    }
                <Button title="Novo Chamado" icon={FaEnvelope }/>
            </Menu>
            <Profile>
                <ul>
                    <li onClick={handleProfile}>{user.name}</li>    
                    <li onClick={handleSignOut}>Sair</li>
                </ul>
    
                    <img 
                        src={userAvatar}
                        alt="Foto do usuário"
                        onClick={handleProfile}
                    />
            </Profile>            
        </Container>
    )
}
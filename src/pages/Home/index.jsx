import { ButtonText } from "../../components/ButtonText";
import { Container } from "./styles";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

export function Home(){
    const {signOut} = useAuth()
    const navigate = useNavigate();
    
    function handleSignOut() {
        signOut()
    }
    return (
        <Container>
            <Header/>
                   
        </Container>
    )
}
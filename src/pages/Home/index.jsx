import { ButtonText } from "../../components/ButtonText";
import { Container } from "./styles";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

export function Home(){
    const {signOut} = useAuth()
    const navigate = useNavigate();
    
    function handleSignOut() {
        signOut()
    }
    return (
        <Container>
            <h1>Pagina Inicial</h1>
            <ButtonText 
                title="Sair"
                onClick={handleSignOut}
            /> 
            
        </Container>
    )
}
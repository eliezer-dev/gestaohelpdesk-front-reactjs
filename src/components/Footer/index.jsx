import { Container } from "./styles";
import LogoGestaoHelpdeskVertical  from "../../assets/Pages/Header/Logo_Gestao_Helpdesk-vertical.png"

export function Footer() {
    return(
        <Container>
            <img src={LogoGestaoHelpdeskVertical} 
            alt="Logomarca com um boneco preto com um headseat na parede e escrito na frente Gestão Heldesk" 
            />
        </Container>
    )
}
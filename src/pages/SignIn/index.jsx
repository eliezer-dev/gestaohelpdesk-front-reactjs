import { Container, Content, Form, Logo, Background } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import LogoGestaoHelpdesk from "../../assets/shared/Logo_Gestao_Helpdesk_sem_bordas.svg"
import { Footer } from "../../components/Footer";

export function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {signIn}= useAuth();
    const [processingState, setProcessingState] = useState("false")
    

    function handleLogin() {
        setProcessingState("true")
        signIn({username, password})
        setProcessingState("false")
    }

    return (
        <Container>
            <Content>
                <Background/>
               
                <Form>
                    <Logo> 
                        <img src={LogoGestaoHelpdesk}/>
                    </Logo>

                    <h1>Entrar</h1>
                    <Input
                        disabled={processingState=="true"}   
                        placeholder="Digite o usuário que deseja acessar"
                        type="text"
                        value={username}
                        onChange={e => {setUsername(e.target.value)}}
                        className="form_input"
                    />
                    <Input
                        disabled={processingState=="true"}    
                        placeholder="Digite a senha de acesso"
                        type="password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    <ButtonText title="Esqueceu a senha?" className="alignEnd"/>
                    <Button 
                        title={processingState == "true" ? "Processando" : "Entrar"  }
                        disabled={processingState=="true"}
                        onClick={handleLogin}/>
                </Form>
            </Content>
        </Container>
    )
}
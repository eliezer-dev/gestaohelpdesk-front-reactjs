import { Container, Content, Form } from "./styles";
import imgHelpdesk from "../../assets/Pages/SignIn/imgHelpdesk.svg"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {signIn}= useAuth();
    

    function handleLogin() {
        signIn({username, password})
    }

    return (
        <Container>
            <Content>
                <img src={imgHelpdesk} alt="desenho de 2 homens e uma mulher sentado em uma mesa, representando um setor de helpdesk"/>
                <Form>
                    <h1>Entrar</h1>
                    <Input    
                        placeholder="Usuário ou e-mail"
                        type="text"
                        value={username}
                        onChange={e => {setUsername(e.target.value)}}
                    />
                    <Input    
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    <ButtonText title="Esqueceu a senha?" className="alignEnd"/>
                    <Button title="Entrar" onClick={handleLogin}/>
                </Form>
            </Content>
            
        </Container>
    )
}
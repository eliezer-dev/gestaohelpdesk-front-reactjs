import { Container, Header, ClientInfo, Content, Logo} from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {Input} from '../../components/Input'
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth"; 
import { Footer } from "../../components/Footer";
import { ClientEdit } from "../../components/ClientEdit";
import { UserEdit } from "../../components/UserEdit";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"


export function NewUser() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const params = useParams();
    const [client, setClient] = useState ()
    const [headerState, setHeaderState] = useState();
    const [userDataState, setUserDataState] = useState();

    const getDataForm = dataform => {
        handleSave(dataform)
    } 

    async function handleSave(dataForm) {
    
        if (params.id == "new") {
            try {
                await api.post("/users", {
                    cpf:dataForm.cpf,
                    name:dataForm.name,
                    cep:dataForm.cep,
                    address:dataForm.address,            
                    addressNumber:dataForm.addressNumber,
                    addressNumber2:dataForm.addressNumber2,
                    neighborhood:dataForm.neighborhood,
                    state:dataForm.state,
                    city:dataForm.city,
                    email:dataForm.email,
                    password:dataForm.password
                        
                })
                alert("Usuário Salvo com sucesso.")
                navigate(-1)
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao atualizar o usuário.")
                }
            }
            
           
        } else {
            try {
                console.log(dataForm)
                await api.put(`/users/${params.id}`, {
                    cpf:dataForm.cpf,
                    name:dataForm.name,
                    cep:dataForm.cep,
                    address:dataForm.address,            
                    addressNumber:dataForm.addressNumber,
                    addressNumber2:dataForm.addressNumber2,
                    neighborhood:dataForm.neighborhood,
                    state:dataForm.state,
                    city:dataForm.city,
                    email:dataForm.email,
                    password:dataForm.password,
                    oldPassword:dataForm.oldPassword
                })
                alert("Usuário atualizado com sucesso.")
                navigate(-1)
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao atualizar o usuário.")
                }
            }
            
        }       

    }    

    async function fetchUser(id) {
        const user = (await api.get(`/users/${id}`)).data
        setUserDataState(user);
    }

    function handleBack() {
        
        if(!userDataState) {
            const getConfirm = confirm("Deseja realmente sair? Os dados digitados serão perdidos.")
            if (getConfirm) {
                navigate(-1)
                return
            }
        }else {
            navigate(-1)
            return
        }
        
        
    }

   

    useEffect(() => {
        if (params.id == "new") {
            setHeaderState("Novo Chamado")
        } else {
            setHeaderState(`Editar chamado número: ${params.id}`)
            fetchUser(params.id)
        }
    },[params])

    return (
        <Container>
            
            <Header>
                <ArrowBackIcon onClick={handleBack}/>
                <div className="header_title">
                   
                    {
                        userDataState ?
                        <>
                        <h1>{`Editar usuario: `}</h1>
                        <Input
                            type="text"
                            value={`${userDataState.id}`}
                            disabled   
                        />
                        
                        </> 
                        :
                        <h1>Novo Usuário</h1>
                    }

                </div>
                <Logo>
                    <img src={LogoGestaoHelpdesk}/>
                </Logo>
            </Header>
            <Content>
                <UserEdit
                    userData = {userDataState && userDataState }
                    getDataForm = {getDataForm}
    
                />

            </Content>
            <Footer/>
            

        </Container>
    )
}
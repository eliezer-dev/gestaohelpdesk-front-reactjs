import { Container, Header, Content, Logo} from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {Input} from '../../components/Input'
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import {UserEdit} from "../../components/UserEdit"

export function NewUser() {
    const navigate = useNavigate();
    const params = useParams();
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
                navigate("/users")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao salvar o usuário.")
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
                navigate("/users")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao atualizar o usuário.")
                }
            }
            
        }       

    }    

    function handleBack() {
        
        if(!userDataState) {
            const getConfirm = confirm("Deseja realmente sair? Os dados digitados serão perdidos.")
            if (getConfirm) {
                navigate("/")
                return
            }
        }else {
            navigate("/")
            return
        }
        
        
    }

   

    useEffect(() => {
        
    },[])

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
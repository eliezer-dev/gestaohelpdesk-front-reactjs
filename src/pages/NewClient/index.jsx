import { Container, Header, ClientInfo, Content, Logo} from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {Input} from '../../components/Input'
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { TicketEdit } from "../../components/TicketEdit"; 
import { Footer } from "../../components/Footer";
import { ClientEdit } from "../../components/ClientEdit";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"


export function NewClient() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const params = useParams();
    const [client, setClient] = useState ()
    const [headerState, setHeaderState] = useState();
    const [clientDataState, setClientDataState] = useState();
    const [SLATime, setSLATime] = useState("00:00:00");
    const [slaWon, setslaWon] = useState(false);


    
    const getDataForm = dataform => {
        handleSave(dataform)
    } 

    const getClientForm = clientForm => {
        if (clientForm) {
            clientForm.createAt = new Date(clientForm.createAt).toLocaleString()
            setClient(clientForm)
        }
        
    }

 
    async function handleSave(dataForm) {
    
        if (params.id == "new") {
            try {
                await api.post("/clients", {
                    cpfCnpj:dataForm.cpfCnpj,
                    razaoSocialName:dataForm.razaoSocialName,
                    businessName:dataForm.businessName,
                    cep:dataForm.cep,
                    address:dataForm.address,            
                    addressNumber:dataForm.addressNumber,
                    addressNumber2:dataForm.addressNumber2,
                    neighborhood:dataForm.neighborhood,
                    state:dataForm.state,
                    city:dataForm.city,
                    email:dataForm.email,
                    slaDefault:dataForm.slaDefault,
                    slaUrgency:dataForm.slaUrgency,
                        
                })
                alert("Cliente Salvo com sucesso.")
                navigate("/clients")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao salvar o cliente.")
                }
            }
            
           
        } else {
            try {
                await api.put(`/clients/${params.id}`, {
                    cpfCnpj:dataForm.cpfCnpj,
                    razaoSocialName:dataForm.razaoSocialName,
                    businessName:dataForm.businessName,
                    cep:dataForm.cep,
                    address:dataForm.address,            
                    addressNumber:dataForm.addressNumber,
                    addressNumber2:dataForm.addressNumber2,
                    neighborhood:dataForm.neighborhood,
                    state:dataForm.state,
                    city:dataForm.city,
                    email:dataForm.email,
                    slaDefault:dataForm.slaDefault,
                    slaUrgency:dataForm.slaUrgency,
                })
                alert("Cliente atualizado com sucesso.")
                navigate("/clients")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao salvar o cliente.")
                }
            }
            
        }   

        

    }    


    async function fetchClient(id) {
        const client = await api.get(`/clients/${id}`)
        setClientDataState(client.data);
    }

    function handleBack() {
        
        if(!clientDataState) {
            const getConfirm = confirm("Deseja realmente sair? Os dados digitados serão perdidos.")
            if (getConfirm) {
                navigate("/clients")
                return
            }
        }else {
            navigate("/clients")
            return
        }
        
        
    }

   

    useEffect(() => {
        if (params.id == "new") {
            setHeaderState("Novo Chamado")
        } else {
            setHeaderState(`Editar chamado número: ${params.id}`)
            fetchClient(params.id)
        }
    },[params])

    return (
        <Container>
            
            <Header>
                <ArrowBackIcon onClick={handleBack}/>
                <div className="header_title">
                   
                    {
                        clientDataState ?
                        <>
                        <h1>Editar Cliente Nº</h1>
                        <Input
                            type="text"
                            value={`${clientDataState.id}`}
                            disabled   
                        />
                        
                        </> 
                        :
                        <h1>Novo Cliente</h1>
                    }

                </div>
                <Logo>
                    <img src={LogoGestaoHelpdesk}/>
                </Logo>   
            </Header>
            <Content>
                <ClientEdit
                    typeForm = {params.id == "new" ? "new" : "edit"} 
                    clientData = {clientDataState && clientDataState }
                    getDataForm = {getDataForm}
                    getClientForm = {getClientForm}
                />              
               
            </Content>
            <Footer/>
            

        </Container>
    )
}
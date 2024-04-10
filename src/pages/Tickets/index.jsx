import { Container, Header, ClientInfo, Content} from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {Input} from '../../components/Input'
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { TicketEdit } from "../../components/TicketEdit"; 


export function Tickets() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const params = useParams();
    const [client, setClient] = useState ()
    const [headerState, setHeaderState] = useState();
    const [ticketDataState, setTicketDataState] = useState();
    
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
        if (dataForm.shortDescription == "") {
            alert ("Preencha o campo Breve Descrição do Chamado")
            return
        }
        
        if (dataForm.description == "") {
            alert ("Preencha a descrição do chamado")
            return
        }

        if (!dataForm.client) {
            alert ("Pesquise o cliente")
            return
        }

        if (params.id == "new") {
            await api.post("/tickets", {
                shortDescription:dataForm.shortDescription,
                description:dataForm.description,
                client:{id:client.id},
                users:[user.id],
                typeOfService:dataForm.typeOfService,            
                status:{id:dataForm.status},
                category:{id:dataForm.category},
                scheduledDateTime:dataForm.scheduledDateTime
            })
            alert("Chamado salvo com sucesso.")
        } else {
            await api.put(`/tickets/${params.id}`, {
                shortDescription:dataForm.shortDescription,
                description:dataForm.description,
                client:{id:client.id},
                users:[user.id],
                typeOfService:dataForm.typeOfService,            
                status:{id:dataForm.status},
                category:{id:dataForm.category},
                scheduledDateTime:dataForm.scheduledDateTime
            })
            alert("Chamado atualizado com sucesso.")
        }   

        navigate("/")

    }    

    async function fetchTicket(id) {
        const ticket = await api.get(`/tickets/${id}`)
        setTicketDataState(ticket.data);
        setClient(ticket.data.client)
    }

    function handleBack() {
        const getConfirm = confirm("Deseja realmente sair? Os dados digitados serão perdidos.")
        if (getConfirm) {
            navigate("/")
            return
        }
        return
    }

    useEffect(() => {
        if (params.id == "new") {
            setHeaderState("Novo Chamado")
        } else {
            setHeaderState(`Editar chamado número: ${params.id}`)
            fetchTicket(params.id)
       
        }
    },[])


    return (
        <Container>
            
            <Header>
                <ArrowBackIcon onClick={handleBack}/>
                <h1>{headerState}</h1>
            </Header>
            <Content>
                {/* <div className="ticketInfo">
                    <label>Número do Chamado: </label>
                    <Input      
                        type="text"
                        disabled={true}
                    />
                    <label>Prioridade </label>
                    <Input      
                        type="text"
                        disabled={true}
                    />
                    <label>SLA </label>
                    <Input      
                        type="text"
                        disabled={true}
                    />
                </div> */}
                <TicketEdit
                    typeForm = {params.id == "new" ? "new" : "edit"} 
                    ticketData = {ticketDataState && ticketDataState }
                    getDataForm = {getDataForm}
                    getClientForm = {getClientForm}
                />
                <ClientInfo>
                    <h1>Dados do Cliente </h1>
                    {
                        client &&
                        <>
                            <p>Razão Social: </p>
                            <span>{client?.razaoSocialName}</span>
                            <p>CPNJ: </p>
                            <span>{client?.cpfCnpj}</span>
                            <p>E-mail: </p>
                            <span>{client?.email}</span>
                            <p>Cep</p>
                            <span>{client?.cep}</span>
                            <p>Endereço</p>
                            <span>{client?.address}</span>
                            <p>Numero</p>
                            <span>{client?.addressNumber}</span>
                            <p>Cidade</p>
                            <span>{client?.city}</span>
                            <p>Estado</p>
                            <span>{client?.state}</span>
                            <p>Cliente desde</p>
                            <span>{client.createAt}</span>

                        </>
                    }

                </ClientInfo>
               
            </Content>
            
            

        </Container>
    )
}
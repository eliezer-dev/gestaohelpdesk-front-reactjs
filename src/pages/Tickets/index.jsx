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
            const ticketSaved = await api.post("/tickets", {
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
            navigate(`/ticket/${ticketSaved.data.id}`)
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
            navigate("/")
        }   

        

    }    

    async function fetchTicket(id) {
        const ticket = await api.get(`/tickets/${id}`)
        setTicketDataState(ticket.data);
        setClient(ticket.data.client)
    }

    function handleBack() {
        navigate("/")
        return
           
    }

    useEffect(() => {
        if (params.id == "new") {
            setHeaderState("Novo Chamado")
        } else {
            setHeaderState(`Editar chamado número: ${params.id}`)
            fetchTicket(params.id)
       
        }
    },[params])


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
                
                    
                    {
                        client &&
                        <ClientInfo>
                            <h1>Dados do Cliente </h1>
                            <Input 
                                label="Razão Social"
                                type="text"
                                value={client?.razaoSocialName}
                                disabled
                            />
                            <Input 
                                label="CPNJ"
                                type="text"
                                value={client?.cpfCnpj}
                                disabled
                            />
                            <Input 
                                label="E-mail"
                                type="text"
                                value={client?.email}
                                disabled
                            />
                            <div className="cepAndAddress">
                                <Input 
                                    label="Cep"
                                    type="text"
                                    value={client?.cep}
                                    disabled
                                />
                                <Input 
                                    label="Endereço"
                                    type="text"
                                    value={client?.address}
                                    disabled
                                />
                            </div>
                            <div className="numberAndComplement">
                                <Input 
                                    label="Numero"
                                    type="text"
                                    value={client?.addressNumber}
                                    disabled
                                />
                                <Input 
                                    label="Complemento"
                                    type="text"
                                    value={client?.addressComplement}
                                    disabled
                                />


                            </div>
                            
                            
                            <div className="cityAndStateInput">
                                <Input 
                                    label="Cidade"
                                    type="text"
                                    value={client?.city}
                                    disabled
                                />
                                <Input 
                                label="Estado"
                                type="text"
                                value={client?.state}
                                disabled
                                />
                            </div>
                            
                            <Input 
                                label="Data de Cadastro"
                                type="text"
                                value={client?.createAt}
                                disabled
                            />

                        </ClientInfo>
                    }

                
               
            </Content>
            
            

        </Container>
    )
}
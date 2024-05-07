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
import { Footer } from "../../components/Footer";


export function Tickets() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const params = useParams();
    const [client, setClient] = useState ()
    const [headerState, setHeaderState] = useState();
    const [ticketDataState, setTicketDataState] = useState();
    const [SLATime, setSLATime] = useState("00:00:00");
    const [slaWon, setslaWon] = useState(false);
    const [processingState, setProcessingState] = useState("false");


    
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
            setProcessingState("false")
            await api.post("/tickets", {
                shortDescription:dataForm.shortDescription,
                description:dataForm.description,
                client:{id:client.id},
                users:[{id:user.id}],
                typeOfService:dataForm.typeOfService,            
                status:{id:dataForm.status},
                category:{id:dataForm.category},
                scheduledDateTime:dataForm.scheduledDateTime
            })
            setProcessingState("false")
            alert("Chamado salvo com sucesso.")
            navigate("/")
        } else {
            setProcessingState("true")
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
            setProcessingState("false")
            alert("Chamado atualizado com sucesso.")
            navigate("/")
        }   

        

    }    

    function adjustSLATime(ticket) {
        if (ticket) {
            const slaTimeLeftInSeconds = Math.trunc((new Date(ticket.slaDateTimeEnd) - new Date())/1_000)

            let slaTimeHours = Math.trunc(slaTimeLeftInSeconds/3600),
                slaTimeMinutes = Math.trunc((slaTimeLeftInSeconds%3600)/60),
                slaTimeSeconds = Math.trunc(((slaTimeLeftInSeconds%3600)%60))
            
            if (slaTimeLeftInSeconds < 0){
                if (ticket.status.type == 2 || ticket.status.type == 3) {
                    setSLATime(`-- 00:00:00`)
                    return
                }

                setslaWon(true)
                slaTimeHours = slaTimeHours * -1
                slaTimeMinutes = slaTimeMinutes * -1
                slaTimeSeconds = slaTimeSeconds * -1
                slaTimeHours = ("00" + slaTimeHours).slice(-2)
                slaTimeMinutes = ("00" + slaTimeMinutes).slice(-2)
                slaTimeSeconds = ("00" + slaTimeSeconds).slice(-2)
                setSLATime(`-- ${slaTimeHours}:${slaTimeMinutes}:${slaTimeSeconds}`)
            } else {
                slaTimeHours = ("00" + slaTimeHours).slice(-2)
                slaTimeMinutes = ("00" + slaTimeMinutes).slice(-2)
                slaTimeSeconds = ("00" + Math.trunc(((slaTimeLeftInSeconds%3600)%60))).slice(-2)
                setSLATime(`${slaTimeHours}:${slaTimeMinutes}:${slaTimeSeconds}`)
            }
            
        }      
        return;
    }


    async function fetchTicket(id) {
        const ticket = await api.get(`/tickets/${id}`)
        setTicketDataState(ticket.data);
        setClient(ticket.data.client)
        adjustSLATime(ticket.data)
    }

    function handleBack() {
        
        if(!ticketDataState) {
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
        if (params.id == "new") {
            setHeaderState("Novo Chamado")
        } else {
            setHeaderState(`Editar chamado número: ${params.id}`)
            fetchTicket(params.id)
        }
    },[params])

    setTimeout(() => {
        adjustSLATime(ticketDataState)
    }, 1000);

    return (
        <Container>
            
            <Header>
                <ArrowBackIcon onClick={handleBack}/>
                <div className="header_title">
                   
                    {
                        ticketDataState ?
                        <>
                        <h1>Editar Chamado Nº</h1>
                        <Input
                            type="text"
                            value={`${ticketDataState.id}`}
                            disabled   
                        />
                        <div className="header_tittle_sla">
                            <label 
                                htmlFor=""
                                className={slaWon == true && "color-orange"}
                            >
                            {slaWon == false ? "Tempo para Vencer SLA" : "Atendimento Atrasado"}
                            </label>
                            <Input classInput={slaWon == true && "background-color-orange"}
                            type="text"
                            value={SLATime}
                            slaWon={slaWon}
                            disabled
                        />
                        </div>
                       
                        </> 
                        :
                        <h1>Novo Chamado</h1>
                    }

                </div>
                    
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
                    processing={processingState}
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
            <Footer/>
            

        </Container>
    )
}
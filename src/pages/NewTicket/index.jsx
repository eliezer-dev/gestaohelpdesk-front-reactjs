import { Container, Header, ClientInfo, Content} from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import {Input} from '../../components/Input'
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { TicketEdit } from "../../components/TicketEdit";


export function NewTicket() {
    const navigate = useNavigate();
    const [client, setClient] = useState ()
    const {user} = useAuth();
    
    
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
        const targetIndex = dataForm.status.target.selectedIndex
        const statusId = dataForm.status.target.childNodes[targetIndex].id

        if (dataForm.shortDescription == "") {
            alert ("Preencha o campo Breve Descrição do Chamado")
            return
        }
        
        if (dataForm.description == "") {
            alert ("Preencha a descrição do chamado")
            return
        }

        if (!client) {
            alert ("Pesquise o cliente")
            return
        }

        console.log(client.id)
        await api.post("/tickets", {
            shortDescription:dataForm.shortDescription,
            description:dataForm.description,
            client:{id:client.id},
            users:[user.id],
            typeOfService:dataForm.typeOfService,            
            status:{id:statusId}
        })

        alert("Chamado salvo com sucesso.")
        navigate("/")

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
    },[])


    return (
        <Container>
            
            <Header>
                <ArrowBackIcon onClick={handleBack}/>
                <h1>Novo Chamado</h1>
            </Header>
            <Content>
                <div className="ticketID">
                    <label>Número do Chamado: </label>
                        <Input      
                            type="text"
                            disabled={true}

                        />
                </div>
                <TicketEdit
                    newTicketForm
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
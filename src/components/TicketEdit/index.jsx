import { Container } from "./styles";
import { Input } from "../Input";
import { Button } from "../Button";
import { TextArea } from "../TextArea";
import { Fragment, useEffect, useState } from "react";
import { api } from "../../services/api";
import { FiSearch } from "react-icons/fi";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function TicketEdit({getDataForm, getClientForm, newTicketForm=false}) {
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [clientSearch, setClientSearch] = useState("");
    const [clientsFound, setClientsFound] = useState([]);
    const [clientSelected, setClientSelected] = useState();
    const [userId, setUserID] = useState();
    const [status, setStatus] = useState();
    const [statusList, setStatusList] = useState([])
    

    function salvar () {
        const dataForm = {
            shortDescription,
            description,
            clientSearch,
            status
        }
        getDataForm(dataForm)
        return
    }

    function handleClientSelect(event) {
        setClientsFound([])
        setClientSearch(event.target.value)

        const clientSelectedId = event.target.childNodes[event.target.selectedIndex].id
        
        if (clientSelectedId) {
            const clientSelected = clientsFound.find((client) => client.id == clientSelectedId);
            getClientForm(clientSelected);
            return;
        }
       
       return
    }

    async function handleClientSearch (event) {
        setClientSearch(event)
         if (event.length == 0){
            setClientsFound([])
            return
         }

        const res = await api.get(`/clients?search=${event}`)
        setClientsFound(res.data)
    }

    async function fetchStatus () {
        const status = await api.get("/status")
        console.log(status)
        
        if (newTicketForm) {
            const statusListForNewTicketForm = status.data.filter((status) => status.type == null || status.type == 1)
            setStatusList(statusListForNewTicketForm)
        }
        
    }

    useEffect(() => {
        fetchStatus()       
        
    },[])

    return (
        <Container>
                
                <Input
                    placeholder="Breve descrição do chamado."
                    type="text"
                    value={shortDescription}
                    onChange={e => {setShortDescription(e.target.value)}}
                    required
                />
                <TextArea
                    placeholder="Descrição do Chamado"
                    type="textarea"
                    rows="10"
                    cols="50"
                    value={description}
                    onChange={e => {setDescription(e.target.value)}}
                    required
                />

                <div className="clienteSearch">
                    <Input
                    icon={FiSearch}
                    placeholder="Pesquise o Cliente"
                    type="search"
                    value={clientSearch}
                    onChange={e => {handleClientSearch(e.target.value)}}
                    
                    /> 
                    {
                        clientsFound?.length > 0 && 
                        <select 
                        name="clients" 
                        id="clients-select" 
                        onChange={e => {handleClientSelect(e)}}
                        size="10"
                        >   
                        {
                            clientsFound && 
                            clientsFound.map(client => (
                                <option 
                                    key={client.id} 
                                    id={client.id} 
                                    value={client.razaoSocialName}
                                >
                                {client.razaoSocialName}
                                </option>
                            ))

                        }
                        </select>
                    }
                    

                </div>

                <select 
                    name="status" 
                    id="status-select" 
                    defaultChecked
                    onChange={e => {setStatus(e)}}
                    required
                >   
                    {
                        statusList && 
                        statusList.map(status => (
                            <option 
                                key={status.id} 
                                id={status.id} 
                                value={status.description}
                            >
                            {status.description}
                            </option>
                           
                        ))

                    }
                </select>
            <Button title="Salvar" onClick={salvar}/>  
        </Container>
    )
}
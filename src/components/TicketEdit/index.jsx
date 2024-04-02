import { Container, Select, CheckBoxItem } from "./styles";
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
    const [statusList, setStatusList] = useState([]);
    const [typeOfService, setTypeOfService] = useState();
    const [scheduledDateTime, setScheduledDateTime]= useState();
    const [isSheduled, setIsSheduled] = useState(false);
    const [categories, setcategories] = useState([]);
    const [typeSearchState, setTypeSearchState] = useState(1);

    function salvar () {
        const dataFormIsOK = dataFormValidator();
        if (!dataFormIsOK) {
            return;
        }
        
        const dataForm = {
            shortDescription,
            description,
            clientSearch,
            status,
            typeOfService,
            scheduledDateTime
        }
        getDataForm(dataForm)
        return
    }

    function dataFormValidator() {
        if (!shortDescription) {
            alert ("Breve descrição não informada")
            return false;
        }else if (!description) {
            alert ("Descrição não informada")
            return false;
        }else if (!clientSearch) {
            alert ("Cliente não informado.")
            return false;
        }else if (!status) {
            alert ("Status do chamado não informado.")
            return false;
        }else if (!typeOfService) {
            alert ("Tipo do atendimento não informado.")
            return false;
        }else if (isSheduled == true) {
            if (!scheduledDateTime) {
                alert ("Chamado definido como agendamento, mas não informado data de agendamento.")
                return false
            }
        }else {
            return true
        }   
         
    }


    function handleSheduled(event) {
        setIsSheduled(event.target.checked)
    }

    function handleClientSelect(event) {
    
        setClientSearch(event.target.value)
        const clientSelectedId = event.target.childNodes[event.target.selectedIndex].id
        
        if (clientSelectedId) {
            const clientSelected = clientsFound.find((client) => client.id == clientSelectedId);
            getClientForm(clientSelected);
            setClientsFound([])
            return;
        }

        setClientsFound([])
       
       return
    }

    function changeTypeSearch (event) {
        const search = clientSearch
        setTypeSearchState(event)
        handleClientSearch(search, event)
    }

    async function handleClientSearch (event, typeParams) {
        const typeSearch = typeParams ? typeParams : typeSearchState
        
        setClientSearch(event)
        //quando apaga a pesquisa o campo é resetado
        if (event.length == 0){
            setClientsFound([])
            return
        }

        if (typeSearch == 3 && event.length < 11) {
            setClientsFound([])
            return
        }
        const res = await api.get(`/clients?search=${event}&type=${typeSearch}`)
        setClientsFound(res.data)
    }

    async function fetchStatus () {
        const status = await api.get("/status")
        
        if (newTicketForm) {
            const statusListForNewTicketForm = status.data.filter((status) => status.type == null || status.type == 1)
            setStatusList(statusListForNewTicketForm)
        }
        
    }

    async function fetchCategory() {
        const categories = await api.get("/categories")
        setcategories(categories.data)
    }

    useEffect(() => {
        fetchStatus()
        fetchCategory()       
        
    },[])

    return (
        <Container>
                <div className="clienteSearch">
                    <div id="search">
                        <Input
                            id="inputClientSearch"
                            icon={FiSearch}
                            placeholder="Pesquise o Cliente"
                            type="search"
                            value={clientSearch}
                            onChange={e => {handleClientSearch(e.target.value)}}
                        /> 
                        <select 
                            name="typeOfsearch" 
                            id="typeOfsearch"
                            onChange={e => {changeTypeSearch(e.target.value)}}
                        >
                            <option id={1} value={1}>Razão Social</option>
                            <option id={2} value={2}>Fantasia</option>
                            <option id={3} value={3}>CNPJ</option>
                            <option id={4} value={4}>E-mail</option>
                            <option id={5} value={5}>Cidade</option>
                            <option id={6} value={6}>Endereço</option>

                        </select>
                    </div>
                    
                    {
                        clientsFound?.length > 0 && 
                        <select 
                        name="clients" 
                        id="clients-select" 
                        onChange={e => {handleClientSelect(e)}}
                        size="10"
                        >   
                        {
                            clientsFound.length > 0 && 
                            clientsFound.map(client => (
                                <option 
                                    key={client?.id} 
                                    id={client?.id} 
                                    value={client?.razaoSocialName}
                                >
                                { client?.businessName ?
                                    `${client?.razaoSocialName} - ${client?.businessName}` :
                                    client?.razaoSocialName
                                }
                                </option>
                            ))

                        }
                        </select>
                    }
                    
                </div>
     
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
                    maxlength={1000}
                    onChange={e => {setDescription(e.target.value)}}
                    required
                    characteresUsed = {description.length}
                />

                <Select
                        name="category" 
                        id="category-select" 
                        defaultChecked
                        onChange={e => {setStatus(e)}}
                        required
                    >   
                        <option 
                            value="" 
                            disabled
                            selected
                        >
                            Selecione a categoria que melhor descreve o chamado.
                        </option>
                        {
                            categories && 
                            categories.map(category => (
                                <option 
                                    key={category.id} 
                                    id={category.id} 
                                    value={category.description}
                                >
                                {category.description}
                                </option>

                            ))

                        }
                </Select>   

                <Select
                        name="status" 
                        id="status-select" 
                        defaultChecked
                        onChange={e => {setStatus(e)}}
                        required
                    >   
                        <option 
                            value="" 
                            disabled
                            selected
                        >
                            Selecione o Status do Chamado
                        </option>
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
                </Select>
                
                <Select
                    name="typeOfService" 
                    id="typeOfService-select" 
                    defaultChecked
                    onChange={e => {setTypeOfService(e.target.value)}}
                    required
                    >
                        <option 
                            value="" 
                            disabled
                            selected
                        >
                            Selecione o Tipo do Atendimento
                        </option>
                        <option  
                            id={1}
                            value={1}
                        >
                            Interno
                        </option>
                    
                        <option  
                            id={2}
                            value={2}
                        >
                            Externo
                        </option>
                </Select>
               


                <div className="scheduled">
                    <CheckBoxItem>
                        <label> Atendimento agendado? </label>
                        <input 
                            type="checkbox"
                            checked={isSheduled}
                            onChange={e => {handleSheduled(e)}}
                        />                         
                    </CheckBoxItem>
                    {
                        isSheduled == true &&
                        <Input
                            className="scheduled_datetime"
                            type="datetime-local"
                            value={scheduledDateTime}
                            onChange={e => {setScheduledDateTime(e.target.value)}}
                        >
                        </Input>
                    }
                    
                </div>
            <Button title="Salvar" onClick={salvar}/>  
        </Container>
    )
}
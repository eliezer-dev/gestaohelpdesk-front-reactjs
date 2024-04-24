import { Container, TicketMain, Select, CheckBoxItem, Annotations, TicketAnnotations } from "./styles";
import { Input } from "../Input";
import { Button } from "../Button";
import { TextArea } from "../TextArea";
import { Fragment, useEffect, useState } from "react";
import { api } from "../../services/api";
import { FiSearch } from "react-icons/fi";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { useAuth } from "../../hooks/auth";

export function TicketEdit({getDataForm, getClientForm, ticketData}) {
    
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [clientSearch, setClientSearch] = useState("");
    const [inputClientSearchState, setInputClientSearchState] = useState(false)
    const [clientsFound, setClientsFound] = useState([]);
    const [clientSelected, setClientSelected] = useState();
    const [userId, setUserID] = useState();
    const [status, setStatus] = useState();
    const [statusList, setStatusList] = useState([]);
    const [categoryState, setCategoryState] = useState();
    const [categoriesListState, setCategoriesListState] = useState([]);
    const [typeOfService, setTypeOfService] = useState();
    const [scheduledDateTime, setScheduledDateTime]= useState();
    const [isSheduled, setIsSheduled] = useState(false);
    const [typeSearchState, setTypeSearchState] = useState(1);
    const [annotationsListState, setAnnotatiosListState] = useState([]);
    const [annotationState, setAnnotationState] = useState("")
    const {user} = useAuth();

    function salvar () {
        const dataFormIsOK = dataFormValidator();
        if (!dataFormIsOK) {
            return;
        }
        
        const dataForm = {
            shortDescription,
            description,
            client:clientSearch,
            status,
            typeOfService,
            category:categoryState,
            scheduledDateTime
        }
        getDataForm(dataForm)
        return
    }

    function handleSelectStatus (event) {
        setStatus(event.target.childNodes[event.target.selectedIndex].id)
    }

    function handleSelectCategory(event) {
        setCategoryState(event.target.childNodes[event.target.selectedIndex].id)
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
       
        }else if (!categoryState) {
            alert ("Caregoria do atendimento não informada")
            return false;
          
        }else if (isSheduled == true) {
            if (!scheduledDateTime) {
                alert ("Chamado definido como agendamento, mas não informado data de agendamento.")
                return false
            }
            return true
        }else {
            return true
        }   
         
    }


    function handleSheduled(event) {
        
        if (isSheduled) {
            setScheduledDateTime()
        }
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
        
        if (!ticketData) {
            const statusListForNewTicketForm = status.data.filter((status) => status.type == null || status.type == 1)
            setStatusList(statusListForNewTicketForm)
            return
        }

        setStatusList(status.data)
        
    }
    

    async function fetchCategory() {
        const categories = await api.get("/categories")
        setCategoriesListState(categories.data)
    }

    async function fetchAnnotations(){
        const annotations = await api.get(`/tickets/annotations?ticket=${ticketData?.id}`)
        if (annotations.data.length > 0) {
            setAnnotatiosListState(annotations.data)
        }
        return annotations.data;
    }

    async function fetchUser(userId, attribute) {
        const user = await api.get(`/users/${userId}`)
        if (attribute == "name") {
            return user.data.name;
        }
        
    }

    async function getAvatar(userId){
        const response = await api.get(`/users/avatar${userId}`)
        return response.data
        //setUserAvatar(`data:image/jpeg;base64,${base64Data}`)

    }

    async function handleSaveAnnotation () {

        if (annotationState == "") {
            return;
        }
        const annotation = {
            description:annotationState,
            ticketId:ticketData.id,
            userId: user.id
        }
        await api.post(`/tickets/annotations`,annotation)
        await fetchAnnotations();
        setAnnotationState("");
    }

    useEffect(() => {
        fetchStatus()
        fetchCategory()
        if (ticketData) {
            setClientSearch(ticketData?.client?.razaoSocialName)
            setInputClientSearchState(true)
            setShortDescription(ticketData.shortDescription)
            setDescription(ticketData.description)
            setStatus(ticketData.status.id)
            setCategoryState(ticketData.category.id)
            setTypeOfService(ticketData.typeOfService)
            
            if (ticketData.scheduledDateTime) {
                setIsSheduled(true)
                setScheduledDateTime(ticketData.scheduledDateTime)
            }
            fetchAnnotations();

        }           
    },[ticketData])

    return (
        <Container>
                <TicketMain>

                    <div className="clienteSearch">
                        <div id="search">
                            <Input
                                disabled={inputClientSearchState}
                                id="inputClientSearch"
                                icon={FiSearch}
                                placeholder="Pesquise o Cliente"
                                type="search"
                                value={clientSearch}
                                onChange={e => {handleClientSearch(e.target.value)}}
                            /> 
                                <select
                                    disabled={inputClientSearchState}
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
                            required
                            onChange={e => {handleSelectCategory(e)}}
                        >   
                            {
                                !ticketData && 
                                <option 
                                    value="" 
                                    disabled
                                    selected
                                >
                                    Selecione a categoria que melhor descreve o chamado.
                                </option>
                            }

                            {
                                categoriesListState && 
                                categoriesListState.map(category => (
                                    <option 
                                        key={category.id} 
                                        id={category.id} 
                                        value={category.description}

                                        selected={ticketData?.category?.id == category.id ? true : false}
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
                            onChange={e => {handleSelectStatus(e)}}
                            required
                        >   
                            {!ticketData && 
                                <option 
                                    value="" 
                                    disabled
                                    selected
                                >
                                Selecione o Status do Chamado
                                </option>
                            }

                            {
                                statusList && 
                                statusList.map(status => (
                                    <option 
                                        key={status.id} 
                                        id={status.id} 
                                        value={status.description}
                                        selected = {ticketData?.status?.id == status.id ? true : false}
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
                            {!ticketData && 
                                <option 
                                    value="" 
                                    disabled
                                    selected
                                >
                                    Selecione o Tipo do Atendimento
                                </option>
                            }

                            <option  
                                id={1}
                                value={1}
                                selected={ticketData?.typeOfService == 1 ? true : false}
                            >
                                Interno
                            </option>
                        
                            <option  
                                id={2}
                                value={2}
                                selected={ticketData?.typeOfService == 2 ? true : false}
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
                    {/* <Button title={typeForm == "new" ? "Salvar" : "Atualizar"} onClick={salvar}/>  */}
                    <Button title={ticketData ? "Atualizar" : "Salvar"} onClick={salvar}/> 
                </TicketMain>
                {
                ticketData &&
                <Annotations>
                    <h1>Anotações dos Atendimentos</h1>
                    <TextArea 
                        placeholder="Digite aqui o que foi feito no atendimento."
                        value={annotationState}
                        wrap
                        rows={4}
                        characteresUsed={annotationState.length}
                        onChange={e => {setAnnotationState(e.target.value)}}
                        />
                    <div className="annotations_buttons">
                        <Button title="Salvar" onClick={handleSaveAnnotation}/>
                        <Button title="Cancelar" onClick={() => {setAnnotationState("")}}/> 
                    </div>    
                      
                    <div className="annotationSaved">  
                    {
                        annotationsListState.length > 0 &&
                        annotationsListState.map((annotation) => (
                            <TicketAnnotations key={annotation.id}>
                                <img src={
                                    annotation.user.avatar ?
                                    `data:image/jpeg;base64,${annotation.user.avatar}` : avatarPlaceholder}/>
                            <div className="annotation">
                                <span>{annotation.user.name}</span>
                                <span>{new Date(annotation.updateAt).toLocaleString().replace(/,/g,"")}</span>
                                <TextArea 
                                    value={annotation.description}
                                    wrap
                                    disabled
                                    rows={4}
                                    className={"annotation_text"}
                                />
                            </div>
                            </TicketAnnotations>
                        ))
                      
                    }
                    </div>
                    
                </Annotations>
                }
        </Container>
    )
}
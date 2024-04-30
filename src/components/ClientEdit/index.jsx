import { Container, TicketMain, Select, SlaInput, NumberAddressLine2, CepAddressInput, NeighborhoodCityStateInput} from "./styles";
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

export function ClientEdit({getDataForm, clientData}) {
    const brazilStatesList = [
        { codigo: 'AC', nome: 'Acre' },
        { codigo: 'AL', nome: 'Alagoas' },
        { codigo: 'AP', nome: 'Amapá' },
        { codigo: 'AM', nome: 'Amazonas' },
        { codigo: 'BA', nome: 'Bahia' },
        { codigo: 'CE', nome: 'Ceará' },
        { codigo: 'DF', nome: 'Distrito Federal' },
        { codigo: 'ES', nome: 'Espírito Santo' },
        { codigo: 'GO', nome: 'Goiás' },
        { codigo: 'MA', nome: 'Maranhão' },
        { codigo: 'MT', nome: 'Mato Grosso' },
        { codigo: 'MS', nome: 'Mato Grosso do Sul' },
        { codigo: 'MG', nome: 'Minas Gerais' },
        { codigo: 'PA', nome: 'Pará' },
        { codigo: 'PB', nome: 'Paraíba' },
        { codigo: 'PR', nome: 'Paraná' },
        { codigo: 'PE', nome: 'Pernambuco' },
        { codigo: 'PI', nome: 'Piauí' },
        { codigo: 'RJ', nome: 'Rio de Janeiro' },
        { codigo: 'RN', nome: 'Rio Grande do Norte' },
        { codigo: 'RS', nome: 'Rio Grande do Sul' },
        { codigo: 'RO', nome: 'Rondônia' },
        { codigo: 'RR', nome: 'Roraima' },
        { codigo: 'SC', nome: 'Santa Catarina' },
        { codigo: 'SP', nome: 'São Paulo' },
        { codigo: 'SE', nome: 'Sergipe' },
        { codigo: 'TO', nome: 'Tocantins' }
    ]
    const [cpfCnpjState, setCpfCnpjState] = useState("")
    const [razaoSocialState, setRazaoSocialState] = useState("");
    const [businessNameState, setBusinessNameState] = useState("");
    const [cepState, setCepState] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressNumberState, setAddressNumberState] = useState();
    const [addressNumber2State, setAddressNumber2State] = useState("");
    const [neighborhoodState, setNeighborhoodState] = useState();
    const [stateState, setStateState] = useState("");
    const [cityState, setCityState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [slaDefaultState, setSlaDefaultState] = useState("");
    const [slaUrgencyState, setSlaUrgencyState] = useState("")

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
    const [stateListState, setStateListState] = useState(brazilStatesList)


    async function viaCep(event) {
        if (/^\d+$/.test(event) || event == "") {
            if (event.length <= 8) {
                setCepState(event)
            }
        
            if (event && event.length == 8) {
                const response = (await api.get(`https://viacep.com.br/ws/${event}/json/`)).data
                if (response.erro) {
                    alert ("Consulta não realizada.")
                    console.error(response)
                    return
                }       
                setAddressState(response.logradouro)
                setStateState(response.uf)
                setCityState(response.localidade)
                setNeighborhoodState(response.bairro)
                return
            
            }
            return
        }
        return
       
    }

    function handleCnpj (event) {
        if (/^\d+$/.test(event) || event == "") {
            if (event.length <= 14) {
                setCpfCnpjState(event)
                return
            }
            return
        }
        return
    }

    function handleSlaUrgency (event) {
        if ((/^\d+$/.test(event) || event == "") && event.length <= 3) {
            setSlaUrgencyState(event)
            return
         }
         return
    }

    function handleSlaDefault (event) {
        if ((/^\d+$/.test(event) || event == "") && event.length <= 3) {
            setSlaDefaultState(event)
            return
         }
         return
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    function handleSave () {
        const dataFormIsOK = dataFormValidator();
        if (!dataFormIsOK) {
            return;
        }
        
        const dataForm = {
            cpfCnpj: cpfCnpjState,
            razaoSocialName: razaoSocialState,
            businessName:businessNameState,
            cep:cepState,
            address:addressState,
            addressNumber:addressNumberState,
            addressNumber2:addressNumber2State,
            neighborhood:neighborhoodState,
            state:stateState,
            city:cityState,
            email:emailState,
            slaDefault:slaDefaultState,
            slaUrgency:slaUrgencyState,
            addresNumber2:addressNumber2State
          

        }
        getDataForm(dataForm)
        return
    }

   

    function dataFormValidator() {
        if (!razaoSocialState) {
            alert ("Razão Social não informada")
            return false;
        }else if (!businessNameState) {
            alert ("Nome Fantasia não informada")
            return false;
        }else if (!cpfCnpjState) {
            alert ("CNPJ não informado.")
            return false;
       
        }else if (!addressState) {
            alert ("Endereço não informado.")
            return false;

        }else if (!addressNumberState) {
            alert ("Número não informado.")
            return false;

   
        }else if (!neighborhoodState) {
            alert ("Bairro não informado")
            return false;
        
        }else if (!cityState) {
            alert ("Cidade não informado")
            return false;
        
        }else if (!stateState || stateState == "default") {
            alert ("Estado não informado")
            return false;    
        
        }else if (!emailState) {
            alert ("e-mail não informado")
            return false;    
        
        }else if (!validateEmail(emailState)) {
            alert ("e-mail invalido")
            return false;    
        
        }else if (!slaDefaultState) {
            alert ("SLA padrão não informado")
            return false;    
        
        }else if (!slaUrgencyState) {
            alert ("SLA urgente não informado")
            return false;    
          
        }else {
            return true
        }   
         
    }


    useEffect(() => {
        if (clientData) {
            setRazaoSocialState(clientData?.razaoSocialName)
            setBusinessNameState(clientData?.businessName)
            setCpfCnpjState(clientData?.cpfCnpj)
            setCepState(clientData?.cep)
            setAddressState(clientData?.address)
            setAddressNumberState(clientData?.addressNumber)
            setAddressNumber2State(clientData?.addressNumber2)
            setNeighborhoodState(clientData?.neighborhood)
            setEmailState(clientData?.email)
            setCityState(clientData?.city)
            setSlaDefaultState(clientData?.slaDefault)
            setSlaUrgencyState(clientData?.slaUrgency)
            setStateState(clientData?.state)


        }           
    },[clientData])

    return (
        <Container>
                <TicketMain>
                    
                    <Input
                        placeholder="Digite a Razão Social"
                        type="text"
                        value={razaoSocialState}
                        onChange={e => {setRazaoSocialState(e.target.value)}}
                        required
                    />
                    <Input
                        placeholder="Digite o Nome Fantasia"
                        type="text"
                        value={businessNameState}
                        onChange={e => {setBusinessNameState(e.target.value)}}
                        required
                    />
                    <Input
                        placeholder="Digite o CNPJ"
                        type="text"
                        value={cpfCnpjState}
                        onChange={e => {handleCnpj(e.target.value)}}
                        required
                    />
                    <CepAddressInput>
                        <Input
                            className="input_cep"
                            placeholder="Cep"
                            type="text"
                            value={cepState}
                            onChange={e => {viaCep(e.target.value)}}
                            required
                        />
                        <Input
                            className="input_address"
                            placeholder="Digite o Endereço"
                            type="text"
                            value={addressState}
                            onChange={e => {setAddressState(e.target.value)}}
                            required
                        />
                    </CepAddressInput>
                    <NumberAddressLine2>
                        <Input
                            className="addressNumber_input"
                            placeholder="Número"
                            type="text"
                            value={addressNumberState}
                            onChange={e => {setAddressNumberState(e.target.value)}}
                            required
                        />
                        <Input
                            className="addressNumber2_input"
                            placeholder="Complemento"
                            type="text"
                            value={addressNumber2State}
                            onChange={e => {setAddressNumber2State(e.target.value)}}
                            required
                        />
                    </NumberAddressLine2>
                   
                    <NeighborhoodCityStateInput>
                        <Input
                            placeholder="Digite o bairro"
                            type="text"
                            value={neighborhoodState}
                            onChange={e => {setNeighborhoodState(e.target.value)}}
                            required
                        />
                        <Input
                            placeholder="Digite a cidade"
                            type="text"
                            value={cityState}
                            onChange={e => {setCityState(e.target.value)}}
                            required
                        />
                        <Select
                                    name="statesSelect" 
                                    id="statesSelect"
                                    onChange={e => {setStateState(e.target.value)}}
                        >
                        <option 
                                value={"default"}
                                selected
                            >
                            Selecione
                        </option>
                        {
                            stateListState?.length > 0 && 
                            stateListState.map((state, index) => (
                                
                                <option 
                                    key={index} 
                                    id={index} 
                                    value={state.codigo}
                                    selected={state.codigo == stateState ? true : false}
                                >
                                    {state.codigo}
                                </option>
                            ))
                        }

                        </Select>
                    </NeighborhoodCityStateInput>
                    
                    
                    <Input
                        placeholder="Digite o email"
                        type="text"
                        value={emailState}
                        onChange={e => {setEmailState(e.target.value)}}
                        required
                    />
                    <SlaInput>
                        <Input
                            placeholder="SLA Padrão (em horas)"
                            type="text"
                            value={slaDefaultState}
                            onChange={e => {handleSlaDefault(e.target.value)}}
                            required
                        />
                        <Input
                            placeholder="SLA Urgencias (em horas)"
                            type="text"
                            value={slaUrgencyState}
                            onChange={e => {handleSlaUrgency(e.target.value)}}
                            required
                        />
                    </SlaInput>
                   
                   
                    

                    
                    <Button title={clientData ? "Atualizar" : "Salvar"} onClick={handleSave}/> 
                </TicketMain>
        </Container>
    )
}
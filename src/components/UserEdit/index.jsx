import { Container, TicketMain, Select, NumberAddressLine2, CepAddressInput, NeighborhoodCityStateInput} from "./styles";
import { Input } from "../Input";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";


export function UserEdit({getDataForm, userData}) {
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
    const [cpfState, setCpfState] = useState("")
    const [nameState, setNameState] = useState("");
    const [cepState, setCepState] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressNumberState, setAddressNumberState] = useState();
    const [addressNumber2State, setAddressNumber2State] = useState("");
    const [neighborhoodState, setNeighborhoodState] = useState();
    const [stateState, setStateState] = useState("");
    const [cityState, setCityState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [oldPasswordState, setOldPasswordState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [confirmNewPasswordState, setConfirmNewPasswordState] = useState("");
    const [usernameState, setUsernameState] = useState("");
    const [userRoleState, setUserRoleState] = useState();

    const [stateListState] = useState(brazilStatesList)
    const {user} = useAuth()

    async function viaCep(event) {
        const cep = event.replace(/[^0-9]/g,'');
        setCepState(cep) 
            if (cep && cep.length == 8) {
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

    function handleCpf (event) {
        const cpf = event.replace(/[^0-9]/g,'');
        if (cpf.length <= 11) {
            setCpfState(cpf)
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
            cpf: cpfState,
            name: nameState,
            cep:cepState,
            address:addressState,
            addressNumber:addressNumberState,
            addressNumber2:addressNumber2State,
            neighborhood:neighborhoodState,
            state:stateState,
            city:cityState,
            email:emailState,
            addresNumber2:addressNumber2State,
            password:passwordState,
            oldPassword:oldPasswordState,
            userRole:userRoleState          

        }
        getDataForm(dataForm)
        return
    }

   

    function dataFormValidator() {
        if (!nameState) {
            alert ("Nome não informado")
            return false;
        
        }else if (!cpfState) {
            alert ("CPF não informado")
            return false;

        }else if (cpfState.length < 11) {
            alert ("CPF inválido")
            return false
        
        }else if (!cepState) {
            alert ("Cep não informado.")
            return false
         

        }else if (cepState.length <8) {
            alert ("Cep inválido")
            return false
           
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
            alert ("Cidade não informada")
            return false;
        
        }else if (!stateState || stateState == "default") {
            alert ("Estado não informado")
            return false;    
        
        }else if (!emailState) {
            alert ("e-mail não informado")
            return false;    
        
        }else if (!validateEmail(emailState)) {
            alert ("e-mail inválido.")
            return false;
            
        }else if (!passwordState && !userData) {
            alert("senha não informada")
            return false
        
        }else if (passwordState && passwordState.length < 8) {
            alert ("A senha precisa ter no mínimo um tamanho 8 caracteres.")
            return false
                
        }else if (passwordState !=  confirmNewPasswordState) {
            alert ("As senhas digitadas não são iguais.")
            return false
        
        }else if (passwordState && !oldPasswordState && userData) {
            alert ("A senha atual não foi informada")
            return false
        }else if (!userRoleState) {
            alert ("Função do usuário não selecionada.")
            return false
        
        }else {
            return true
        }   
         
    }


    useEffect(() => {
        if (userData) {
            setNameState(userData?.name)
            setCpfState(userData?.cpf)
            setCepState(userData?.cep)
            setAddressState(userData?.address)
            setAddressNumberState(userData?.addressNumber)
            setAddressNumber2State(userData?.addressNumber2)
            setNeighborhoodState(userData?.neighborhood)
            setEmailState(userData?.email)
            setCityState(userData?.city)
            setStateState(userData?.state)
            setUsernameState(userData?.username)
            setUserRoleState(userData.userRole)

        }           
    },[userData])

    return (
        <Container>
                <TicketMain>
                    
                    <Input
                        placeholder="Digite o Nome do Usuário"
                        type="text"
                        value={nameState}
                        onChange={e => {setNameState(e.target.value)}}
                        required
                    />
                    <Input
                        placeholder="Digite o CPF"
                        type="text"
                        value={cpfState}
                        onChange={e => {handleCpf(e.target.value)}}
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
                        <Select
                                    name="userRoleSelect" 
                                    id="userRoleSelect"
                                    onChange={e => {setUserRoleState(e.target.value)}}
                        >
                            <option 
                                    value={"default"}
                                    selected
                                >
                                Selecione a função do usuário
                            </option>
                                
                            <option 
                                value={1}
                                selected={userRoleState == 1? true : false}
                            >
                                Suporte
                            </option>
                            <option 
                                value={2}
                                selected={userRoleState == 2 ? true : false}
                            >
                                Gerente
                            </option>
                            <option 
                                value={3}
                                selected={userRoleState == 3 ? true : false}
                            >
                                Usuário de Teste - Somente Leitura
                            </option>
        

                        </Select>                  
                    <Input
                        placeholder="Digite o email"
                        type="text"
                        value={emailState}
                        onChange={e => {setEmailState(e.target.value)}}
                        required
                    />
                    {
                        userData && 
                        <Input
                        placeholder="Digite a senha atual"
                        type="password"
                        value={oldPasswordState}
                        onChange={e => {setOldPasswordState(e.target.value)}}
                        required
                        />
                    }
                    
                    <Input
                        placeholder="Digite a nova senha"
                        type="password"
                        value={passwordState}
                        onChange={e => {setPasswordState(e.target.value)}}
                        required
                    />
                    <Input
                        placeholder="Digite a confirmação da nova senha"
                        type="password"
                        value={confirmNewPasswordState}
                        onChange={e => {setConfirmNewPasswordState(e.target.value)}}
                        required
                    />             
                    <Button 
                        title={userData ? "Atualizar" : "Salvar"} 
                        onClick={handleSave}
                        disabled={user.userRole == 3 || (user.userRole != 2 && user.id != userData.id)? true : false}
                    /> 
                </TicketMain>
        </Container>
    )
}
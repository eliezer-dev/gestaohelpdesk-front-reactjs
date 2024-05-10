import { Container, Form, Header, Picture, Select, CityState } from "./styles";
import { useEffect, useState } from "react";
import {FiCamera, FiLock, FiMail, FiUser} from 'react-icons/fi';
import { PiAddressBookLight } from "react-icons/pi";
import { GoNumber} from "react-icons/go";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LiaCitySolid } from "react-icons/lia";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"

export function Profile () {
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
    const {user, updateProfile, avatar} = useAuth();
    const [userAvatarState, setUserAvatarState] = useState(avatar)
    const [nameState, setNameState] = useState("");
    const [cpfState, setCpfState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [cepState, setCepState] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressNumberState, setAddressNumberState] = useState("");
    const [stateState, setStateState] = useState("");
    const [cityState, setCityState] = useState("");
    const [neighborhoodState, setNeighborhoodState] = useState("");
    const [oldPasswordState, setOldPasswordState] = useState("");
    const [newPasswordState, setNewPasswordState] = useState("");
    const [disableInputState, setDisableInputState] = useState(false);
    const navigate = useNavigate();
    const [avatarFileState, setAvatarFileState] = useState(null)
    const [newPasswordConfirmState, setNewPasswordConfirmState] = useState("")
    const [stateListState] = useState(brazilStatesList)

    function handleChangeAvatar(event) {
        const file = event.target.files[0]
        setAvatarFileState(file)
        const imagePreview = URL.createObjectURL(file)
        setUserAvatarState(imagePreview)
    }

    function handleCpf (event) {
        const cpf = event.replace(/[^0-9]/g,'');
        if (cpf.length <= 11) {
            setCpfState(cpf)
            return
        }
        return
    }

    function handleCep(event) {
        const cep = event.replace(/[^0-9]/g,'');
        
        if (cep.length <= 8) {
            setCepState(cep)
            return
        }
        return
    }   


     async function handleUpdateProfile() {
          const dataFormIsOK = dataFormValidator();
          if (dataFormIsOK == false) return

          setDisableInputState(true);
          let updated = {
               name:nameState,
               cpf:cpfState,
               email:emailState,
               cep:cepState,
               address:addressState,
               addressNumber:addressNumberState,
               state:stateState,
               city:cityState,
               neighborhood:neighborhoodState
          }
          let userUpdated = updated
          if (newPasswordState && !oldPasswordState) {
               setDisableInputState(false);
               return alert ("Senha atual não informada.")
          }

          if (newPasswordState & !newPasswordConfirmState) {
            setDisableInputState(false);
            return alert ("Digita a confirmação da nova senha.")
          }


          if (newPasswordState && oldPasswordState) {

                if (newPasswordState != newPasswordConfirmState) {
                    setNewPasswordState("")
                    setNewPasswordConfirmState("")
                    setDisableInputState(false);
                    return alert ("A nova senha e a confirmação da nova senha estão diferentes.")
                }
               updated = {
                    ...updated,
                    oldPasswordState,
                    newPasswordState
               }
               setNewPasswordState("")
               setOldPasswordState("")
               setNewPasswordState("")
               
          }
    userUpdated = Object.assign(user, updated)
    await updateProfile(userUpdated, avatarFileState, userAvatarState)   
    setDisableInputState(false);
    handleBack() 

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
        
        }else if (!validateEmail()) {
            alert ("e-mail inválido.")
            return false;
                
        }else {
            return true
        }   
         
    }

    



    function validateEmail() {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(emailState);
    }

    function handleBack(){
          navigate("/");
    }

    useEffect(() => {
          setNameState(user.name)
          setCpfState(user.cpf)
          setEmailState(user.email)
          setCepState(user.cep)
          setAddressState(user.address)
          setAddressNumberState(user.addressNumber)
          setStateState(user.state)
          setCityState(user.city)
          setNeighborhoodState(user.neighborhood)
    },[])

    return (
        <Container>
            <Header>
                <ArrowBackIcon 
                    onClick={handleBack}
                    className="arrow_back"
                />
                <div className="logo" onClick={handleBack}>
                        <img src={LogoGestaoHelpdesk}/>
                </div>

            </Header>   
            <Picture>
                <img 
                    src={userAvatarState} alt="Foto do usuário"/>
                <label>
                    <FiCamera/>
                    <input id="avatar" type="file" onChange={handleChangeAvatar}/>
                </label>
            </Picture>
            <Form>
                <Input
                    disabled={disableInputState}
                    icon={FiUser}
                    placeholder="Nome"
                    type="text"
                    value={nameState}
                    onChange={e => {setNameState(e.target.value)}}
                /> 
                <Input
                    disabled={disableInputState}
                    icon={FiUser}
                    placeholder="CPF"
                    type="text"
                    value={cpfState}
                    onChange={e => {handleCpf(e.target.value)}}
                /> 
                <Input
                    disabled={disableInputState}
                    icon={FiMail}
                    placeholder="E-mail"
                    type="text"
                    value={emailState}
                    onChange={e => {setEmailState(e.target.value)}}
                />   
                <Input
                    disabled={disableInputState}
                    icon={GoNumber}
                    placeholder="Cep"
                    type="text"
                    value={cepState}
                    onChange={e => {handleCep(e.target.value)}}
                /> 
                <Input
                    disabled={disableInputState}
                    icon={PiAddressBookLight}
                    placeholder="Endereço"
                    type="text"
                    value={addressState}
                    onChange={e => {setAddressState(e.target.value)}}
                />
                <Input
                    disabled={disableInputState}
                    icon={GoNumber}
                    placeholder="Número"
                    type="text"
                    value={addressNumberState}
                    onChange={e => {setAddressNumberState(e.target.value)}}
                />
                <CityState>
                <Input
                    className="city_input"
                    disabled={disableInputState}
                    icon={LiaCitySolid}
                    placeholder="Cidade"
                    type="text"
                    value={cityState}
                    onChange={e => {setCityState(e.target.value)}}
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
               
                </CityState>   
                
                <Input
                    disabled={disableInputState}
                    icon={LiaCitySolid}
                    placeholder="Bairro"
                    type="text"
                    value={neighborhoodState}
                    onChange={e => {setNeighborhoodState(e.target.value)}}
                /> 
                <Input
                    disabled={disableInputState}
                    icon={FiLock}
                    placeholder="Senha atual"
                    type="password"
                    value={oldPasswordState}
                    onChange={e => {setOldPasswordState(e.target.value)}}
                />
                <Input
                    disabled={disableInputState}
                    icon={FiLock}
                    placeholder="Nova senha"
                    type="password"
                    value={newPasswordState}
                    onChange={e => {setNewPasswordState(e.target.value)}}
                />
                <Input
                    disabled={disableInputState}
                    icon={FiLock}
                    placeholder="Confirmar nova senha"
                    type="password"
                    value={newPasswordConfirmState}
                    onChange={e => {setNewPasswordConfirmState(e.target.value)}}
                />
               <Button
                    disabled={disableInputState || user.userRole == 3}
                    title="Salvar"
                    onClick={handleUpdateProfile}
               />
                
            </Form>
            <Footer/> 
        </Container>

    )
}
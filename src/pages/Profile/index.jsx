import { Container, Form, Header, Picture } from "./styles";
import { useEffect, useState } from "react";
import {FiCamera, FiLock, FiMail, FiUser, FiClipboard } from 'react-icons/fi';
import { PiAddressBookLight } from "react-icons/pi";
import { GoNumber} from "react-icons/go";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LiaCitySolid } from "react-icons/lia";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg"
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/Pages/Header/Logo_Gestao_Helpdesk2.png"

export function Profile () {
    const [userAvatar, setUserAvatar] = useState({avatarPlaceHolder})
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [disableInput, setDisableInput] = useState(false);
    const navigate = useNavigate();
    const {user, updateProfile} = useAuth();
    const [avatarFile, setAvatarFile] = useState(null)
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

    function handleChangeAvatar(event) {
        const file = event.target.files[0]
        setAvatarFile(file)
        const imagePreview = URL.createObjectURL(file)
        setUserAvatar(imagePreview)
    }


    async function getAvatar(){
        const response = await api.get(`/users/avatar/${user.id}`)
        const avatar = response.data;
        if (avatar == ''){
            return;
        }
        setUserAvatar(`data:image/jpeg;base64,${avatar}`)

    }


    async function handleUpdateProfile() {
          setDisableInput(true);
          let updated = {
               name,
               cpf,
               email,
               cep,
               address,
               addressNumber,
               state,
               city,
          }
          let userUpdated = updated
          if (newPassword && !oldPassword) {
               setDisableInput(false);
               return alert ("Senha atual não informada.")
          }

          if (newPassword & !newPasswordConfirm) {
            setDisableInput(false);
            return alert ("Digita a confirmação da nova senha.")
          }


          if (newPassword && oldPassword) {

                if (newPassword != newPasswordConfirm) {
                    setNewPassword("")
                    setNewPasswordConfirm("")
                    setDisableInput(false);
                    return alert ("A nova senha e a confirmação da nova senha estão diferentes.")
                }
               updated = {
                    ...updated,
                    oldPassword,
                    newPassword
               }
               setNewPassword("")
               setOldPassword("")
               setNewPassword("")
               
          }
    userUpdated = Object.assign(user, updated)
    await updateProfile(userUpdated, avatarFile)   
    setDisableInput(false);
    handleBack() 

    }

    function handleBack(){
          navigate(-1);
    }

    useEffect(() => {
          getAvatar()
          setName(user.name)
          setCpf(user.cpf)
          setEmail(user.email)
          setCep(user.cep)
          setAddress(user.address)
          setAddressNumber(user.addressNumber)
          setState(user.state)
          setCity(user.city)
    },[])

    return (
        <Container>
            <Header>
                <ArrowBackIcon 
                    onClick={handleBack}
                    className="arrow_back"
                />
                <div className="logo">
                        <img src={LogoGestaoHelpdesk}/>
                </div>

            </Header>   
            <Picture>
                <img src={userAvatar || avatarPlaceHolder} alt="Foto do usuário"/>
                <label>
                    <FiCamera/>
                    <input id="avatar" type="file" onChange={handleChangeAvatar}/>
                </label>
            </Picture>
            <Form>
                <Input
                    disabled={disableInput}
                    icon={FiUser}
                    placeholder="Nome"
                    type="text"
                    value={name}
                    onChange={e => {setName(e.target.value)}}
                /> 
                <Input
                    disabled={disableInput}
                    icon={FiUser}
                    placeholder="CPF"
                    type="text"
                    value={cpf}
                    onChange={e => {setCpf(e.target.value)}}
                /> 
                <Input
                    disabled={disableInput}
                    icon={FiMail}
                    placeholder="E-mail"
                    type="text"
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                />   
                <Input
                    disabled={disableInput}
                    icon={GoNumber}
                    placeholder="Cep"
                    type="text"
                    value={cep}
                    onChange={e => {setCep(e.target.value)}}
                /> 
                <Input
                    disabled={disableInput}
                    icon={PiAddressBookLight}
                    placeholder="Endereço"
                    type="text"
                    value={address}
                    onChange={e => {setAddress(e.target.value)}}
                />
                <Input
                    disabled={disableInput}
                    icon={GoNumber}
                    placeholder="Número"
                    type="text"
                    value={addressNumber}
                    onChange={e => {setAddressNumber(e.target.value)}}
                />
                <Input
                    disabled={disableInput}
                    icon={LiaCitySolid}
                    placeholder="Estado"
                    type="text"
                    value={state}
                    onChange={e => {setState(e.target.value)}}
                />   
                <Input
                    disabled={disableInput}
                    icon={LiaCitySolid}
                    placeholder="Cidade"
                    type="text"
                    value={city}
                    onChange={e => {setCity(e.target.value)}}
                /> 
                <Input
                    disabled={disableInput}
                    icon={FiLock}
                    placeholder="Senha atual"
                    type="password"
                    value={oldPassword}
                    onChange={e => {setOldPassword(e.target.value)}}
                />
                <Input
                    disabled={disableInput}
                    icon={FiLock}
                    placeholder="Nova senha"
                    type="password"
                    value={newPassword}
                    onChange={e => {setNewPassword(e.target.value)}}
                />
                <Input
                    disabled={disableInput}
                    icon={FiLock}
                    placeholder="Confirmar nova senha"
                    type="password"
                    value={newPasswordConfirm}
                    onChange={e => {setNewPasswordConfirm(e.target.value)}}
                />
               <Button
                    disabled={disableInput}
                    title="Salvar"
                    onClick={handleUpdateProfile}
               />
                
            </Form>
            <Footer/> 
        </Container>

    )
}
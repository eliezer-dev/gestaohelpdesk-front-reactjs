import { Container, Form, Header, Picture } from "./styles";
import { useEffect, useState } from "react";
import {FiCamera, FiLock, FiMail, FiUser, FiClipboard } from 'react-icons/fi';
import { PiAddressBookLight } from "react-icons/pi";
import { GoNumber} from "react-icons/go";
import { FaArrowLeft  } from "react-icons/fa6";
import { LiaCitySolid } from "react-icons/lia";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

export function Profile () {
    const [userAvatar, setUserAvatar] = useState("https://github.com/eliezer-dev.png")
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
    const {user} = useAuth();

    function handleChangeAvatar() {
        
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
               city
          }
          let userUpdated = updated
          if (newPassword && !oldPassword) {
               setDisableInput(false);
               setOldPassword("")
               return alert ("Senha atual não informada.")
          }

          if (newPassword && oldPassword) {
               updated = {
                    ...updated,
                    oldPassword,
                    newPassword
               }
               setNewPassword("")
               setOldPassword("")
               userUpdated = Object.assign(user, updated)
          }
       
     try {
          await api.put(`/users/${user.id}`, userUpdated)
          setDisableInput(false);
          return alert ("Os seus dados foram atualizados com sucesso.")

          
     } catch (error) {
          if (error.response) {
               setDisableInput(false);
               return alert(error.response.data)
          }else {
               setDisableInput(false);
               alert("Não foi possível atualizar as suas informações. Tente novamente.")
               return console.log(error.message)
          }
     }
     

    }

    function handleBack(){
          navigate(-1);
    }

    useEffect(() => {
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
               <ButtonText
                    icon={FaArrowLeft}
                    onClick={handleBack}            
               />
            </Header>   
            <Picture>
                <img src={userAvatar} alt="Foto do usuário"/>
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
                    disabled
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
                    placeholder="Senha Atual"
                    type="password"
                    value={oldPassword}
                    onChange={e => {setOldPassword(e.target.value)}}
                />
                <Input
                    disabled={disableInput}
                    icon={FiLock}
                    placeholder="Nova Senha"
                    type="password"
                    value={newPassword}
                    onChange={e => {setNewPassword(e.target.value)}}
                />
               <Button
                    disabled={disableInput}
                    title="Salvar"
                    onClick={handleUpdateProfile}
               />
                
            </Form>  
        </Container>

    )
}
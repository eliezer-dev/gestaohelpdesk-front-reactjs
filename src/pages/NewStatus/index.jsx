import { Container, Header, Content, Logo} from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {Input} from '../../components/Input'
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import { CategoryEdit } from "../../components/CategoryEdit";
import { StatusEdit } from "../../components/StatusEdit";

export function NewStatus() {
    const navigate = useNavigate();
    const params = useParams();
    const [statusDataState, setStatusDataState] = useState();

    const getDataForm = dataform => {
        handleSave(dataform)
    } 

    async function handleSave(dataForm) {
    
        if (params.id == "new") {
            try {
                await api.post("/status", {
                    description:dataForm.description,
                    type:dataForm.type,
                        
                })
                alert("Status salvo com sucesso.")
                navigate("/configurations/status")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao salvar o status.")
                }
            }
            
           
        } else {
            try {
                await api.put(`/status/${params.id}`, {
                    description:dataForm.description,
                    type:dataForm.type
                })
                alert("Status atualizado com sucesso.")
                navigate("/configurations/status")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao atualizar os status.")
                }
            }
            
        }       

    }    
    
    async function fetchStatus() {
        const status = (await api.get(`/status/${params.id}`)).data
        setStatusDataState(status);
    }



    function handleBack() {
        
        if(!statusDataState) {
            const getConfirm = confirm("Deseja realmente sair? Os dados digitados serão perdidos.")
            if (getConfirm) {
                navigate("/configurations/status")
                return
            }
        }else {
            navigate("/configurations/status")
            return
        }
        
        
    }

   

    useEffect(() => {
        if (params.id != "new") fetchStatus();
          
    },[params])

    return (
        <Container>
            
            <Header>
                <ArrowBackIcon onClick={handleBack}/>
                <div className="header_title">
                   
                    {
                        statusDataState ?
                        <>
                        <h1>{`Editar Status: `}</h1>
                        <Input
                            type="text"
                            value={`${statusDataState.id}`}
                            disabled   
                        />
                        
                        </> 
                        :
                        <h1>Novo Status</h1>
                    }

                </div>
                <Logo>
                    <img src={LogoGestaoHelpdesk}/>
                </Logo>
            </Header>
            <Content>
                <StatusEdit
                    statusData = {statusDataState && statusDataState }
                    getDataForm = {getDataForm}
                />

            </Content>
            <Footer/>
            

        </Container>
    )
}
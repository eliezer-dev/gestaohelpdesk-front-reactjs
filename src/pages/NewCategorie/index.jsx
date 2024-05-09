import { Container, Header, Content, Logo} from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {Input} from '../../components/Input'
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import { CategoryEdit } from "../../components/CategoryEdit";

export function NewCategorie() {
    const navigate = useNavigate();
    const params = useParams();
    const [categoryDataState, setCategoryDataState] = useState();

    const getDataForm = dataform => {
        handleSave(dataform)
    } 

    async function handleSave(dataForm) {
    
        if (params.id == "new") {
            try {
                await api.post("/categories", {
                    description:dataForm.description,
                    priority:dataForm.priority,
                        
                })
                alert("Categoria salva com sucesso.")
                navigate("/configurations/categories")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao salvar a categoria.")
                }
            }
            
           
        } else {
            try {
               
                await api.put(`/categories/${params.id}`, {
                    description:dataForm.description,
                    priority:dataForm.priority
                })
                alert("Categoria atualizada com sucesso.")
                navigate("/configurations/categories")
            } catch (error) {
                if (error.message && error.response.data) {
                    alert(error.response.data)
                }else {
                    alert ("Erro no servidor ao atualizar a categoria.")
                }
            }
            
        }       

    }    
    
    async function fetchCategory() {
        const category = (await api.get(`/categories/${params.id}`)).data
        setCategoryDataState(category);
    }



    function handleBack() {
        
        if(!categoryDataState) {
            const getConfirm = confirm("Deseja realmente sair? Os dados digitados serão perdidos.")
            if (getConfirm) {
                navigate("/configurations/categories")
                return
            }
        }else {
            navigate("/configurations/categories")
            return
        }
        
        
    }

   

    useEffect(() => {
        if (params.id != "new") fetchCategory();
          
    },[params])

    return (
        <Container>
            
            <Header>
                <ArrowBackIcon onClick={handleBack}/>
                <div className="header_title">
                   
                    {
                        categoryDataState ?
                        <>
                        <h1>{`Editar Categoria: `}</h1>
                        <Input
                            type="text"
                            value={`${categoryDataState.id}`}
                            disabled   
                        />
                        
                        </> 
                        :
                        <h1>Nova Categoria</h1>
                    }

                </div>
                <Logo>
                    <img src={LogoGestaoHelpdesk}/>
                </Logo>
            </Header>
            <Content>
                <CategoryEdit
                    categoryData = {categoryDataState && categoryDataState }
                    getDataForm = {getDataForm}
                />

            </Content>
            <Footer/>
            

        </Container>
    )
}
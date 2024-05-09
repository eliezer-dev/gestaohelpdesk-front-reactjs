import { Container, Table, MenuSide, MenuSideHeaderTable, HeaderTable} from "./styles";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import { useNavigate } from "react-router-dom";
import { CategoriesTable } from "../../components/CategoriesTable";
import { ButtonText } from "../../components/ButtonText";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";
import { TbCategoryPlus } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { StatusTable } from "../../components/StatusTable";

export function Configurations(){
    const [categoriesState, setCategoriesState] = useState([])
    const [statusState, setStatusState] = useState([])
    const navigate = useNavigate();
    const params = useParams();

    async function fetchStatus() {
        const response = (await api.get(`/status`)).data
        setStatusState(response)
        return response
    }

    async function fetchCategories() {
        const response = (await api.get(`/categories`)).data
        setCategoriesState(response)
        return response
    }

    function handleSelectCategorieConfig () {
        navigate("/configurations/categories")
        fetchCategories()
    }

    async function handleSelectStatusConfig () {
        navigate("/configurations/status")
    }


    const deleteCategory = (categoryId, description)  => {
        handledeleteCategory(categoryId, description)
    } 

    const deleteStatus = (statusId, description)  => {
        handleDeleteStatus(statusId, description)
    } 

    async function handledeleteCategory(categoryId, description) {
        const deleteCategoryConfirm = confirm(`Deseja realmente deletar a categoria ${description}`)
        if (deleteCategoryConfirm) {
            try {
                await api.delete(`/categories/${categoryId}`)
                alert("Cadastro removido com sucesso.")
                fetchCategories()
                return
            } catch (error) {
                alert("Erro ao deletar o cadastro.")
                console.error(error)
                fetchCategories()
                return
            }
        }
        return
        
    
    }

    async function handleDeleteStatus(statusId, description) {
        const deleteCategoryConfirm = confirm(`Deseja realmente deletar o status ${description}`)
        if (deleteCategoryConfirm) {
            try {
                await api.delete(`/status/${statusId}`)
                alert("Cadastro removido com sucesso.")
                fetchStatus()
                return
            } catch (error) {
                alert("Erro ao deletar o cadastro.")
                console.error(error)
                fetchStatus()
                return
            }
        }
        return
        
    
    }


    function handleBack(){
        navigate("/")
    }


  


    useEffect(() => {
        fetchCategories()
        fetchStatus()

        const interval = setInterval(() => {
            fetchCategories();
            fetchStatus()
        }, 300000);
    
        return () => clearInterval(interval);
    },[params])


    return (
        <Container>
            
            <MenuSideHeaderTable>
                
                <MenuSide>
                    <div className="logo" onClick={handleBack}>
                        <img src={LogoGestaoHelpdesk}/>
                    </div>
                    <div className="menuSite_Buttons">
                        
                        <ButtonText 
                            onClick={handleSelectCategorieConfig} 
                            icon={BiCategory}
                            title="Cadastro de Categorias"
                            selected={params.option == "categories" ? true : false}
                        />
                        <ButtonText 
                            onClick={handleSelectStatusConfig} 
                            icon={GrStatusInfo }
                            title="Cadastro de Status"
                            selected={params.option == "status" ? true : false}
                        />
                        
                    </div>
                   
                </MenuSide>

                <HeaderTable>
                    <Header logo={false}/>
                    {
                        params.option == "categories" &&
                        <Table>
                            <div className="title_config">
                                <ButtonText
                                    onClick={() => {navigate("/configurations/categories/new")}}
                                    title="Inserir"
                                    className="table_button_insert"
                                    icon={TbCategoryPlus}
                                />
                                <h1>Cadastro de Categorias</h1>
                                
                            </div>
                            
                            <CategoriesTable 
                                categories={categoriesState} 
                                rows={12}
                                deleteCategory={deleteCategory}
                            />
                        </Table>
                    }
                    {
                        params.option == "status" &&
                        <Table>
                            <div className="title_config">
                                <ButtonText
                                    onClick={() => {navigate("/configurations/status/new")}}
                                    title="Inserir"
                                    className="table_button_insert"
                                    icon={FaPlus}
                                />
                                <h1>Cadastro de Status</h1>
                                
                            </div>
                            
                            <StatusTable
                                statusList={statusState} 
                                rows={12}
                                deleteStatus={deleteStatus}
                            />
                        </Table>
                    }
                </HeaderTable>
           
            </MenuSideHeaderTable>
            <Footer/> 
           
            
        </Container>
    )
}
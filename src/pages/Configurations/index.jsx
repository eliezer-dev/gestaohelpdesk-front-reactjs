import { Container, CategoriesList, MenuSide, MenuSideHeaderCategoriesList, HeaderCategoriesList} from "./styles";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import { IoPersonAddSharp } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { CategoriesTable } from "../../components/CategoriesTable";
import { ButtonText } from "../../components/ButtonText";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";
import { TbCategoryPlus } from "react-icons/tb";

export function Configurations(){
    const [categoriesState, setCategoriesState] = useState([])
    const navigate = useNavigate();
    const params = useParams();

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


    function handleBack(){
        navigate("/")
    }


  


    useEffect(() => {
        fetchCategories()


        const interval = setInterval(() => {
            fetchCategories();
        }, 300000);
    
        return () => clearInterval(interval);
    },[params])


    return (
        <Container>
            
            <MenuSideHeaderCategoriesList>
                
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

                <HeaderCategoriesList>
                    <Header logo={false}/>
                    {
                        params.option == "categories" &&
                        <CategoriesList>
                            <div className="title_config">
                                <ButtonText
                                    onClick={() => {navigate("/configurations/categories/new")}}
                                    title="Inserir"
                                    className="categories_button_insert"
                                    icon={TbCategoryPlus}
                                />
                                <h1>Cadastro de Categorias</h1>
                                
                            </div>
                            
                            <CategoriesTable 
                                categories={categoriesState} 
                                rows={12}
                                deleteCategory={deleteCategory}
                            />
                        </CategoriesList>
                    }
                </HeaderCategoriesList>
           
            </MenuSideHeaderCategoriesList>
            <Footer/> 
           
            
        </Container>
    )
}
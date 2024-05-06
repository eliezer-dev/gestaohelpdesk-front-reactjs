import { Container, UsersList, MenuSide, MenuSideHeaderUsersList, HeaderUsersList, InputSimple } from "./styles";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import { IoPersonAddSharp } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { UsersTable } from "../../components/UsersTable";

export function Users(){
    const [users, setUsers] = useState([])
    const [optionCode, setOptionCode] = useState(1);
    const [searchState, setSearchState] = useState("");
    const [searchTypeState,setSearchTypeState] = useState(1);
    const navigate = useNavigate();
    

    async function fetchUsers (dataSearch) { 
        setSearchState(dataSearch)
        const search = dataSearch ? dataSearch : ""
        const response = (await api.get(`/users?search=${search}&type=${searchTypeState}`)).data;
        const usersFormated = formatData(response); 
        setUsers(usersFormated)
        return;
        
    }


    function formatData(data) {
        let dataFormated = [];
        data && data.map((user) => {
            const date = new Date(user.createAt);

            
            const name = user.name.length > 65 ? 
                user.name.slice(0,65) + "..." : user.name

            const ticketFormated = {
                id:user.id,
                cpf:user.cpf,
                name,
                cep:user.cep,
                address:user.address,   
                addressNumber:user.addressNumber,
                addressNumber2:user.addressNumber2,
                state:user.state,
                city:user.city,
                email:user.email,
                createAt:date.toLocaleString().replace(/,/g,""),
            };
            dataFormated.push(ticketFormated);
        })
        return dataFormated;
        
    }

    function handleTypeSearch (event) {
        setSearchTypeState(event)
    }

    function handleNewUser() {
        navigate("/users/new")
    }

    const deleteUser = (userId, name)  => {
        handleDeleteUser(userId, name)
    } 

    async function handleDeleteUser(userId, name) {
        const deleteUserConfirm = confirm(`Deseja realmente deletar o usuário ${name}`)
        if (deleteUserConfirm) {
            try {
                await api.delete(`/users/${userId}`)
                alert("Cadastro removido com sucesso.")
                fetchUsers()
                return
            } catch (error) {
                alert("Erro ao deletar o cadastro.")
                console.error(error)
                fetchUsers()
                return
            }
        }
        return
        
    
    }


    function handleBack(){
        navigate("/")
    }


  


    useEffect(() => {
        fetchUsers()


        const interval = setInterval(() => {
            fetchUsers();
        }, 300000);
    
        return () => clearInterval(interval);
    },[optionCode])


    return (
        <Container>
            
            <MenuSideHeaderUsersList>
                
                <MenuSide>
                    <div className="logo" onClick={handleBack}>
                        <img src={LogoGestaoHelpdesk}/>
                    </div>
                    <div className="menuSite_Buttons">
                        <InputSimple>
                            
                            <div className="input_search">
                                <SearchIcon/>
                                <input 
                                    type="text"
                                    value={searchState}
                                    onChange={e => {fetchUsers(e.target.value)}}
                                />
                                <select
                                    onChange={e => {handleTypeSearch(e.target.value)}}
                                >
                                    <option id={1} value={1}>Nome</option>
                                    <option id={2} value={2}>CPF</option>
                                    <option id={3} value={3}>Código</option>
                                </select>
                            </div>  
                        </InputSimple>
                        <Button 
                            title="Novo Usuario" 
                            icon={IoPersonAddSharp }
                            onClick={handleNewUser}
                        />
                        
                    </div>
                   
                </MenuSide>

                <HeaderUsersList>
                    <Header logo={false}/>
                    <UsersList>
                        <h1>Cadastro de Usuários</h1>
                        <UsersTable 
                            users={users} 
                            rows={12}
                            deleteUser={deleteUser}
                        />
                    </UsersList>
                </HeaderUsersList>
           
            </MenuSideHeaderUsersList>
            <Footer/> 
           
            
        </Container>
    )
}
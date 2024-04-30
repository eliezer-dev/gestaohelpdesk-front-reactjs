import { Container, Tickets, MenuSide, MenuSideHeaderTickets, HeaderTickets, InputSimple } from "./styles";
import { Header } from "../../components/Header";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { TicketsTable } from "../../components/TicketsTable";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import { ButtonText } from "../../components/ButtonText";
import { FaPerson } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { FaArrowsAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import { ClientsTable } from "../../components/ClientTable";
import { useNavigate } from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

export function Clients(){
    const [clients, setClients] = useState([])
    const [optionCode, setOptionCode] = useState(1);
    const {user} = useAuth();
    const [searchState, setSearchState] = useState("");
    const [searchTypeState,setSearchTypeState] = useState(1);
    const navigate = useNavigate();
    

    async function fetchClients (dataSearch) { 
        setSearchState(dataSearch)
        const search = dataSearch ? dataSearch : ""
        const response = await api.get(`/clients?search=${search}&type=${searchTypeState}`);
        const clientFormated = formatData(response.data); 
        setClients(clientFormated)
        return;
        
    }


    function formatData(data) {
        let dataFormated = [];
        data && data.map((client) => {
            const date = new Date(client.createAt);

            
            const razaoSocialName = client.razaoSocialName.length > 65 ? 
                client.razaoSocialName.slice(0,65) + "..." : client.razaoSocialName

            const ticketFormated = {
                id:client.id,
                cpfCnpj:client.cpfCnpj,
                razaoSocialName:razaoSocialName,
                businessName:client.businessName,
                cep:client.cep,
                address:client.address,   
                addressNumber:client.addressNumber,
                state:client.state,
                city:client.city,
                email:client.email,
                createAt:date.toLocaleString().replace(/,/g,""),
            };
            dataFormated.push(ticketFormated);
        })
        return dataFormated;
        
    }

    function handleTypeSearch (event) {
        setSearchTypeState(event)
    }

    function handleNewClient() {
        navigate("/clients/new")
    }

    const deleteClient = (clientId, razaoSocialName) => {
        handleDeleteClient(clientId, razaoSocialName)
    } 

    async function handleDeleteClient(clientId, razaoSocialName) {
        const deleteClientConfirm = confirm(`Deseja realmente excluir o cliente ${razaoSocialName}?`)
        if (deleteClientConfirm) {
            try {
                await api.delete(`/clients/${clientId}`)
                alert("Cadastro removido com sucesso.")
                fetchClients()
                return
            } catch (error) {
                alert("Erro ao deletar o cadastro.")
                console.error(error)
                fetchClients()
                return
            }
        }       
        return
    }


    function handleBack(){
        navigate("/")
    }


  


    useEffect(() => {
        fetchClients()


        const interval = setInterval(() => {
            fetchClients();
        }, 60000);
    
        return () => clearInterval(interval);
    },[optionCode])


    return (
        <Container>
            
            <MenuSideHeaderTickets>
                
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
                                    onChange={e => {fetchClients(e.target.value)}}
                                />
                                <select
                                    onChange={e => {handleTypeSearch(e.target.value)}}
                                >
                                    <option id={1} value={1}>Razão</option>
                                    <option id={2} value={2}>CNPJ</option>
                                    <option id={3} value={3}>Código</option>
                                </select>
                            </div>  
                        </InputSimple>
                        <Button 
                            title="Novo Cliente" 
                            icon={IoPersonAddSharp }
                            onClick={handleNewClient}
                        />
                        
                    </div>
                   
                </MenuSide>

                <HeaderTickets>
                    <Header logo={false}/>
                    <Tickets>
                        <h1>Cadastro de Clientes</h1>
                        <ClientsTable 
                            clients={clients} 
                            rows={12}
                            deleteClient={deleteClient}
                            />
                    </Tickets>
                </HeaderTickets>
           
            </MenuSideHeaderTickets>
            <Footer/> 
           
            
        </Container>
    )
}
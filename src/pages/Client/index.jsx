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

export function Client(){
    const [clients, setClients] = useState([])
    const [optionCode, setOptionCode] = useState(1);
    const {user} = useAuth();
    const [searchState, setSearchState] = useState("");
    const [searchTypeState,setSearchTypeState] = useState(1);

    

    async function fetchTickets (dataSearch) { 
        
        setSearchState(dataSearch)

        const search = dataSearch ? dataSearch : ""
  
        const response = await api.get(`/clients?search=${search}&type=${searchTypeState}`);
        console.log(response.data)
        const clientFormated = formatData(response.data); 
        setClients(clientFormated)
        return;
        
    }


    async function fetchTicketsCount() {
        const response = await api.get("/tickets/count");
        setTicketsAssignedUserQty(response.data.ticketsAssignedUserCount)
        setTicketsAssignedOtherUsersQty(response.data.ticketsAssignedOtherUsersCount)
        setTicketsNotAssignedQty(response.data.ticketsNotAssignedCount)
        setAllTicketsQty(response.data.allTicketsCount)
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

    useEffect(() => {
        fetchTickets()
        fetchTicketsCount()


        const interval = setInterval(() => {
            fetchTickets();
        }, 60000);
    
        return () => clearInterval(interval);
    },[optionCode])


    return (
        <Container>
            
            <MenuSideHeaderTickets>
                
                <MenuSide>
                    <div className="logo">
                        <img src={LogoGestaoHelpdesk}/>
                    </div>
                    <div className="menuSite_Buttons">
                        <InputSimple>
                            
                            <div className="input_search">
                                <SearchIcon/>
                                <input 
                                    type="text"
                                    value={searchState}
                                    onChange={e => {fetchTickets(e.target.value)}}
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
                        <Button title="Novo Cliente" icon={IoPersonAddSharp }/>
                        
                    </div>
                   
                </MenuSide>

                <HeaderTickets>
                    <Header logo={false}/>
                    <Tickets>
                        <h1>Cadastro de Clientes</h1>
                        <ClientsTable 
                            clients={clients} 
                            rows={12}
                            />
                    </Tickets>
                </HeaderTickets>
           
            </MenuSideHeaderTickets>
            <Footer/> 
           
            
        </Container>
    )
}
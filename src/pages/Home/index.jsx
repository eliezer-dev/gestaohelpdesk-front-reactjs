import { Container, Section, MenuSide } from "./styles";
import { Header } from "../../components/Header";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { TicketsTable } from "../../components/TicketsTable";

export function Home(){
    const [header, setHeader] = useState("Chamados atribuídos a mim")
    const [ticketsAssignedUser, setTicketsAssignedUser] = useState([]);
    const [ticketsAssignedUserQty, setTicketsAssignedUserQty] = useState([]);
    const [ticketsNotAssigned, setTicketsNotAssigned] = useState([]);
    const [ticketsNotAssignedQty, setTicketsNotAssignedQty] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    const [allTicketsQty, setAllTicketsQty] = useState([]);
    const [ticketsAssignedOtherUsers, setTicketsAssignedOtherUsers] = useState([]);
    const [ticketsAssignedOtherUsersQty, setTicketsAssignedOtherUsersQty] = useState([]);
    const [tickets, setTickets] = useState([])
    const [optionCode, setOptionCode] = useState(1);

    function handleTicketsAssignedUser() {
        setHeader("Chamados atribuídos a mim")
        setTickets(ticketsAssignedUser)
        setOptionCode(1)
    }


    function handleTicketsAssignedOtherUsers() {
        setTickets(ticketsAssignedOtherUsers)
        setHeader("Chamados atribuídos a outros usuários")
        setOptionCode(2)
    }

    function handleTicketsNotAssigned() {
        setTickets(ticketsNotAssigned)
        setHeader("Chamados sem atribuição")
        setOptionCode(3)
    }

    function handleAllTickets() {
        setTickets(allTickets)
        setHeader("Todos os chamados")
        setOptionCode(4)
    }

    async function fetchTickets () {
        const response = await api.get("/tickets")
        
        let allTicketsFormated = formatDate(response.data.allTickets);
        let ticketsAssignedUserFormated = formatDate(response.data.ticketsAssignedUser);
        let ticketsNotSignedFormated = formatDate(response.data.ticketsNotAssigned);
        let ticketsAssignedOtherUsersFormated = formatDate(response.data.ticketsAssignedOtherUsers);

        setAllTickets(allTicketsFormated);
        setAllTicketsQty(allTicketsFormated.length)
        setTicketsAssignedUser(ticketsAssignedUserFormated);
        setTicketsAssignedUserQty(ticketsAssignedUserFormated.length);
        setTicketsNotAssigned(ticketsNotSignedFormated);
        setTicketsNotAssignedQty(ticketsNotSignedFormated.length);
        setTicketsAssignedOtherUsers(ticketsAssignedOtherUsersFormated);
        setTicketsAssignedOtherUsersQty(ticketsAssignedOtherUsersFormated.length);
    
        if (tickets.length == 0) {
            setTickets(ticketsAssignedUserFormated) 
        }
       
        
    }


    function formatDate(data) {
        let dataFormated = [];
        data && data.map((ticket) => {
            const date = new Date(ticket.createAt);
            const ticketFormated = {
                id:ticket.id,
                description:ticket.description,
                shortDescription:ticket.shortDescription,
                client:ticket.client,   
                users:ticket.users,
                status:ticket.status,
                createAt:date.toLocaleString().replace(/,/g,"")
            };
            dataFormated.push(ticketFormated);
        })
        return dataFormated;
        
    }



    useEffect(() => {
        fetchTickets();
    },[])

    setTimeout(() => {
        fetchTickets();
        if (optionCode == 1) {
            setTickets(ticketsAssignedUser)
        } else if(optionCode == 2) {
            setTickets(ticketsAssignedOtherUsers)
        }else if(optionCode == 3) {
            setTickets(ticketsNotAssigned)
        }else {
            setTickets(allTickets)
        }
    }, 10000);


    return (
        <Container>
            <Header/>
            <div className="page">
                <MenuSide>
                    <p onClick={handleTicketsAssignedUser}>Atribuídos a mim ({ticketsAssignedUserQty})</p>
                    <p onClick={handleTicketsAssignedOtherUsers}>Outros usuários ({ticketsAssignedOtherUsersQty})</p>
                    <p onClick={handleTicketsNotAssigned}>Sem atribuição ({ticketsNotAssignedQty})</p>
                    <p onClick={handleAllTickets}>Todos ({allTicketsQty})</p>
                </MenuSide>

        
                <div className="tickets">
                    <Section className="tickets">
                        <h1>{header}</h1>
                        <TicketsTable tickets={tickets}/>
                    </Section>
                </div>
                
                
            </div> 
            
        </Container>
    )
}
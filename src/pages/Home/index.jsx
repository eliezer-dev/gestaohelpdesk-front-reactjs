import { ButtonText } from "../../components/ButtonText";
import { Container, Section } from "./styles";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { RepeatOneSharp, Rowing } from "@mui/icons-material";
import { MenuSide } from "../../components/MenuSide";
import { TicketsTable } from "../../components/TicketsTable";

export function Home(){
    const navigate = useNavigate();
    const {user} = useAuth();
    const [ticketsAssignedUser, setTicketsAssignedUser] = useState([]);
    const [ticketsNotAssigned, setTicketsNotAssigned] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    const [helpdeskAttendants, setHelpdeskAttendants] = useState("");
    
    function handleClick(){
        console.log(helpdeskAttendants)
    }


    async function fetchTickets() {
        const response = await api.get("/tickets")
        
        let allTicketsFormated = formatDate(response.data.allTickets)
        let ticketsAssignedUserFormated = formatDate(response.data.ticketsAssignedUser)
        let ticketsNotSignedFormated = formatDate(response.data.ticketsNotAssigned)
        setAllTickets(allTicketsFormated)
        setTicketsAssignedUser(ticketsAssignedUserFormated)
        setTicketsNotAssigned(ticketsNotSignedFormated)
    }

    function formatDate(data) {
        let dataFormated = []
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
            }
            dataFormated.push(ticketFormated)
        })
        return dataFormated
        
    }

    useEffect(() => {
        fetchTickets();
    },[])

    setTimeout(() => {
        fetchTickets();
    }, 15000);

    return (
        <Container>
            <Header/>
            <div className="page">
                <div className="tickets">
                    <Section className="assignedUser">
                        <h1>Chamados atribuídos a mim</h1>
                        <TicketsTable tickets={ticketsAssignedUser}/>
                    </Section>
                    
                    <Section className="notAssigned">
                        <h1>Chamados não atribuídos</h1>
                        <TicketsTable tickets={ticketsNotAssigned}/>
                    </Section>   
                    <Section className="alltickets">
                        <h1>Todos os chamados</h1>
                        <TicketsTable tickets={allTickets}/>
                    </Section>

                </div>
                
                
            </div> 
            
        </Container>
    )
}
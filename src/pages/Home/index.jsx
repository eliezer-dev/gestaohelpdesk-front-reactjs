import { Container, Tickets, MenuSide, MenuSideHeaderTickets, HeaderTickets } from "./styles";
import { Header } from "../../components/Header";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { TicketsTable } from "../../components/TicketsTable";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/Pages/Header/Logo_Gestao_Helpdesk.svg"
import { ButtonText } from "../../components/ButtonText";
import { FaPerson } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { FaArrowsAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

export function Home(){
    const [header, setHeader] = useState("Chamados atribuídos a mim")
    const [ticketsAssignedUser, setTicketsAssignedUser] = useState([]);
    const [ticketsAssignedUserQty, setTicketsAssignedUserQty] = useState(0);
    const [ticketsNotAssigned, setTicketsNotAssigned] = useState([]);
    const [ticketsNotAssignedQty, setTicketsNotAssignedQty] = useState(0);
    const [allTickets, setAllTickets] = useState([]);
    const [allTicketsQty, setAllTicketsQty] = useState(0);
    const [ticketsAssignedOtherUsers, setTicketsAssignedOtherUsers] = useState([]);
    const [ticketsAssignedOtherUsersQty, setTicketsAssignedOtherUsersQty] = useState(0);
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
        
        let allTicketsFormated = formatData(response.data.allTickets);
        let ticketsAssignedUserFormated = formatData(response.data.ticketsAssignedUser);
        let ticketsNotSignedFormated = formatData(response.data.ticketsNotAssigned);
        let ticketsAssignedOtherUsersFormated = formatData(response.data.ticketsAssignedOtherUsers);

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


    function formatData(data) {
        let dataFormated = [];
        data && data.map((ticket) => {
            const date = new Date(ticket.createAt);

            const calcSlaTimeLeft = function (slaDateTimeEnd) {
                let slaTimeLeft
                const slaTimeLeftInSeconds = Math.trunc((new Date(slaDateTimeEnd) - new Date())/1_000)

                let slaTimeHours = Math.trunc(slaTimeLeftInSeconds/3600),
                slaTimeMinutes = Math.trunc((slaTimeLeftInSeconds%3600)/60),
                slaTimeSeconds = Math.trunc(((slaTimeLeftInSeconds%3600)%60))
            
            if (slaTimeLeftInSeconds < 0){
                slaTimeHours = slaTimeHours * -1
                slaTimeMinutes = slaTimeMinutes * -1
                slaTimeSeconds = slaTimeSeconds * -1
                slaTimeHours = ("00" + slaTimeHours).slice(-2)
                slaTimeMinutes = ("00" + slaTimeMinutes).slice(-2)
                slaTimeSeconds = ("00" + slaTimeSeconds).slice(-2)
                slaTimeLeft = `-${slaTimeHours}:${slaTimeMinutes}:${slaTimeSeconds}`
            } else {
                slaTimeHours = ("00" + slaTimeHours).slice(-2)
                slaTimeMinutes = ("00" + slaTimeMinutes).slice(-2)
                slaTimeSeconds = ("00" + Math.trunc(((slaTimeLeftInSeconds%3600)%60))).slice(-2)
                slaTimeLeft = `${slaTimeHours}:${slaTimeMinutes}:${slaTimeSeconds}`
            }
            return slaTimeLeft
            }
            
            const calcSlaTimeLeftInSeconds = function (slaDateTimeEnd) {
                const slaTimeLeftInSeconds = Math.trunc((new Date(slaDateTimeEnd) - new Date())/1_000)
                return slaTimeLeftInSeconds
            }
            
            const ticketFormated = {
                id:ticket.id,
                description:ticket.description,
                shortDescription:ticket.shortDescription,
                client:ticket.client,   
                users:ticket.users,
                status:ticket.status,
                createAt:date.toLocaleString().replace(/,/g,""),
                slaTimeLeft:calcSlaTimeLeft(ticket.slaDateTimeEnd),
                slaTimeInSeconds:calcSlaTimeLeftInSeconds(ticket.slaDateTimeEnd)
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
            
            <MenuSideHeaderTickets>
                
                <MenuSide>
                    <div className="logo">
                        <img src={LogoGestaoHelpdesk}/>
                    </div>
                    <div className="menuSite_Buttons">
                    <ButtonText 
                        onClick={handleTicketsAssignedUser} 
                        icon={FaPerson }
                        title={`Atribuídos a mim`}
                        othersContents = {`(${ticketsAssignedUserQty})`}
                        selected={optionCode== 1 ? true : false}
                    />
                    <ButtonText 
                        onClick={handleTicketsAssignedOtherUsers} 
                        title={`Outros usuários`}
                        othersContents = {`(${ticketsAssignedOtherUsersQty})`}
                        icon={IoPeople }
                        selected={optionCode== 2 ? true : false}
                    />
                    <ButtonText 
                        onClick={handleTicketsNotAssigned} 
                        title={`Sem atribuição`}
                        othersContents = {`(${ticketsNotAssignedQty})`}
                        icon={FaArrowsAlt }
                        selected={optionCode== 3 ? true : false}
                    />
                    <ButtonText 
                        onClick={handleAllTickets} 
                        title={`Todos`}
                        othersContents = {`(${allTicketsQty})`}
                        icon={IoIosPeople}
                        selected={optionCode== 4 ? true : false}
                    />
                    </div>
                   
                    {/* <p onClick={handleTicketsAssignedUser}>Atribuídos a mim ({ticketsAssignedUserQty})</p>
                    <p onClick={handleTicketsAssignedOtherUsers}>Outros usuários ({ticketsAssignedOtherUsersQty})</p>
                    <p onClick={handleTicketsNotAssigned}>Sem atribuição ({ticketsNotAssignedQty})</p>
                    <p onClick={handleAllTickets}>Todos ({allTicketsQty})</p> */}
                </MenuSide>

                <HeaderTickets>
                    <Header logo={false}/>
                    <Tickets>
                        <h1>{header}</h1>
                        <TicketsTable tickets={tickets} rows={10}/>
                    </Tickets>
                </HeaderTickets>
           
            </MenuSideHeaderTickets>
            <Footer/> 
           
            
        </Container>
    )
}
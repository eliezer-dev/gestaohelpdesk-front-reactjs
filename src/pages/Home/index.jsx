import { Container, Tickets, MenuSide, MenuSideHeaderTickets, HeaderTickets, InputSimple } from "./styles";
import { Header } from "../../components/Header";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { TicketsTable } from "../../components/TicketsTable";
import { Footer } from "../../components/Footer";
import LogoGestaoHelpdesk  from "../../assets/shared/Logo_Gestao_Helpdesk.svg"
import { ButtonText } from "../../components/ButtonText";
import { FaPerson, FaRegSquareCheck } from "react-icons/fa6";
import { IoPeople, IoLockClosed } from "react-icons/io5";
import { FaArrowsAlt} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom";


export function Home(){
    const [header, setHeader] = useState("Chamados atribuídos a mim")
    const [ticketsAssignedUserQty, setTicketsAssignedUserQty] = useState(0);
    const [ticketsNotAssignedQty, setTicketsNotAssignedQty] = useState(0);
    const [ticketsAssignedOtherUsersQty, setTicketsAssignedOtherUsersQty] = useState(0);
    const [allTicketsQty, setAllTicketsQty] = useState(0);
    const [completedTicketsQty, setCompletedTicketsQty] = useState(0);
    const [closedTicketsQty, setClosedTicketsQty] = useState(0);
    const [tickets, setTickets] = useState([])
    const [optionCode, setOptionCode] = useState(1);
    const {user} = useAuth();
    const [searchState, setSearchState] = useState("");
    const [searchTypeState,setSearchTypeState] = useState(1);
    const navigate = useNavigate();

    function handleTicketsAssignedUser() {
        setOptionCode(1)
        setHeader("Chamados atribuídos a mim")
        setSearchState("")
        
    }

    function handleTicketsAssignedOtherUsers() {
        setOptionCode(2)
        setHeader("Chamados atribuídos a outros usuários")
        setSearchState("")
        
    }


    function handleTicketsNotAssigned() {
        setOptionCode(3)
        setHeader("Chamados sem atribuição")
        setSearchState("")
        
    }

    function handleAllTickets() {
        setOptionCode(0)
        setHeader("Todos os chamados")
        setSearchState("")
        
    }

    function handleCompletedTickets() {
        setOptionCode(4)
        setHeader("Chamados Concluídos")
        setSearchState("")
    }

    function handleClosedTickets() {
        setOptionCode(5)
        setHeader("Chamados Fechados")
        setSearchState("")
    }

    async function fetchTickets (dataSearch) { 
        
        setSearchState(dataSearch)

        const search = dataSearch ? dataSearch : ""
  
        if (optionCode == 1) {
            const response = await api.get(`/tickets?user=${user.id}&search=${search}&search_type=${searchTypeState}`);
            const ticketsAssignedUserFormated = formatData(response.data); 
            setTickets(ticketsAssignedUserFormated)
            fetchTicketsCount()
            return;
            

        }else if (optionCode == 2) {
            const response = await api.get(`/tickets?type=1&user=${user.id}&search=${search}&search_type=${searchTypeState}`);
            const ticketsAssignedOtherUsersFormated = formatData(response.data);
            setTickets(ticketsAssignedOtherUsersFormated)
            fetchTicketsCount()
            return    
        
        } else if (optionCode == 3) {
            const response = await api.get(`/tickets?type=2&search=${search}&search_type=${searchTypeState}`);
            const ticketsNotSignedFormated = formatData(response.data);
            setTickets(ticketsNotSignedFormated)
            fetchTicketsCount()
            return
        
        } else if (optionCode == 4) {
            const response = await api.get(`/tickets?type=3&search=${search}&search_type=${searchTypeState}`);
            const completedTicketsFormated = formatData(response.data);
            setTickets(completedTicketsFormated)
            fetchTicketsCount()
            return


        } else if (optionCode == 5) {
            const response = await api.get(`/tickets?type=4&search=${search}&search_type=${searchTypeState}`);
            const closedTicketsFormated = formatData(response.data);
            setTickets(closedTicketsFormated)
            fetchTicketsCount()
            return

        } else if (!optionCode || optionCode == 0) {
            const response = await api.get( `/tickets?search=${search}&search_type=${searchTypeState}`);
            const allTicketsFormated = formatData(response.data);
            setTickets(allTicketsFormated)
            fetchTicketsCount()
            return

        } else {
            console.error("Opção Inválida.");
        }      
        
    }


    async function fetchTicketsCount() {
        const response = await api.get("/tickets/count");
        setTicketsAssignedUserQty(response.data.ticketsAssignedUserCount)
        setTicketsAssignedOtherUsersQty(response.data.ticketsAssignedOtherUsersCount)
        setTicketsNotAssignedQty(response.data.ticketsNotAssignedCount)
        setAllTicketsQty(response.data.allTicketsCount)
        setCompletedTicketsQty(response.data.completedTicketsCount)
        setClosedTicketsQty(response.data.closedTicketsCount)
        return;
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
            
            const shortDescription = ticket.shortDescription.length > 60 ? 
                ticket.shortDescription.slice(0,60) + "..." : ticket.shortDescription

            const ticketFormated = {
                id:ticket.id,
                description:ticket.description,
                shortDescription:shortDescription,
                client:ticket.client,   
                user:ticket.user,
                status:ticket.status,
                createAt:date.toLocaleString().replace(/,/g,""),
                slaTimeLeft:calcSlaTimeLeft(ticket.slaDateTimeEnd),
                slaTimeInSeconds:calcSlaTimeLeftInSeconds(ticket.slaDateTimeEnd)
            };
            dataFormated.push(ticketFormated);
        })
        return dataFormated;
        
    }

    function handleTypeSearch (event) {
        setSearchTypeState(event)
    }

    function handleBack() {
        navigate("/")    
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
                                    onChange={e => {fetchTickets(e.target.value)}}
                                />
                                <select
                                    onChange={e => {handleTypeSearch(e.target.value)}}
                                >
                                    <option id={1} value={1}>Ticket</option>
                                    <option id={2} value={2}>Cliente</option>
                                    <option id={3} value={3}>CNPJ</option>
    
                                </select>
                            </div>
                            
                            
                        </InputSimple>
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
                            onClick={handleCompletedTickets} 
                            title={`Concluídos`}
                            othersContents = {`(${completedTicketsQty})`}
                            icon={FaRegSquareCheck}
                            selected={optionCode== 4 ? true : false}
                        />
                        <ButtonText 
                            onClick={handleAllTickets} 
                            title={`Todos`}
                            othersContents = {`(${allTicketsQty})`}
                            icon={IoIosPeople}
                            selected={optionCode== 0 ? true : false}
                            
                        />
                        <ButtonText 
                            onClick={handleClosedTickets} 
                            title={`Fechados`}
                            othersContents = {`(${closedTicketsQty})`}
                            icon={IoLockClosed}
                            selected={optionCode == 5 ? true : false}
                        />
                        
                    </div>
                   
                </MenuSide>

                <HeaderTickets>
                    <Header logo={false}/>
                    <Tickets>
                        <h1>{header}</h1>
                        <TicketsTable 
                            tickets={tickets} 
                            rows={12}
                            />
                    </Tickets>
                </HeaderTickets>
           
            </MenuSideHeaderTickets>
            <Footer/> 
           
            
        </Container>
    )
}
import { Container } from "./styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';      
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import IconButton  from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrintIcon from '@mui/icons-material/Print';

export function TicketsTable({tickets, rows}) {
    const navigate = useNavigate();
    
    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
          onPageChange(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onPageChange(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onPageChange(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
      
        return (
          <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
              onClick={handleBackButtonClick}
              disabled={page === 0}
              aria-label="previous page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </Box>
        );
      }

    const [page, setPage] = useState(0);
    
    const [rowsPerPage, setRowsPerPage] = useState(rows);

    const [userNameState, setUserNamaState] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    function handleEditTicket (ticketId) {
        navigate(`/ticket/${ticketId}`)
    }
    

    function getUserName(name) {
      if (typeof name === 'string' && name.trim() != '') {
        const userName = name?.trim()?.split(' '); 
        const firstName = userName[0]
        const lastName = userName.length >=2 ? userName[userName.length - 1] : ""
        return `${firstName} ${lastName}`
      }
      return ""
    } 

    useEffect(() => {
      setPage(0)
    }, [tickets])

    return (
        <Container>
          <TableContainer component={Paper}>  
                <div className="contentTable">
                  <Table sx={{minWidth: 650}} size="normal" aria-label="simple table" padding="none">

                  <TableHead>
                      <TableRow>
                      
                      <TableCell align="right"> Chamado </TableCell>
                      <TableCell> Cliente </TableCell>
                      <TableCell sx={{whiteSpace: 'nowrap'}}> Descrição  </TableCell>
                      <TableCell> Atendentes </TableCell>
                      <TableCell style={{width:110}}> Status </TableCell>
                      <TableCell style={{width:100, maxWidth:100}}> Criado Em </TableCell>
                      <TableCell align="left" style={{width:100, maxWidth:100}}> Agendado</TableCell>
                      <TableCell style={{width:90}}> Vencimento </TableCell>
                      
                      <TableCell> Opções </TableCell>
                      <TableCell> T </TableCell>  {/*Atendimento interno ou externo*/}
                      </TableRow>
                  </TableHead>

                  <TableBody>
                        {
                        tickets &&
                        (rowsPerPage > 0
                          ? tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : tickets
                        ).map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell 
                            component="th" 
                            scope="row"
                            align="right"                            
                            sx={{fontSize:14, fontWeight:'bold' }}
                            >
                              {ticket.id}
                            </TableCell >
                            <TableCell sx={{fontSize:14}} > 
                              {ticket.client.businessName}
                            </TableCell>
                            <TableCell sx={
                              {fontSize:14, 
                              whiteSpace: 'nowrap', 
                              width:400,
                              overflow:"hidden",
                              textOverflow: 'ellipsis',
                              maxWidth:400
                              }}>
                              {ticket.shortDescription}
                            </TableCell>
                            <TableCell sx={{fontSize:14, fontWeight:'bold'}} >
                              {getUserName(ticket?.user?.name)}
                            </TableCell>
                            <TableCell sx={{fontSize:14}}>
                              { ticket.status.description}
                            </TableCell>
                            <TableCell sx={{fontSize:12}} >
                              { ticket.createAt}
                            </TableCell>
                            <TableCell align="center" sx={{fontSize:12}} >
                              {ticket.scheduledDateTime ? ticket.scheduledDateTime: " - "}
                            </TableCell>
                            <TableCell className={(ticket.slaTimeInSeconds < 0 && (ticket.status.type != 2 && ticket.status.type != 3)) && "background-color-orange"} 
                             
                              sx={{fontSize:14}}  >
                              {  
                                ticket.status.type == 2 || ticket.status.type == 3 ?
                                "00:00:00" :  
                                ticket.slaTimeLeft
                              }
                            </TableCell>
                            
                            <TableCell  className="ticket_options" sx={{fontSize:14}}>
                              <EditIcon onClick={() => {handleEditTicket(ticket.id)}}/>
                              <PrintIcon/>
                            </TableCell>
                            <TableCell 
                              align="center"
                              sx={{fontSize:14, fontWeight:'bold'}} 
                              > 
                              {ticket.typeOfService == 1 ? "I" : "E"}
                            </TableCell>
                            
                          </TableRow>
                        ))}
                        {/* {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )} */}
                  </TableBody>
                  </Table>
                </div>
                <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 12, 15, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={tickets ? tickets.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                          select: {
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                </TableFooter>      
          </TableContainer>
        </Container>
    )
}
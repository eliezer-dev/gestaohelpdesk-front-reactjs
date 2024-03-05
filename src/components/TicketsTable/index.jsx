import { Container } from "./styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export function TicketsTable({tickets}) {
    return (
        <Container>
        <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell> Numero Ticket </TableCell>
                    <TableCell> Cliente </TableCell>
                    <TableCell> Descrição </TableCell>
                    <TableCell> Atendentes </TableCell>
                    <TableCell> Status </TableCell>
                    <TableCell> Data de Criação </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((ticket) => ( 
                        <TableRow 
                            key={ticket.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.client.razaoSocialName}</TableCell>
                            <TableCell>{ticket.shortDescription}</TableCell>
                            <TableCell>
                            {
                                ticket.users.map((user) => (
                                    user.name + ", "
                                ))
                            }
                            </TableCell>
                            <TableCell>{ticket.status.description}</TableCell>
                            <TableCell>{
                            ticket.createAt
                            
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
                </TableContainer>
            </Container>
    )
}
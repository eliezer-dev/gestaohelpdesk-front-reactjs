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

export function StatusTable({statusList, rows, deleteStatus}) {
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - statusList.length) : 0;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    function handleEditStatus (statusId) {
        navigate(`/configurations/status/${statusId}`)
    }

    function handleDeleteStatus (statusId, description) {
        deleteStatus(statusId, description)
    }
    

    useEffect(() => {
      setPage(0)
    }, [statusList])

    return (
        <Container>
          <TableContainer component={Paper}>  
                <div className="contentTable">
                  <Table sx={{minWidth: 650}} size="normal" aria-label="simple table" padding="none">

                  <TableHead>
                      <TableRow>
                      <TableCell style={{width:60}}> Código</TableCell>
                      <TableCell sx={{width: 400}}> Descrição </TableCell>
                      <TableCell sx={{width:50}}> Opções </TableCell>
                      <TableCell></TableCell>
                      </TableRow>
                  </TableHead>

                  <TableBody>
                        {
                        statusList.length > 0 &&
                        (rowsPerPage > 0
                          ? statusList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : statusList
                        ).map((status) => (
                          <TableRow key={status.id}>
                            <TableCell 
                            component="th" 
                            scope="row" 
                            align="right" 
                           
                            sx={{fontSize:14, paddingRight:2}}
                            >
                              {status?.id}
                            </TableCell >
                            <TableCell sx={{
                                fontSize:14, 
                                width: 400,
                                whiteSpace: 'nowrap',
                                overflow:"hidden",
                                maxWidth:400,
                                textOverflow: 'ellipsis',
                                }} > 
                              {status?.description   }
                            </TableCell>
                            <TableCell  className="ticket_options" sx={{fontSize:14}}>
                              <EditIcon onClick={() => {handleEditStatus(status.id)}}/>
                              <DeleteIcon onClick={() => {handleDeleteStatus(status.id, status.description)}}/>
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
                        count={statusList ? statusList.length : 0}
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
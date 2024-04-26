import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    
    .MuiTableContainer-root {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }

    .contentTable {
        height: calc(100%-52px);
        overflow-y: auto;
    }

    .ticket_options svg {
        margin-right: 8px;
        cursor: pointer;
    }

    .MuiTableFooter-root {
        height: 52px;
    }

    .MuiSvgIcon-root{
        font-size: 16px;
    }


    .MuiTableCell-root {
        padding: 8px 8px 8px 2px; 
    }

    .background-color-orange {
        background-color: ${({theme}) => theme.COLORS.ORANGE}; 
    }
        
    .MuiTablePagination-root  {

    }
   
`
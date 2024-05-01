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
        height: calc(100% - 3.25rem);
        overflow-y: auto;
    }

    .ticket_options svg {
        margin-right: 0.5rem;
        cursor: pointer;
    }

    .MuiTableFooter-root {
        height: 3.25rem;
    }

    .MuiSvgIcon-root{
        font-size: 1rem;
    }

    .MuiTableCell-root {
        padding: 0.5rem 0.5rem 0.5rem .125rem;
    }

    .background-color-orange {
        background-color: ${({theme}) => theme.COLORS.ORANGE}; 
    }
        
    .MuiTablePagination-root  {

    }
`;


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
        font-size: 14px;
    }
    /* .MuiTableCell-sizeSmall {
        padding: 6px 8px;
    } */

    .background-color-orange {
            background-color: ${({theme}) => theme.COLORS.ORANGE}; 
            /* color: ${({theme}) => theme.COLORS.WHITE}; 
            font-weight: bold;

            input {
                color: ${({theme}) => theme.COLORS.WHITE};  
            } */
        }
        

`
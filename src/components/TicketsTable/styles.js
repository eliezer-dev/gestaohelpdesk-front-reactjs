import styled from "styled-components";

export const Container = styled.div`

    .ticket_options svg {
        margin-right: 8px;
        cursor: pointer;
    }

    .background-color-orange {
            background-color: ${({theme}) => theme.COLORS.ORANGE}; 
            /* color: ${({theme}) => theme.COLORS.WHITE}; 
            font-weight: bold;

            input {
                color: ${({theme}) => theme.COLORS.WHITE};  
            } */
        }
        

`
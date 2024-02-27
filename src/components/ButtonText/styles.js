import styled from "styled-components";

export const Container = styled.button`
    background: none;
    border: none;
    color: ${({theme}) => theme.COLORS.GREEN_200};
    font-size: 16px;
    display: flex;
    cursor: pointer;
    
    >svg {
        color:${({theme}) => theme.COLORS.ORANGE};
        width: 20px;
        height: 20px;
    }
`
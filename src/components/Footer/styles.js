import styled from "styled-components";

export const Container = styled.div `
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    height: 116px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-weight: bold;
        font-size: 24px;
    }
`
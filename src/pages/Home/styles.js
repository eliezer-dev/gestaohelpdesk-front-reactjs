import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    h1 {
        color: ${({theme}) => theme.COLORS.PINK}
    }

`;

export const MenuSideHeaderTickets = styled.div `
    display: flex;
    height: calc(100% - 116px);
    
` 

export const HeaderTickets = styled.div `
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

`


export const Tickets = styled.div`
    height: calc(100% - 116px);
    display: flex;
    flex-direction: column;
    h1 {
        color: ${({theme}) => theme.COLORS.WHITE};
        background-color: ${({theme}) => theme.COLORS.BLUE_100};;
        text-align: center;
        height: 40px;
        width: 100%;
    }

    > div {
        height: calc(100% - 40px);
    }
    border-bottom: 1px solid rgba(224, 224, 224, 1);
`
export const MenuSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 180px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    color: ${({theme}) => theme.COLORS.WHITE};
    border-bottom:1px solid rgba(224, 224, 224, 1);
    height: 100%;

    p {
        padding-block: 24px;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        text-align: center;
        cursor: pointer;
        
        &:hover {
            opacity: .5;
        }
        
        
    }

    .logo {
        background-color: ${({theme}) => theme.COLORS.BLUE_100};
        color: ${({theme}) => theme.COLORS.WHITE};
        height: 116px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

`



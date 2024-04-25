import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    h1 {
        color: ${({theme}) => theme.COLORS.PINK}
    }

`;

export const MenuSideHeaderTickets = styled.div `
    display: flex;
    height: calc(100% - 56px);
    
` 

export const HeaderTickets = styled.div `
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

`


export const Tickets = styled.div`
    height: calc(100% - 72px);
    display: flex;
    flex-direction: column;
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({theme}) => theme.COLORS.WHITE};
        background-color: ${({theme}) => theme.COLORS.BLUE_100};;
        text-align: center;
        height: 40px;
        width: 100%;
        font-size: 20px;
    }

    > div {
        height: calc(100% - 40px);
    }
    border-bottom: 1px solid rgba(224, 224, 224, 1);
`
export const MenuSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    color: ${({theme}) => theme.COLORS.WHITE};
    height: 100%;
    
    .logo {
        width: 100%;
        height: 100%;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
        color: ${({theme}) => theme.COLORS.WHITE};
        height: 72px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-bottom: .2px solid  rgba(224, 224, 224, 1);  

        img {
            width: 100%;
            height: 100%;
        }
    }

    .menuSite_Buttons {
        border-right: 1px solid  rgba(224, 224, 224, 1);
    }

`

export const InputSimple = styled.div`
    width: 100%;
    height: 50px;
    padding: 8px 4px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center ;

    .input_search {
        background-color: ${({theme}) => theme.COLORS.WHITE};
        display: flex;
        width: 100%;
        border-radius: 24px;
    }

    input {
        width: 100%;
        height: 100%;
        padding: 4px;
        border: none;
    }    

    select {
        border: none;
        outline: none;
        width: 80px;
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;
        background-color: ${({theme}) => theme.COLORS.ORANGE};
        color: ${({theme}) => theme.COLORS.WHITE};
    }
    

    svg {
        color: #000;
        height: 25px;
        width: 30px;
    }
`



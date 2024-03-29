import styled from "styled-components";

export const Container = styled.div`
        background: ${({theme}) => theme.COLORS.GRAY_200};
        height: 100vh;

        .ticketInfo {
            font-weight: bold;
            margin-top: 24px;
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            
            label {
                margin-bottom: 8px;
            }


            div {
                width: 250px;
                margin-bottom: 24px;
            }
        }
    
    
`

export const Header = styled.div`
    padding-left: 24px;
    height: 116px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700}; 
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    align-items: center;

    h1 {
        color: ${({theme}) => theme.COLORS.WHITE}; 
    }

    svg {
        color: ${({theme}) => theme.COLORS.ORANGE};
        position: absolute;
        top: 40px;
        left: 24px;
        cursor: pointer;
    }

    
`
export const Content = styled.div `
   display: flex;
   justify-content: space-between;
   padding: 24px;

`
export const ClientInfo = styled.div  `
    display: flex;
    flex-direction: column;

    h1 {
        margin-bottom: 24px;
    }
    p {
        font-weight: bold;
        
    }
    span {
        margin-bottom: 12px;
    }
`
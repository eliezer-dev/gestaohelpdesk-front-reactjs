import styled from "styled-components";

export const Container = styled.div`
        background: ${({theme}) => theme.COLORS.GRAY_200};

        .ticketInfo {
            font-weight: bold;
            margin-top: 24px;
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            
            div {
                width: 250px;
                margin-bottom: 24px;

            }

        }
   
`

export const Header = styled.div`
    padding-left: 24px;
    height: 72px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700}; 
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    align-items: center;

    h1 {
        font-size: 24px;
    }

    .header_title {
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        
        div {
            width: 150px;
            margin-bottom: 0;
        }

        input {
            text-align: right;
        }

        .header_tittle_sla {
            width: 350px;
            display: flex;
            align-items: center;
            justify-content:center;
            gap: 8px;
            position: absolute;
            right: 24px;

            label {
                font-weight: bold;
                color: ${({theme}) => theme.COLORS.WHITE}; 
                font-size: 24px;
                text-align: center;
            }
            
            .color-orange {
                color: ${({theme}) => theme.COLORS.ORANGE};
                
            }  

            input {
                text-align: center;
            }
        }
       
    }

    .background-color-orange {
            background-color: ${({theme}) => theme.COLORS.ORANGE}; 
            color: ${({theme}) => theme.COLORS.WHITE}; 
            font-weight: bold;

            input {
                color: ${({theme}) => theme.COLORS.WHITE};  
            }
        }

      

    h1 {
        color: ${({theme}) => theme.COLORS.WHITE}; 
    }

    svg {
        color: ${({theme}) => theme.COLORS.ORANGE};
        position: absolute;
        top: 22px;
        left: 24px;
        cursor: pointer;
        font-size: 20px;
    }

    
`
export const Content = styled.div `
   display: flex;
   gap: 36px;
   justify-content: space-between;
   padding: 24px;
   justify-content: center;

`
export const ClientInfo = styled.div  `
    width: 500px;
    display: flex;
    flex-direction: column;

    h1 {
        margin-bottom: 12px;
    }

    .cepAndAddress {
        display: flex;
        gap: 8px;

        > div:first-of-type {
            width: 150px;
        }
    }

    .cityAndStateInput {
        display: flex;
        gap: 8px;

    }

    .numberAndComplement {
        display: flex;
        gap: 8px;

        > div:first-of-type {
            width: 150px;
        }
    }

`

export const Logo = styled.div `
    position: absolute;
    right: 24px;
    height: 100%;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    color: ${({theme}) => theme.COLORS.WHITE};
    height: 72px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 100%;
        height: 100%;
    }
`
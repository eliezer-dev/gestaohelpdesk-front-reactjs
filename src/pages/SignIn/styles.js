import styled from "styled-components";


export const Container = styled.div `
    padding: 100px 0;
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.COLORS.GREEN_100};

`;

export const Content = styled.div `
    margin: auto;
    width: 1600px;
    height: 100%;
    padding: 24px 96px 24px 48px;

    display: flex;
    justify-content: flex-start;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    border-radius: 12px;

    > img {
        width: 100%;
        height: 100%;
    }

`
export const Form = styled.form `
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    gap: 24px;

    > button:first-of-type {
        align-self: flex-end;
    }

    h1 {
        color: ${({theme}) => theme.COLORS.GREEN_200};
        font-weight: bold;
        color: #79bbb3
    
        
        
    }
`

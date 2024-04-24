import styled from "styled-components";
import background_img from "../../assets/Pages/SignIn/Background_helpdesk.svg"

export const Container = styled.div `
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};

`;

export const Content = styled.div `
    margin: auto;
    width: 100%;
    height: 100%;

    display: flex;

    .content_picture {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }

`
export const Form = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    padding: 8px 24px;
    justify-content: center;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};

    > button:first-of-type {
        align-self: flex-end;
    }

    h1 {
        margin-top: 0px;
        margin-bottom: 24px;
        font-weight: bold;
        text-align: center;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    .form_input {
        margin-bottom: 24px;
    }

    .alignEnd {
        width: 100%;
        display: flex;
        font-size: 12px;
        margin-left: 12px;
        justify-content: end;
        margin-bottom: 8px;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }


`
export const Logo = styled.div `
    width: 108px;
    height: 108px;
    display: flex;
    justify-content: center;

    img {
        height: 100%;
        width: 100%;
    }
    

`

export const Background = styled.div`
    flex:1;
    background: url(${background_img}) no-repeat center center;
    background-size: cover;
    object-fit: cover;
`;

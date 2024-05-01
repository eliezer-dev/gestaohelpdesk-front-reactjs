import styled from "styled-components";
import background_img from "../../assets/Pages/SignIn/Background_helpdesk.svg";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};

`;

export const Content = styled.div`
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

`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 31.25rem; 
    padding: .5rem 1.5rem; 
    justify-content: center;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};

    > button:first-of-type {
        align-self: flex-end;
    }

    h1 {
        margin-top: 0px;
        margin-bottom: 1.5rem;
        font-weight: bold;
        text-align: center;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    .form_input {
        margin-bottom: 1.5rem; 
    }

    .alignEnd {
        width: 100%;
        display: flex;
        font-size: .75rem; 
        margin-left: .75rem;
        justify-content: flex-end;
        margin-bottom: .5rem; 
        color: ${({theme}) => theme.COLORS.ORANGE};
    }
`;

export const Logo = styled.div`
    width: 6.75rem; 
    height: 6.75rem; 
    display: flex;
    justify-content: center;

    img {
        height: 100%;
        width: 100%;
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${background_img}) no-repeat center center;
    background-size: cover;
    object-fit: cover;
`;

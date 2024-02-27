import styled from "styled-components";

export const Container = styled.div `
   
`;

export const Header = styled.div `
    display: flex;
    align-items: center;
    width: 100%;
    height: 144px;
    background: ${({theme}) => theme.COLORS.BACKGROUND_700};

    > button {
        margin-left: 12px;
    }
`

export const Picture = styled.div `
    position: relative;
    width: 186px;
    background: transparent;
    margin: -90px auto 64px;

    > img {
        border-radius: 50%;
        width: 186px;
        height: 186px;
    }

    > label {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({theme}) => theme.COLORS.ORANGE};
        bottom: 7px;
        right: 7px;
        
        input {
            display: none;
            
        }

        svg {
            cursor: pointer;
            width: 20px;
            height: 20px;
            color: ${({theme}) => theme.COLORS.BACKGROUND_800};
        }
    }

`
export const Form = styled.form`
    width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    margin-bottom: 24px;
`;


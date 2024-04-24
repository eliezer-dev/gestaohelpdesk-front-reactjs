import styled from "styled-components";

export const Container = styled.div `
   
`;

export const Header = styled.div `
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 72px;
    background: ${({theme}) => theme.COLORS.BACKGROUND_700};

    .arrow_back {
        margin-left: 24px;
        cursor: pointer;
    }

    svg {
        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    .logo {
        width: 192px;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
        color: ${({theme}) => theme.COLORS.WHITE};
        height: 72px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer; 

        img {
            width: 100%;
            height: 100%;
        }
    }
`

export const Picture = styled.div `
    position: relative;
    width: 186px;
    background: transparent;
    margin: -40px auto 32px;

    > img {
        border-radius: 50%;
        width: 108px;
        height: 108px;
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
    gap: 12px;
    overflow-y: auto;
    margin-bottom: 24px;
`;


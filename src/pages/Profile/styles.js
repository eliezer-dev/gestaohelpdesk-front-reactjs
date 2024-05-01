import styled from "styled-components";

export const Container = styled.div`
   
`;

export const Header = styled.div`
    padding: .25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4.5rem;
    background: ${({theme}) => theme.COLORS.BACKGROUND_700};

    .arrow_back {
        margin-left: 1.5rem;
        cursor: pointer;
    }

    svg {
        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    .logo {
        width: 12rem;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
        color: ${({theme}) => theme.COLORS.WHITE};
        height: 4.5rem;
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
`;

export const Picture = styled.div`
    position: relative;
    width: 11.625rem;
    background: transparent;
    margin: -2.5rem auto 2rem;

    > img {
        border-radius: 50%;
        width: 6.75rem;
        height: 6.75rem;
    }

    > label {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({theme}) => theme.COLORS.ORANGE};
        bottom: 0.437rem;
        right: 0.437rem;
        
        input {
            display: none;
            
        }

        svg {
            cursor: pointer;
            width: 1.25rem;
            height: 1.25rem;
            color: ${({theme}) => theme.COLORS.BACKGROUND_800};
        }
    }
`;

export const Form = styled.form`
    width: 25rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow-y: auto;
    margin-bottom: 1.5rem;
`;

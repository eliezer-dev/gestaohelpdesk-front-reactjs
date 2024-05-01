import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    h1 {
        color: ${({theme}) => theme.COLORS.PINK};
    }
`;

export const MenuSideHeaderUsersList = styled.div`
    display: flex;
    height: calc(100% - 3.5rem);
`;

export const HeaderUsersList = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const UsersList = styled.div`
    height: calc(100% - 4.5rem);
    display: flex;
    flex-direction: column;
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({theme}) => theme.COLORS.WHITE};
        background-color: ${({theme}) => theme.COLORS.BLUE_100};
        text-align: center;
        height: 2.5rem;
        width: 100%;
        font-size: 1.25rem;
    }
    > div {
        height: calc(100% - 2.5rem);
    }
    border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

export const MenuSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 17.5rem;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    color: ${({theme}) => theme.COLORS.WHITE};
    height: 100%;

    .logo {
        width: 100%;
        height: 100%;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
        color: ${({theme}) => theme.COLORS.WHITE};
        height: 4.5rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-bottom: .2px solid rgba(224, 224, 224, 1);
        img {
            width: 100%;
            height: 100%;
        }
    }

    .menuSite_Buttons {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: .2px solid rgba(224, 224, 224, 1);
        button {
            position: absolute;
            bottom: .25rem;
            width: 13.125rem;
        }
    }
`;

export const InputSimple = styled.div`
    width: 100%;
    height: 3.125rem;
    padding: .5rem .25rem;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

    .input_search {
        height: 1.875rem;
        justify-content: center;
        background-color: ${({theme}) => theme.COLORS.WHITE};
        display: flex;
        width: 100%;
        border-radius: 1.25rem;
    }

    input {
        width: 100%;
        height: 100%;
        padding: .25rem;
        border: none;
    }

    select {
        border: none;
        outline: none;
        width: 5rem;
        border-top-right-radius: 1.5rem;
        border-bottom-right-radius: 1.5rem;
        background-color: ${({theme}) => theme.COLORS.ORANGE};
        color: ${({theme}) => theme.COLORS.WHITE};
    }

    svg {
        color: #000;
        height: 1.562rem;
        width: 1.875rem;
    }
`;

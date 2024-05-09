import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    h1 {
        color: ${({theme}) => theme.COLORS.PINK};
    }
`;

export const MenuSideHeaderTable = styled.div`
    display: flex;
    height: calc(100% - 3.5rem);
`;

export const HeaderTable = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Table = styled.div`
    overflow: hidden;
    height: calc(100% - 4.5rem);
    display: flex;
    flex-direction: column;
   
    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({theme}) => theme.COLORS.WHITE};
        text-align: center;
        width: 100%;
        font-size: 1.25rem;
    }
    border-bottom: 1px solid rgba(224, 224, 224, 1);

    .title_config {
        width: 100%;
        height: 2.5rem;
        display: flex;
        background-color: ${({theme}) => theme.COLORS.BLUE_100};
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .table_button_insert {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 1.5rem;
    
    }


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


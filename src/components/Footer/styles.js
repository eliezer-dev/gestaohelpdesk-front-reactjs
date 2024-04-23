import styled from "styled-components";

export const Container = styled.div `
    padding-block: 4px;
    border-top:1px solid rgba(224, 224, 224, 1);
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    height: 56px;
    display: flex;
    justify-content: center;

    img {
        width: 168px;
        height: 100%;
        object-fit: cover;
    }

`
import styled from "styled-components";

export const Container = styled.div `
    padding-block: .25rem;
    border-top:1px solid rgba(224, 224, 224, 1);
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    height: 3.5rem;
    display: flex;
    justify-content: center;

    img {
        width: 10.5rem;
        height: 100%;
        object-fit: cover;
    }

`
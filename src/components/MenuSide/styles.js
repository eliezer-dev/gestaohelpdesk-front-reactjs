import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 180px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    color: ${({theme}) => theme.COLORS.WHITE};

    p {
        padding-block: 24px;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        text-align: center;
        cursor: pointer;
    }
`
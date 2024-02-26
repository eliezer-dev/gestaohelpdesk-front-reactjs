import styled from "styled-components";

export const Container = styled.button `
    width: 100%;
    height: 56px;
    background: ${({theme}) => theme.COLORS.BACKGROUND_900};
    color: ${({theme}) => theme.COLORS.WHITE};
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: ${({theme}) => theme.COLORS.BACKGROUND_700};
    }
`;
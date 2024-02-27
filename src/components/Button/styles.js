import styled from "styled-components";

export const Container = styled.button `
    width: 100%;
    height: 56px;
    
    background: ${({theme}) => theme.COLORS.ORANGE};
    color: ${({theme}) => theme.COLORS.WHITE};
    font-weight: bold;
    cursor: pointer;
    
    border:none;
    border-radius: 24px;
    padding: 24px;
       
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    
    &:hover {
        opacity: .5;
    }

    > svg {
        height: 32px;
        width: 32px;
    }
`;
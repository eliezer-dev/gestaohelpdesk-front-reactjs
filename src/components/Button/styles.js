import styled from "styled-components";

export const Container = styled.button `
    width: 100%;
    height: 40px;
    
    background: ${({theme}) => theme.COLORS.ORANGE};
    color: ${({theme}) => theme.COLORS.WHITE};
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    
    border:none;
    border-radius: 24px;
    padding: 12px;
       
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    
    &:hover {
        opacity: .5;
    }

    > svg {
        height: 16px;
        width: 16px;
    }
`;
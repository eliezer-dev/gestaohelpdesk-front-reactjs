import styled from "styled-components";

export const Container = styled.button `
    width: 100%;
    height: 2.5rem;
    
    background: ${({theme}) => theme.COLORS.ORANGE};
    color: ${({theme}) => theme.COLORS.WHITE};
    font-size: .75rem;
    font-weight: bold;
    cursor: pointer;
    
    border:none;
    border-radius: 1.5rem;
    padding: .75rem;
       
    display: flex;
    gap: .75rem;
    align-items: center;
    justify-content: center;
    
    /* &:hover {
        opacity: unset;
    } */

    /* &:hover.button_disabled {
        opacity: 1;
    } */

    &.button_disabled:hover {
        filter:unset;
    }

    > svg {
        height: 1rem;
        width: 1rem;
    }

    
`;
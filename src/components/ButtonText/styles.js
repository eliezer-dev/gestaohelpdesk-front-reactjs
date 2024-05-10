import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 2.5rem;
    width: 100%;
    align-items: center;
    cursor: pointer;
    
    .button_text {
        height: 100%;
        width: 100%;
        border: none;
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: .875rem;
        display: flex;
        text-align: center;
        justify-content: flex-start;
        align-items: center;
        padding-right: .75rem;
        padding-left: 5px;
        
    }
    
    &:hover {
        opacity: .5;
    }

    svg {
        color:${({theme}) => theme.COLORS.WHITE};
        width: 1.25rem;
        height: 1.25rem;
        margin-right: .5rem;
    }

    span:first-of-type {
        margin-right: .5rem;
    }

    .background_blue {
        color: ${({theme}) => theme.COLORS.WHITE};
        background-color: ${({theme}) => theme.COLORS.BLUE_100};
    }
`
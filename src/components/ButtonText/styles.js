import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 40px;
    width: 100%;
    
    
    .button_text {
        height: 100%;
        width: 100%;
        border: none;
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 14px;
        display: flex;
        cursor: pointer;
        text-align: center;
        justify-content: flex-start;
        align-items: center;
        padding-right: 12px;
        
    }
    
    
    
    svg {
        color:${({theme}) => theme.COLORS.WHITE};
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }

    span:first-of-type {
        margin-right: 8px;
    }

    .background_orange {
        color: ${({theme}) => theme.COLORS.WHITE};
        background-color: ${({theme}) => theme.COLORS.BLUE_100};
    }
`
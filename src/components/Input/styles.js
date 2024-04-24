import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;

    > label {
        font-weight: bold;
        margin-bottom: 4px;
    }

    > div {
        padding-left: 12px;
        width: 100%;
        align-items: center;
        display: flex;
        background: ${({theme}) => theme.COLORS.WHITE_100};
        border-radius: 16px;
    }

    input {
        height: 48px;
        width: 100%;
        padding: 12px;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        background: transparent ;
        border: 0;
        border-radius: 10px;
        
        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }
    }
    
    > svg {
        margin-left: 16px
    }

   
`;
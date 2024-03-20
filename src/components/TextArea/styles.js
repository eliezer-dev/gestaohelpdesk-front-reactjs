import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    border-radius: 16px;
    margin-bottom: 8px;

    >textarea {
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
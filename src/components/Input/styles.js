import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    
    margin-bottom: 8px;

    >input {
        height: 56px;
        width: 100%;
        padding: 12px;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        background: transparent ;
        border: 1px solid ${({theme}) => theme.COLORS.GRAY};
        border-radius: 10px;
        
        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }
    }
    
    > svg {
        margin-left: 16px
    }

   
`;
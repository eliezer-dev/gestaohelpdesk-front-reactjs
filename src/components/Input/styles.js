import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: .75rem;

    > label {
        font-weight: bold;
        margin-bottom: .25rem;
    }

    > div {
        padding-left: .75rem;
        width: 100%;
        align-items: center;
        display: flex;
        background: ${({theme}) => theme.COLORS.WHITE_100};
        border-radius: 1rem;
    }

    input {
        height: 3rem;
        width: 100%;
        padding: .75rem;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        background: transparent ;
        border: 0;
        border-radius: .625rem;
        
        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }
    }
    
    > svg {
        margin-left: 1rem
    }

   
`;
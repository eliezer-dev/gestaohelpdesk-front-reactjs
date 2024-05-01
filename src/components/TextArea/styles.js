import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    border-radius: 1rem;
    margin-bottom: .5rem;
    

    > textarea {
        width: 100%;
        padding: .75rem;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        background: transparent ;
        border: 0;
        border-radius: .625rem;
        resize: none;

        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }
    }
    
    > svg {
        margin-left: 1rem;
    }

    p {
        padding-right: .75rem;
        width: 100%;
        text-align: right;
    }
`;

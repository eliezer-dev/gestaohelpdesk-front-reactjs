import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 2.25rem;
`;

export const Form = styled.form`
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
    width: 31.25rem;
    margin: 0 auto;  
`;

export const Select = styled.div`
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    border-radius: .625rem;
    height: 3rem;
    margin-bottom: .5rem;
    padding: .75rem;


    select {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        background: ${({theme}) => theme.COLORS.WHITE_100};
        
    }

    option {
        padding-block: .5rem;
    }
`;
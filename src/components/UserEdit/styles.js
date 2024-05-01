import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 2.25rem;
`;

export const TicketMain = styled.form`
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
    width: 31.25rem;
    margin: 0 auto;  
`;

export const CepAddressInput = styled.div`
    width: 100%;
    display: flex;
    gap: 1.25rem;
    
    .input_cep {
        width: 11.25rem;
    }
    
    .input_address {
        width: 100%;
    }
`;

export const NumberAddressLine2 = styled.div`
    width: 100%;
    display: flex;
    gap: 1.25rem;

    .addressNumber_input {
        width: 11.25rem;
    }

    .addressNumber2_input {
        width: 100%;
    }
`;

export const Select = styled.select`   
    outline: none;
    width: 5rem;
    height: 3rem;
    border-radius: .625rem;
    border: none;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    margin-bottom: .5rem;
    padding: .75rem;
    color: ${({theme}) => theme.COLORS.GRAY_200};
    
    option {
        padding-block: .5rem;
    }
`;


export const NeighborhoodCityStateInput = styled.div`
    width: 100%;
    display: flex;
    gap: 1.25rem;
    
    #statesSelect {
        width: 11.25rem;
    }
`;

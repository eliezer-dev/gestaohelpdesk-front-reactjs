import styled from "styled-components";

export const Container = styled.div `
    display: flex;
    gap: 36px;
    
`;


export const TicketMain = styled.form `
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: center;
    width: 500px;
    margin: 0 auto;  
   

`

export const CepAddressInput = styled.div`
    width: 100%;
    display: flex;
    gap:20px;
    
    .input_cep {
        width: 180px;
    }
    
    .input_address{
        width: 100%;
    }


`
export const NumberAddressLine2 = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;

    .addressNumber_input {
        width: 180px;
    }

    .addressNumber2_input {
        width: 100%;
    }
`

export const Select = styled.select`   
    outline: none;
    width: 80px;
    height: 48px;
    border-radius: 10px;
    border: none;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    margin-bottom: 8px;
    padding: 12px;
    color: ${({theme}) => theme.COLORS.GRAY_200};
    
    option {
        padding-block:8px;
    }
`    

export const SlaInput = styled.div `
    width: 100%;
    display: flex;
    gap: 20px;
`

export const NeighborhoodCityStateInput = styled.div `
    width: 100%;
    display: flex;
    gap: 20px;
    
    #statesSelect {
        width: 180px;
    }
    
`
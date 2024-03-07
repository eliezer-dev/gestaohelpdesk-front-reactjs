import styled from "styled-components";

export const Container = styled.div`
    h1 {
        color: ${({theme}) => theme.COLORS.PINK}
    }

    .page {
        display: flex;

        
    }

    .tickets {
        width: 100%;
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        color: ${({theme}) => theme.COLORS.WHITE};
        background-color: ${({theme}) => theme.COLORS.GREEN_200};;
        text-align: center;
    }

    border-bottom: 1px solid rgba(224, 224, 224, 1);
`




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
export const MenuSide = styled.div`
    
    display: flex;
    flex-direction: column;
    width: 180px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    color: ${({theme}) => theme.COLORS.WHITE};

    p {
        padding-block: 24px;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        text-align: center;
        cursor: pointer;
        
        &:hover {
            opacity: .5;
        }
        
        
    }

`



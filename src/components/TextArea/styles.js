import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    border-radius: 16px;
    margin-bottom: 8px;
    

    > textarea {
        //position: absolute;
        width: 100%;
        //height: 100%;
        padding: 12px;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        background: transparent ;
        border: 0;
        border-radius: 10px;
        resize: none;

        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }
    }
    
    > svg {
        margin-left: 16px
    }

    p {
        padding-right: 12px;
        width: 100%;
        text-align: right;
    }
`;

import styled from "styled-components";

export const Container = styled.form `
    //top: -64px;
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: center;
    //position: relative;
    width: 600px;
    margin: 0 auto;

    

    .clienteSearch {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        > select {            
        outline: none;
        width: 80%;
        border: none;
        background: ${({theme}) => theme.COLORS.WHITE_100};
        margin-bottom: 8px;

        height: 128px;
        padding: 12px;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        
        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }

        option {
            padding-block:8px;
        }
    }

    }

    #status-select {
        outline: none;
        width: 100%;
        height: 56px;
        border-radius: 10px;
        border: none;
        background: ${({theme}) => theme.COLORS.WHITE_100};
        margin-bottom: 8px;
        padding: 12px;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        
        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }

        option {
            padding-block:8px;
        }
    }


`;
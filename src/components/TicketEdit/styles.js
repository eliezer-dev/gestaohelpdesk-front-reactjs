import styled from "styled-components";

export const Container = styled.form `
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: center;
    width: 600px;
    margin: 0 auto;

    label {
            color: ${({theme}) => theme.COLORS.BLACK};
            margin-bottom: 12px;
            font-weight: bold;
    }    

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

    .scheduled {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: center;
        width: 100%;
    }

    .scheduled_datetime {
        width: 200px;
    }
`;

export const Select = styled.select`
    
    outline: none;
    width: 100%;
    height: 56px;
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

export const CheckBoxItem = styled.div`
    width: 250px;
    display: flex;
    gap: 12px;
    align-items: stretch;
    margin-right: 12px;

    input {
        width: 20px;
        height: 20px;
    }
`
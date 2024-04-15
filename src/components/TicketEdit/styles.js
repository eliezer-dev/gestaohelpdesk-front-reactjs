import styled from "styled-components";

export const Container = styled.div `
    display: flex;
    gap: 36px;
    .activies {
        
    }

`;

export const Annotations = styled.div `
    width: 600px;
    > h1 {
        margin-bottom: 12px;
    }

    .annotationSaved {
        margin-top: 12px;
        border-top: 1px solid black;
        width: 100%;
        height: 600px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .annotations_buttons {
        display: flex;
        gap: 12px;
    
    }
   
    button {
        border-radius: 0;
        margin-top: 0;
        width: 100px;
        padding: 12px;
        height: fit-content;
    }
`

export const TicketMain = styled.form `
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

        div {
            display: flex;
            width: 100%;
            height: 56px;
            
            select {
                width: 110px;
                border: none;
                outline: none;
                border-top-right-radius: 16px;
                border-bottom-right-radius: 16px;
                background-color: ${({theme}) => theme.COLORS.BLUE_100};
                color: ${({theme}) => theme.COLORS.WHITE};
                font-weight: bold;
            }
        }
    }
   
    #inputClientSearch {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    #clients-select {
        margin-top: 2px;
        border-radius: 8px;
        width: 100%;
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

    
`

export const TicketAnnotations = styled.div `
    padding: 8px 24px 0px 8px;
    display: flex;
    align-items: flex-start;
    width: 600px;
    display: flex;
    gap: 12px;
    overflow-y: auto;

    span:first-of-type {
        font-weight: bold;
    }

    span:nth-of-type(2) {
        margin-left: 8px;
    }
    
    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }

    .annotation {
        width: 100%;
    }
`

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
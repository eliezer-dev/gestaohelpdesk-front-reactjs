import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 2.25rem;
    .activies {

    }
`;

export const Annotations = styled.div`
    width: 31.25rem;
    > h1 {
        margin-bottom: 0.75rem;
    }

    .annotationSaved {
        margin-top: 0.75rem;
        border-top: 1px solid black;
        width: 100%;
        height: 37.5rem;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .annotations_buttons {
        display: flex;
        gap: 0.75rem;
    }
   
    button {
        border-radius: 0;
        margin-top: 0;
        width: 6.25rem;
        padding: 0.75rem;
        height: fit-content;
    }
`;

export const TicketMain = styled.form`
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
    width: 31.25rem;
    margin: 0 auto;

    label {
        color: ${({theme}) => theme.COLORS.BLACK};
        margin-bottom: 0.75rem;
        font-weight: bold;
    }    

    .clienteSearch {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        > select {            
            outline: none;
            width: 5rem;
            border: none;
            background: ${({theme}) => theme.COLORS.WHITE_100};
            margin-bottom: 0.5rem;
            height: 8rem;
            padding: 0.75rem;
            color: ${({theme}) => theme.COLORS.GRAY_200};
        
            &::placeholder {
                color: ${({theme}) => theme.COLORS.GRAY_200};
            }

            option {
                padding-block: 0.5rem;
            }
        }   

        div {
            display: flex;
            width: 100%;
            height: 3rem;
            
            select {
                width: 6.875rem;
                border: none;
                outline: none;
                border-top-right-radius: 1rem;
                border-bottom-right-radius: 1rem;
                background-color: ${({theme}) => theme.COLORS.BLUE_100};
                color: ${({theme}) => theme.COLORS.WHITE};
            }
        }
    }
   
    #inputClientSearch {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    #clients-select {
        margin-top: 0.125rem;
        border-radius: 0.5rem;
        width: 100%;
    }

    #status-select {
        outline: none;
        width: 100%;
        height: 3rem;
        border-radius: 0.625rem;
        border: none;
        background: ${({theme}) => theme.COLORS.WHITE_100};
        margin-bottom: 0.5rem;
        padding: 0.75rem;
        color: ${({theme}) => theme.COLORS.GRAY_200};
        
        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }

        option {
            padding-block: .5rem;
        }
    }

    .scheduled {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
        align-items: center;
        width: 100%;
    }

    .scheduled_datetime {
        width: 12.5rem;
    }   
`;

export const TicketAnnotations = styled.div`
    padding: .5rem 1.5rem 0px .5rem;
    display: flex;
    align-items: flex-start;
    width: 31.25rem;
    display: flex;
    gap: .75rem;
    overflow-y: auto;

    span:first-of-type {
        font-weight: bold;
    }

    span:nth-of-type(2) {
        margin-left: .5rem;
    }
    
    img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .annotation_text {
        margin-top: .5rem;
    }

    .annotation {
        width: 100%;
    }
`;

export const Select = styled.select`   
    outline: none;
    width: 100%;
    height: 3rem;
    border-radius: .625rem;
    border: none;
    background: ${({theme}) => theme.COLORS.WHITE_100};
    margin-bottom: .5rem;
    padding: .75rem;
    color: ${({theme}) => theme.COLORS.GRAY_200};
    
    option {
        padding-block: 0.5rem;
    }
`;

export const CheckBoxItem = styled.div`
    width: 15.625rem;
    display: flex;
    gap: .75rem;
    align-items: stretch;
    margin-right: .75rem;
    
    input {
        width: 1.25rem;
        height: 1.25rem;
    }
`;

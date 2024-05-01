import styled from "styled-components"

export const Container = styled.div`
    height: 4.5rem;
    display: flex;
    border-bottom: .2px solid  rgba(224, 224, 224, 1);   

`
export const Logo = styled.div `
        width: 17.5rem;
        height: 100%;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
        color: ${({theme}) => theme.COLORS.WHITE};
        height: 4.5rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-bottom: .2px solid  rgba(224, 224, 224, 1);  

        img {
            width: 100%;
            height: 100%;
        }

`



export const Menu = styled.div `
        cursor: pointer;
        width: 100%;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700}; 
        color: ${({theme}) => theme.COLORS.WHITE}; 
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .75rem;
        
        > span {
            margin-inline: 2.5rem;
            &:hover {
                cursor: pointer;
                text-decoration: underline ${({theme}) => theme.COLORS.BLUE_100} .25rem;

        }
        }
       
        > button {
            width: 9.375rem;
            margin-right: 1.5rem;
            overflow: hidden;
        }

`


export const Profile = styled.div`
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    cursor: pointer;
    width: 9.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: .75rem;
    
    
    > ul {    
        list-style: none;
    

        >li {
            &:hover {
            opacity: .5;
            }
            color: ${({theme}) => theme.COLORS.GRAY_100};
        }

        > li:first-of-type {
            color:${({theme}) => theme.COLORS.WHITE};
            margin-bottom: .25rem;
            font-weight: 700;
            
        }
               
    }

    > img {
        
        width: 4rem;
        height: 4rem;
        border-radius: 50%;

        &:hover {
            opacity: .5;
        }    
    }
`
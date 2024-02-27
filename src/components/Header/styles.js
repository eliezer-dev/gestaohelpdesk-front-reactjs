import styled from "styled-components"

export const Container = styled.div`
    height: 116px;
    display: flex;   

`
export const Logo = styled.div `
        background-color: ${({theme}) => theme.COLORS.BLUE_100};
        color: ${({theme}) => theme.COLORS.WHITE};
        width: 150px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
`



export const Menu = styled.div `
        cursor: pointer;
        width: 100%;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700}; 
        color: ${({theme}) => theme.COLORS.WHITE}; 
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        
        > span {
            margin-inline: 40px;
            &:hover {
                cursor: pointer;
                text-decoration: underline ${({theme}) => theme.COLORS.BLUE_100} 4px;

        }
        }
       
        > button {
            width: 180px;
            height: 40px;
            margin-right: 24px;
        }

`


export const Profile = styled.div`
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    cursor: pointer;
    width: 165px;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    padding-right: 12px;
    
    
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
            margin-bottom: 12px;
            font-weight: 700;
            
        }
               
    }

    > img {
        
        width: 64px;
        height: 64px;
        border-radius: 50%;

        &:hover {
            opacity: .5;
        }    
    }
`
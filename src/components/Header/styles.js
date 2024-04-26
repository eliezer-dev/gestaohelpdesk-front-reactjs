import styled from "styled-components"

export const Container = styled.div`
    height: 72px;
    display: flex;
    border-bottom: .2px solid  rgba(224, 224, 224, 1);   

`
export const Logo = styled.div `
        width: 280px;
        height: 100%;
        background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
        color: ${({theme}) => theme.COLORS.WHITE};
        height: 72px;
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
        gap: 12px;
        
        > span {
            margin-inline: 40px;
            &:hover {
                cursor: pointer;
                text-decoration: underline ${({theme}) => theme.COLORS.BLUE_100} 4px;

        }
        }
       
        > button {
            width: 150px;
            margin-right: 24px;
            overflow: hidden;
        }

`


export const Profile = styled.div`
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    cursor: pointer;
    width: 148px;
    display: flex;
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
            margin-bottom: 4px;
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
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100vh;
        background-color: ${({theme}) => theme.COLORS.WHITE};
        color: ${({theme}) => theme.COLORS.BLACK};
        -webkit-font-smoothing: antialiased;
    }

    body, input, :no-button, textarea{
        font-family: 'Roboto', serif;
        font-size: 14px;
        outline: none
    }

    a {
        text-decoration: none;
    }

    bottom, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }  

    body {
        scrollbar-width: thin;          /* "auto" or "thin" */
        scrollbar-color: ${({theme}) => theme.COLORS.ORANGE} transparent;   /* scroll thumb and track */
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        background: transparent;
        width: .5rem;
    }

    *::-webkit-scrollbar-track {
        background: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => theme.COLORS.ORANGE};
        border-radius: .5rem;
        
    }

`;
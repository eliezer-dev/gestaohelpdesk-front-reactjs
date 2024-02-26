import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({theme}) => theme.COLORS.GREEN_100};
        color: ${({theme}) => theme.COLORS.BLACK};
        -webkit-font-smoothing: antialiased;
    }

    body, input, :no-button, textarea{
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
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
        scrollbar-color: ${({theme}) => theme.COLORS.PINK} transparent;   /* scroll thumb and track */
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 8px;
    }

    *::-webkit-scrollbar-track {
        background: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => theme.COLORS.PINK};
        border-radius: 8px;
    }

`;
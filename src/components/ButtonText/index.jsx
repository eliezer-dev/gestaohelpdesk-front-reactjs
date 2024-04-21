import { useEffect } from "react";
import { Container } from "./styles";

export function ButtonText({icon:Icon, title, othersContents, selected=false, ...rest}) {
    return(
    <Container
        className={selected == true && "background_orange"}
        
    >
        <div 
            className={selected == true ? "background_orange button_text" : "button_text"}
            {...rest}
        >
            {Icon && <Icon size = {20}/>}
            <span>{title}</span>
            <span>{othersContents}</span>
        </div>
       
    </Container>
    )
}
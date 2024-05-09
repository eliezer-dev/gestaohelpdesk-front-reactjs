import { useEffect } from "react";
import { Container } from "./styles";

export function ButtonText({icon:Icon, title, othersContents, selected=false, className, ...rest}) {

    return(
    <Container
        className={className + (selected == true ? " background_blue" : "")}
                
    >
        <div 
            className={selected == true ? "background_blue button_text" : "button_text"}
            {...rest}
        >
            {Icon && <Icon size = {20}/>}
            <span>{title}</span>
            <span>{othersContents}</span>
        </div>
       
    </Container>
    )
}
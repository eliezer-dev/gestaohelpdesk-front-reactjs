import { Container } from "./styles";

export function Input({icon:Icon, className, disabled=false, label, id, ...rest}){
    return(
    <Container className={className} >
        {label && <label>{label}</label>}
        <div id={id}>
            {Icon && <Icon size = {20}/>}
            <input disabled={disabled}{...rest}  />
        </div>
       
    </Container>
    )
}

    
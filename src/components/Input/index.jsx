import { Container } from "./styles";

export function Input({icon:Icon, className, disabled=false, label, id, ...rest}){
    return(
    <Container className={className} id={id}>
        {label && <label>{label}</label>}
        {Icon && <Icon size = {20}/>}
        <input disabled={disabled}{...rest}  />
    </Container>
    )
}

    
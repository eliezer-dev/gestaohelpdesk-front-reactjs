import { Container } from "./styles";

export function Input({icon:Icon, className, disabled, label, ...rest}){
    return(
    <Container className={className}>
        {label && <label>{label}</label>}
        {Icon && <Icon size = {20}/>}
        <input disabled={disabled ? true : false}{...rest}  />
    </Container>
    )
}

    
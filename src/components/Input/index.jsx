import { Container } from "./styles";

export function Input({icon:Icon, className, disabled, ...rest}){
    return(
    <Container className={className}>
        {Icon && <Icon size = {20}/>}
        <input disabled={disabled ? true : false}{...rest}/>
    </Container>
    )
}

    
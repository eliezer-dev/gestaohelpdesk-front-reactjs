import { Container } from "./styles";

export function TextArea({icon:Icon, className, disabled, rows="4",
...rest}){
    return(
    <Container className={className}>
        <textarea disabled={disabled ? true : false} rows={rows} {...rest}/>
    </Container>
    )
}

    
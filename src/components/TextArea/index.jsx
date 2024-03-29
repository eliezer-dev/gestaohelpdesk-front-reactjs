import { Container } from "./styles";

export function TextArea({icon:Icon, className, disabled, rows="4",
characteresUsed, ...rest}){
    return(
    <Container>
        <textarea disabled={disabled ? true : false} rows={rows} {...rest}/>
        <p>{characteresUsed}/1000</p>
    </Container>

    )
}

    
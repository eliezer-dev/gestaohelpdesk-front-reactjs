import { Container } from "./styles";

export function Button({title, icon:Icon, disabled, ...rest}) {
    return(
        <Container
            type="button"
            {...rest}
        >
            {disabled ? "Processando..." : title}
            {Icon && <Icon size = {20}/>}
        </Container>
    )
}
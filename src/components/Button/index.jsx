import { Container } from "./styles";

export function Button({title, icon:Icon, disabled, ...rest}) {
    return(
        <Container
            type="button"
            disabled={disabled}
            {...rest}
            className={disabled && "button_disabled"}
        >
            {title}
            {Icon && <Icon size = {20}/>}
        </Container>
    )
}
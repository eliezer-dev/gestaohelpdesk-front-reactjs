import { Container } from "./styles";

export function ButtonText({img, title, ...rest}) {
    return(
    <Container
        type="button"
        {...rest}
    >
        {img}
        {title}
    </Container>
    )
}
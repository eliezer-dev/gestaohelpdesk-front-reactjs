import { cardActionAreaClasses } from "@mui/material";
import { Container } from "./styles";

export function TextArea({icon:Icon, className, disabled, rows=4,cols=50,
characteresUsed, ...rest}){
    return(
    <Container className={className}>
        <textarea disabled={disabled ? true : false} rows={rows} {...rest}/>
        {   characteresUsed >= 0 &&
            <p>{characteresUsed}/1000</p>
        }
        
        

        {/* {characteresUsed &&
            
        } */}
        
    </Container>

    )
}

    
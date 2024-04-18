import { Container } from "./styles";

export function Input({icon:Icon, className, disabled=false, label, id, classInput, ...rest}){
    return(
    <Container className={className} >
        {label && <label>{label}</label>}
        <div id={id} className={classInput}>
            {Icon && <Icon size = {20}/>}
            <input 
                disabled={disabled} 
                
                {...rest}  
            />
        </div>
       
    </Container>
    )
}

    
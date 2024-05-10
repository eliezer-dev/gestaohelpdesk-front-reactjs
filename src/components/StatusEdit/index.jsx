import { Container, Form, Select} from "./styles";
import { Input } from "../Input";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";


export function StatusEdit({getDataForm, statusData}) {
    
    const [typeState, setTypeState] = useState();
    const [descriptionState, setDescriptionState] = useState();
    const {user} = useAuth()


    function handleSave () {
        const dataFormIsOK = dataFormValidator();
        if (!dataFormIsOK) {
            return;
        }
        
        const dataForm = {
            description: descriptionState,
            type: typeState,   

        }
        getDataForm(dataForm)
        return
    }

   

    function dataFormValidator() {
        if (!descriptionState) {
            alert ("Descrição não informada")
            return false;
        
        }else if (!typeState) {
            alert ("Tipo não informado")
            return false;
        
        }else {
            return true
        }   
         
    }


    useEffect(() => {
        if (statusData) {
            setDescriptionState(statusData?.description)
            setTypeState(statusData?.type)
        }           
    },[statusData])

    return (
        <Container>
                <Form>
                    
                    <Input
                        placeholder="Descrição"
                        type="text"
                        value={descriptionState}
                        onChange={e => {setDescriptionState(e.target.value)}}
                        required
                    />

                    <Select
                        
                    >   
                        <select onChange={e => {setTypeState(e.target.value)}}>
                            <option disabled selected>
                                Selecione o tipo
                            </option>
                            <option  
                                selected={statusData && typeState == 0}
                                value={0}
                                >
                                0 - Aberto
                            </option>
                            <option  
                                selected={statusData && typeState == 1}
                                value={1}
                                >
                                1 - Em Andamento
                            </option>
                            <option  
                                selected={statusData && typeState == 2}
                                value={2}
                                >
                                2 - Concluído
                            </option>
                            <option  
                                selected={statusData && typeState == 3}
                                value={3}
                                >
                                3 - Fechado
                            </option>
                        </select>
                       
                    </Select>
                
                    <Button 
                        title={statusData ? "Atualizar" : "Salvar"} 
                        onClick={handleSave}
                        disabled={user.userRole != 2? true : false}
                        /> 
                </Form>
        </Container>
    )
}
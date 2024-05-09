import { Container, Form, Select} from "./styles";
import { Input } from "../Input";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { api } from "../../services/api";


export function CategoryEdit({getDataForm, categoryData}) {
    
    const [priorityState, setPriorityState] = useState();
    const [descriptionState, setDescriptionState] = useState();


    function handleSave () {
        const dataFormIsOK = dataFormValidator();
        if (!dataFormIsOK) {
            return;
        }
        
        const dataForm = {
            description: descriptionState,
            priority: priorityState,   

        }
        getDataForm(dataForm)
        return
    }

   

    function dataFormValidator() {
        if (!descriptionState) {
            alert ("Descrição não informada")
            return false;
        
        }else if (!priorityState) {
            alert ("Prioridade não informada")
            return false;
        
        }else {
            return true
        }   
         
    }


    useEffect(() => {
        if (categoryData) {
            setDescriptionState(categoryData?.description)
            setPriorityState(categoryData?.priority)
        }           
    },[categoryData])

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
                        <select onChange={e => {setPriorityState(e.target.value)}}>
                            <option disabled selected>
                                Selecione a Prioridade
                            </option>
                            <option  
                                selected={categoryData && priorityState == 0}
                                value={0}
                                >
                                0
                            </option>
                            <option  
                                selected={categoryData && priorityState == 1}
                                value={1}
                                >
                                1
                            </option>
                        </select>
                        {/* <select name="prioritySelect" id="prioritySelect">
                            
                        
                       
                       
                        </select> */}
                    </Select>
                
                    <Button title={categoryData ? "Atualizar" : "Salvar"} onClick={handleSave}/> 
                </Form>
        </Container>
    )
}
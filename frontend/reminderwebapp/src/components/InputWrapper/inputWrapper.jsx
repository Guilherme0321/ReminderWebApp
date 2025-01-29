import { InputWithLabel, Label, Input } from "./style";

function InputWrapper({ id, label, type='text', handleChange=null, value=undefined}) {

    return (
        <InputWithLabel>
            <Input type={type} id={id} name={id} value={value} onChange={handleChange} placeholder="" required/>
            <Label htmlFor={id}>{label}</Label>
        </InputWithLabel>
    )
}

export default InputWrapper;
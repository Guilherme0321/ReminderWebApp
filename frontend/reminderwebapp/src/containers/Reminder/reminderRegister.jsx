import Form from "../../components/Form/style"
import InputWrapper from "../../components/InputWrapper/inputWrapper"
import { Title } from "./style"
import { Button } from "../../components/Button/style"
import ReminderList from "./reminderList"
import { useState } from "react"
import { reminderService } from "../../service/ReminderService/reminderService"
function ReminderRegister() {

    const [formData, setFormData] = useState({
        name: "",
        date: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const date = new Date(formData.date).toISOString();
        const today = new Date().toISOString();

        if(date < today) {
            alert('A data precisa ser futura!');
        } else {
            try {
                const response = await reminderService.create({name: formData.name, date: date});

                if(response.data) {
                    window.location.reload();
                }
                
            } catch (error) {
                console.error('Erro ao criar lembrete:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Title>Criar Lembrete</Title>
                <InputWrapper id="name" label="Nome" handleChange={handleChange} value={formData.name}/>
                <InputWrapper id="date" label="Data" handleChange={handleChange} type="date" value={formData.date}/>
                <Button type="submit">Enviar</Button>
            </Form>
            <ReminderList />
        </>
    )
}

export default ReminderRegister;
import { useEffect, useState } from "react";
import { DeleteButton } from "../../components/Button/style";
import useFetch from "../../hook/useFetch";
import { reminderService } from "../../service/ReminderService/reminderService";
import { DivReminderList } from "./style";

function ReminderList() {
    const { data, loading, error } = useFetch(reminderService.getAll);

    const handleDeleteRemind = async (data) => {
        console.log(data);
        try {
            await reminderService.delete(data);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        } 
    }

    const groupByDate = (data) => {
        return data.reduce((accumulator, item) => {
            const date = new Date(item.date);
            if(!accumulator[date]) {
                accumulator[date] = []
            }
            accumulator[date].push(item.name);
            return accumulator;
        }, {});
    }

    if(loading) return <p>Carregando</p>

    if (error) return <p>{error.message}</p>;

    if (!data || data.length === 0) return <p>Sem dados disponíveis</p>
    
    return (
        <DivReminderList>
            <h1>Lista de Lembretes</h1>
            {Object.entries(groupByDate(data)).map(([date, reminders]) => (
                <div>
                    <h1 key={date}>{new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toLocaleDateString("pt-BR")}</h1>
                    <ul>
                        {reminders.map((item, index) => (
                            <li key={index}><p>{item}</p><DeleteButton type="submit" onClick={() => {
                                handleDeleteRemind({name: item, date: new Date(date).toISOString()});
                            }}>x</DeleteButton></li>
                        ))}
                    </ul>
                </div>
            ))}
        </DivReminderList>
    )
}

export default ReminderList;
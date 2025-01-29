import api from "../apiconfig";

export const reminderService = {
    getAll: () => api.get('api/reminder'),
    create: (reminder) => api.post('/api/reminder', reminder),
    delete: (reminder) => api.delete('/api/reminder', {data: reminder})
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReminderRegister from './containers/Reminder/reminderRegister'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReminderRegister />
  </StrictMode>,
)

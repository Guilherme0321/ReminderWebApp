using ReminderWebAPI.Models;
using ReminderWebAPI.ViewModels;

namespace ReminderWebAPI.Service
{
    public interface IReminderService
    {
        List<Reminder> GetAll();
        Reminder Create(ReminderViewModels viewModels);
        bool Delete(string name, DateTime data);
    }

    public class ReminderService : IReminderService
    {

        private readonly List<Reminder> _reminders;

        public ReminderService()
        {
            _reminders = new List<Reminder>();
        }

        public List<Reminder> GetAll()
        {
            return _reminders.ToList();
        }

        public Reminder Create(ReminderViewModels viewModels)
        {
            Reminder reminder = new Reminder(viewModels.Name, viewModels.Date.Date);

            _reminders.Add(reminder);

            return reminder;
        }

        public bool Delete(string name, DateTime data)
        {
            var result = _reminders.FirstOrDefault(obj => 
                obj.Name == name && obj.Date == data.Date
            );

            if(result != null)
            {
                return _reminders.Remove(result);
            }

            return false;
        }

    }
}

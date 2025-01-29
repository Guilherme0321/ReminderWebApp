namespace ReminderWebAPI.Models
{
    public class Reminder
    {
        public string Name { get; private set; }
        public DateTime Date { get; private set; }

        public Reminder(string name, DateTime date)
        {
            this.Name = name ?? throw new ArgumentNullException(nameof(name));
            this.Date = date;
        }
    }
}


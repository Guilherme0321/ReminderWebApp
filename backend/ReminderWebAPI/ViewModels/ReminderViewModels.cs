using System.ComponentModel.DataAnnotations;

namespace ReminderWebAPI.ViewModels
{
    public class ReminderViewModels
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "A data é obrigatória.")]
        [DataType(DataType.DateTime, ErrorMessage = "A data deve ser válida.")]
        public required DateTime Date { get; set; }
    }
}

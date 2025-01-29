using Microsoft.AspNetCore.Mvc;
using ReminderWebAPI.Models;
using ReminderWebAPI.Service;
using ReminderWebAPI.ViewModels;

namespace ReminderWebAPI.Controllers
{
    [ApiController]
    [Route("api/reminder")]
    public class ReminderController : ControllerBase
    {
        private readonly IReminderService _reminderService;

        public ReminderController(IReminderService reminderService)
        {
            _reminderService = reminderService;
        }

        [HttpPost]
        public IActionResult CreateReminder(ReminderViewModels viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (viewModel.Date.Date > DateTime.Now.Date) {
                Reminder reminder = _reminderService.Create(viewModel);
                return Ok(reminder);
            } else
            {
                return BadRequest("A data já passou. Por favor, insira uma data futura.");
            }

        }

        [HttpDelete]
        public IActionResult DeleteReminder(ReminderViewModels viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (viewModel.Date.Date.Date < DateTime.Now.Date)
            {
                return BadRequest("A data já passou. Por favor, insira uma data futura.");
            }

            bool result = _reminderService.Delete(viewModel.Name, viewModel.Date);
            if (result) { 
                return Ok("Lembrete removido com sucesso!");
            } else
            {
                return NotFound("Lembrete não encontrado.");
            }

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_reminderService.GetAll());
        }
    }
}

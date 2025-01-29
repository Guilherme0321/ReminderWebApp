using Microsoft.AspNetCore.Mvc;
using Moq;
using ReminderWebAPI.Controllers;
using ReminderWebAPI.Models;
using ReminderWebAPI.Service;
using ReminderWebAPI.ViewModels;

namespace ReminderWebAPI.Tests
{
    public class ReminderTests
    {
        private readonly Mock<IReminderService> _mockReminderService;
        private readonly ReminderController _controller;

        public ReminderTests()
        {
            _mockReminderService = new Mock<IReminderService>();
            _controller = new ReminderController(_mockReminderService.Object);
        }

        [Fact]
        public void CreateReminder_WithValidFutureDate_ReturnsOkResult()
        {
            // Arrange
            var viewModel = new ReminderViewModels
            {
                Name = "Teste",
                Date = DateTime.Now.AddDays(1)
            };

            var reminder = new Reminder(viewModel.Name, viewModel.Date);

            _mockReminderService.Setup(s => s.Create(viewModel)).Returns(reminder);

            // Act
            var result = _controller.CreateReminder(viewModel);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedReminder = Assert.IsType<Reminder>(okResult.Value);
            Assert.Equal(viewModel.Name, returnedReminder.Name);
            Assert.Equal(viewModel.Date, returnedReminder.Date);
        }

        [Fact]
        public void CreateReminder_WithPastDate_ReturnsBadRequest()
        {
            // Arrange
            var viewModel = new ReminderViewModels
            {
                Name = "Teste",
                Date = DateTime.Now.AddDays(-1)
            };

            // Act
            var result = _controller.CreateReminder(viewModel);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            dynamic value = badRequestResult.Value;
            Assert.Equal("A data já passou. Por favor, insira uma data futura.", value);
        }

        [Fact]
        public void DeleteReminder_WithValidFutureDate_ReturnsOkResult()
        {
            // Arrange
            var viewModel = new ReminderViewModels
            {
                Name = "Teste",
                Date = DateTime.Now.AddDays(1)
            };

            _mockReminderService.Setup(s => s.Delete(viewModel.Name, viewModel.Date)).Returns(true);

            // Act
            var result = _controller.DeleteReminder(viewModel);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var value = okResult.Value as dynamic;
            Assert.Equal("Lembrete removido com sucesso!", value);
        }

        [Fact]
        public void DeleteReminder_WithPastDate_ReturnsBadRequest()
        {
            // Arrange
            var viewModel = new ReminderViewModels
            {
                Name = "Teste",
                Date = DateTime.Now.AddDays(-1)
            };

            // Act
            var result = _controller.DeleteReminder(viewModel);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var value = badRequestResult.Value as dynamic;
            Assert.Equal("A data já passou. Por favor, insira uma data futura.", value);
        }

        [Fact]
        public void DeleteReminder_WithNonExistingReminder_ReturnsNotFound()
        {
            // Arrange
            var viewModel = new ReminderViewModels
            {
                Name = "Teste",
                Date = DateTime.Now.AddDays(1)
            };

            _mockReminderService.Setup(s => s.Delete(viewModel.Name, viewModel.Date)).Returns(false);

            // Act
            var result = _controller.DeleteReminder(viewModel);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            var value = notFoundResult.Value as dynamic;
            Assert.Equal("Lembrete não encontrado.", value);
        }

        [Fact]
        public void GetAll_ReturnsOkResult()
        {
            // Arrange
            var reminders = new List<Reminder>
            {
                new Reminder("Teste1", DateTime.Now.AddDays(1)),
                new Reminder("Teste2", DateTime.Now.AddDays(2))
            };

            _mockReminderService.Setup(s => s.GetAll()).Returns(reminders);

            // Act
            var result = _controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedReminders = Assert.IsType<List<Reminder>>(okResult.Value);
            Assert.Equal(2, returnedReminders.Count);
        }

        [Fact]
        public void CreateReminder_WithInvalidModel_ReturnsBadRequest()
        {
            // Arrange
            _controller.ModelState.AddModelError("Name", "O nome é obrigatório.");

            var viewModel = new ReminderViewModels
            {
                Name = null,
                Date = DateTime.Now.AddDays(1)
            };

            // Act
            var result = _controller.CreateReminder(viewModel);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void DeleteReminder_WithInvalidModel_ReturnsBadRequest()
        {
            // Arrange
            _controller.ModelState.AddModelError("Name", "O nome é obrigatório.");

            var viewModel = new ReminderViewModels
            {
                Name = null,
                Date = DateTime.Now.AddDays(1)
            };

            // Act
            var result = _controller.DeleteReminder(viewModel);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
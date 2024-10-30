using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Moq.EntityFrameworkCore;
using Moq;
using SAAssignment.Controllers;
using SADataAcessLayer.Models;

using SAServiceLayer;
using SAUnitofWork;
using Moq;
namespace SAUnitTestProject
{
    public class SAControllerTest
    {
        private Mock<IContactService> contactService;
        private Mock<IContactUnitofWork> icu;
        private Mock<ContactService> contService;
        //   private ContactController _controller;

        public SAControllerTest()
        {
            contactService = new Mock<IContactService>();


        }

        public async Task ContactData()
        {
            List<Contact> contacts = new List<Contact>()
         {
            new Contact()
            {
            FirstName="Raj",
             LastName="kumar",
             Email="Raj@yahho.com"
            },
            new Contact()
            {

                 FirstName ="Rahul",
                 LastName="Sharma",
                 Email="Sharma@gmail.com"
            }
        };



        }

        [Fact]

        public async Task TestforOkStatus()
        {
            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };
            // var con = ContactData();
            contactService.Setup(x => x.AddContact(con)).ReturnsAsync(true);
            var _controller = new ContactController(contactService.Object);
            // var resp = await contService.AddContact(con);
            var result = await _controller.PostContact(con);
            //  Assert.That(var result = new { IsSuccess = true, Value = 1 };
            var okResult = result as OkObjectResult;

            // var okResult = result as ActionResult;
            Assert.IsType<OkObjectResult>(okResult);


        }
        [Fact]
        public async Task TestforBaRequestStatus()
        {
            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };
            // var con = ContactData();
            contactService.Setup(x => x.AddContact(con)).ReturnsAsync(true);
            var _controller = new ContactController(contactService.Object);
            // var resp = await contService.AddContact(con);
            var result = await _controller.PostContact(null);
            //  Assert.That(var result = new { IsSuccess = true, Value = 1 };
            var okResult = result as BadRequestResult;

            // var okResult = result as ActionResult;
            Assert.IsType<BadRequestResult>(okResult);


        }
        [Fact]
        public async Task TestforGetAll()
        {
            
            // var resp = await contService.AddContact(con);
            contactService.Setup(x => x.GetAllContact());
            var _controller = new ContactController(contactService.Object);
            var result = await _controller.GetAllContactData();
            Assert.NotNull(result);
        }
        [Fact]
        public async Task TestforGetbyid()
        {
            int Id = 1;
            var con = new Contact() {Id =22, FirstName="test" };
            contactService.Setup(x => x.GetContactById(Id)).Returns(Task.FromResult<Contact>(con));


            var _controller = new ContactController(contactService.Object);
            // var resp = await contService.AddContact(con);
            var result = await _controller.GetAllContactbyId(Id);
            var successid = result as OkObjectResult;
            //var res = successid.Value as Contact;
            Assert.IsType<OkObjectResult>(successid);

//           Assert.Equal(1, res.Id);

        }
        [Fact]
        public async Task TestforGetbyinvalid_Id()
        {
            int Id = 66;
            var con = new Contact() { Id = 22, FirstName = "test" };
            contactService.Setup(x => x.GetContactById(Id)).Returns(Task.FromResult<Contact>(con));

            var _controller = new ContactController(contactService.Object);
            
            var result = await _controller.GetAllContactbyId(88);
            var invaliid = result as NotFoundResult;
            Assert.IsType<NotFoundResult>(invaliid);
        }

        [Fact]
        public async Task TestforDeletebyid()
        {
            
            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };

            contactService.Setup(x => x.DeleteContactById(con.Id)).ReturnsAsync(true);

            var _controller = new ContactController(contactService.Object);
            // var resp = await contService.AddContact(con);
            var result = await _controller.DeleteContact(con.Id);
            // var val=result.Equals(true);
            Assert.IsType<OkObjectResult>(result);

        }
        [Fact]
        public async Task TestforDeletebyid_notfound()
        {

            var con = new Contact()
            {
                Id = -77,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };

            contactService.Setup(x => x.DeleteContactById(con.Id)).ReturnsAsync(true);

            var _controller = new ContactController(contactService.Object);

            // var resp = await contService.AddContact(con);
            var result = await _controller.DeleteContact(con.Id);
            // var val=result.Equals(true);
            var invaliid = result as BadRequestResult;
            Assert.IsType<BadRequestResult>(invaliid);

        }
        [Fact]
        public async Task UpdateContactTest()
        {
            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };
            // var con = ContactData();
            contactService.Setup(x => x.UpdateContact(con)).ReturnsAsync(true);
            var _controller = new ContactController(contactService.Object);
            // var resp = await contService.AddContact(con);
            var result = await _controller.UpdateContactdata(con);
            //  Assert.That(var result = new { IsSuccess = true, Value = 1 };
            var okResult = result as OkObjectResult;

            // var okResult = result as ActionResult;
            Assert.IsType<OkObjectResult>(okResult);


        }


    } }
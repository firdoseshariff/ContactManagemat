using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAServiceLayer;
using SADataAcessLayer;
using Moq;
using SADataAcessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using SAGRepositoryLayer;
using SAUnitofWork;
using Xunit;

namespace SAUnitTestProject
{
    public class SAGenricLayerTest
    {
        private readonly Mock<IGenericRepository<Contact>> _igenService;
        private readonly GenericRepository<Contact> contactService;

        private readonly Mock<IContactUnitofWork> icu;
        private readonly Mock<SadataContext> sad;
        public SAGenricLayerTest()
        {

            contactService = new GenericRepository<Contact>();
            _igenService = new Mock<IGenericRepository<Contact>>();
            sad = new Mock<SadataContext>();
            //   contactService = new GenericRepository<Contact>((SadataContext)_igenService.Object);
        }
        [Fact]
        public async Task CheckAddContact()
        {

            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };
            var res = _igenService.Setup(x => x.AddContact(con)).ReturnsAsync(true);


            var result = contactService.AddContact(con);
            Assert.True(result.Result);



        }
        [Fact]
        public async Task CheckAddContact_Empty()
        {

            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };
            var res = _igenService.Setup(x => x.AddContact(null)).ReturnsAsync(true);
            var result = contactService.AddContact(null);

            Assert.False(result.Result);

        }
        [Fact]
        public async Task GetAlldata()
        {
            _igenService.Setup(x => x.GetAll());
            var result = contactService.GetAll();
            Assert.NotNull(result);
        }
        [Fact]
        public async Task Getdatabyid()
        {
            var con = new Contact()
            {
                Id = 1,
            };
            _igenService.Setup(x => x.GetById(con.Id));
            var result = contactService.GetById(con.Id);
            Assert.NotNull(result);
            //  //Assert.Equal(con.Id, result.Id);

        }
        [Fact]
        public async Task Getdatabyid_invalid()
        {
            var con = new Contact()
            {
                Id = 0,
            };
            _igenService.Setup(x => x.GetById(con.Id));
            var result = contactService.GetById(con.Id);
            Assert.NotNull(result);
            //  //Assert.Equal(con.Id, result.Id);

        }
        [Fact]
        public void CheckUpdateContact()
        {

            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };
            var res = _igenService.Setup(x => x.GetById(con.Id));

            contactService.UpdateContact(con);
            var result = contactService.GetAll();
            Assert.NotNull(result);


        }
        [Fact]
        public void CheckDeleteContact()
        {
            var con = new Contact()
            {
                Id = 1,
                FirstName = "Raj",
                LastName = "kumar",
                Email = "Raj@yahho.com"
            };
            var res = _igenService.Setup(x => x.DeleteContact(con));
             contactService.DeleteContact(con);
            var result = contactService.GetAll();
            Assert.NotNull(result);

        }
    }
}
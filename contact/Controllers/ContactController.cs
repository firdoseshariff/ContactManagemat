﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SADataAcessLayer.Models;
using SAServiceLayer;

namespace SAAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAllContactData()
        {
            try
            {
                var result = await _contactService.GetAllContact();
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        [Route("AddContact")]
        public async Task<IActionResult> PostContact([FromBody] Contact contact)
    {
            try
            {
                var result = await _contactService.AddContact(contact);
                if (result != null)
                {

                    return Ok(result);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpGet]
        [Route("getbyid/id")]
        public async Task<IActionResult> GetAllContactbyId(int id)
        {
            try
            {
                var result = await _contactService.GetContactById(id);
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPut]
        public async Task<IActionResult> UpdateContactdata([FromForm] Contact contact)
        {
            //  var data=_productService.GetProductById(productDetail.Id);
            try
            {
                if (contact != null)
                {
                    var result = await _contactService.UpdateContact(contact);
                    if (result)
                    {
                        return Ok(result);
                    }

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NoContent();
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                if (id > 0)
                {
                    var data = await _contactService.DeleteContactById(id);
                    if (data)
                    {
                        return Ok(data);
                    }
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
            return BadRequest();
        }
    }
}
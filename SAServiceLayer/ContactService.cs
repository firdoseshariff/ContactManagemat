using SADataAcessLayer.Models;
using SAUnitofWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SAServiceLayer
{
    public class ContactService : IContactService
    {
        private readonly IContactUnitofWork _contactService;

        public ContactService(IContactUnitofWork contactservice)
        {
            _contactService = contactservice;
        }
        public async Task<bool> AddContact(Contact contactDetail)
        {
           if(contactDetail !=null)
            {
               var result= await _contactService.Contacts.AddContact(contactDetail);
                var output = _contactService.save();
                if (output > 0)
                    return true;
                else return false;

         
            }

            return false; 
        }

        public async Task<bool> DeleteContactById(int id)
        {
            if(id > 0) 
            
            {
                var result = await _contactService.Contacts.GetById(id);
                if(result!=null)
                {
                    _contactService.Contacts.DeleteContact(result);
                    var res=_contactService.save();
                    if(res>0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return false;
        }

        public async Task<IEnumerable<Contact>> GetAllContact()
        {
        var result= await _contactService.Contacts.GetAll();
            return result;
        }

        public async Task<Contact?> GetContactById(int id)
        {
            if (id > 0)
            {
                var res = await _contactService.Contacts.GetById(id);
                if (res != null)
                {
                    return res;
                }
            }
            return null;
        }

        public async Task<bool> UpdateContact(Contact contactDetail)
        {
            if (contactDetail != null)
            {
                var contact = await _contactService.Contacts.GetById(contactDetail.Id);
                if (contact != null)
                {
                    contact.FirstName = contactDetail.FirstName;
                    contact.LastName = contactDetail.LastName;
                    contact.Email = contactDetail.Email;
                    _contactService.Contacts.UpdateContact(contact);
                    var output = _contactService.save();
                    if (output > 0) return true;
                    else
                    {
                        return false;
                    }

                }
            }
            return false;
            
        }
    }
}

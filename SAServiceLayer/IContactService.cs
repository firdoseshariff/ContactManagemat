using SADataAcessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAServiceLayer
{
   public interface IContactService
    {

        Task<IEnumerable<Contact>> GetAllContact();
        Task<Contact> GetContactById(int id);
        Task<bool> AddContact(Contact contactDetail);
        Task<bool> UpdateContact(Contact contactDetail);
        Task<bool> DeleteContactById(int id);
    }
}

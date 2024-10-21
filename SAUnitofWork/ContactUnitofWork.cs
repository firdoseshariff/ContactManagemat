using SAContactLayer;
using SADataAcessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAUnitofWork
{
    public class ContactUnitofWork : IContactUnitofWork
    {
        public IContactDetails Contacts { get; }
        public SadataContext _sadataContext;
        public ContactUnitofWork(SadataContext sadataContext, IContactDetails contact)
        {
            _sadataContext = sadataContext;
            Contacts = contact;
        }

        public int save()
        {
            return _sadataContext.SaveChanges();
        }
    }
}

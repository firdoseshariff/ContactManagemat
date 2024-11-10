using SADataAcessLayer.Models;
using SAGRepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAContact_Layer
{
  public class ContactDetails:GenericRepository<Contact>,IContactDetails
    {
        public ContactDetails(SadataContext sadataContext):base(sadataContext)
        { }
    }
}

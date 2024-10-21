using SAContactLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAUnitOfWorkLayer
{
    public  interface IContactUnitofWork
    {
        IContactDetails Contacts { get; }

        int save();
    }
}

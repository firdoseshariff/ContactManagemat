using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAGRepositoryLayer
{
    public interface IGenericRepository<T>where T:class
    {
        Task<IEnumerable<T>> GetAll();
        Task<bool> AddContact(T entity);
        Task<T> GetById(int id);

        void UpdateContact(T entity);

        void DeleteContact(T entity);
      //  Task<bool> AddOffer(T entity);


    }
}

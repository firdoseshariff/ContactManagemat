using Microsoft.EntityFrameworkCore;
using SADataAcessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAGRepositoryLayer
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly SadataContext _context;

        private readonly DbSet<T> tabledata;
        public GenericRepository() 
        {
            this._context = new SadataContext();
            tabledata= _context.Set<T>();
        }
        public GenericRepository(SadataContext context) 
        {
            this._context = context;
            tabledata = _context.Set<T>();
        }
        public async Task<bool> AddContact(T entity)
        {
           
            await tabledata.AddAsync(entity);
            return true;

        }

        public void DeleteContact(T entity)
        {
            tabledata.Remove(entity);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            var result =await _context.Contacts.ToListAsync();
            return (IEnumerable<T>)result;
        }

        public async Task<T> GetById(int id)
        {
            return await  tabledata.FindAsync(id);
        
        }

        public void UpdateContact(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentException();
                }
              _context.Entry(entity).State = EntityState.Modified;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}

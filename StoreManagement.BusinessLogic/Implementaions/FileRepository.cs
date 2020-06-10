using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class FileRepository : IFileRepository
    {
        private readonly DataContext _context;

        public FileRepository(DataContext context)
        {
            _context = context;
        }

        public Picture Get(int id)
        {
            return _context.Pictures.FirstOrDefault(x => x.Id == id);
        }

        public Picture Add(Picture fileEntry)
        {
            _context.Pictures.Add(fileEntry);
            _context.SaveChanges();

            return fileEntry;
        }

        public void Update(Picture fileEntry)
        {
            var fileInDb = _context.Pictures.FirstOrDefault(x => x.Id == fileEntry.Id);
            if (fileInDb != null)
            {
                fileInDb.FileLocation = fileEntry.FileLocation;
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var fileInDb = _context.Pictures.FirstOrDefault(x => x.Id == id);
            if (fileInDb != null)
            {
                _context.Pictures.Remove(fileInDb);
                _context.SaveChanges();
            }
        }
    }
}

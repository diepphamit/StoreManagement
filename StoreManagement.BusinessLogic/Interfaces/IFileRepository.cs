using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IFileRepository
    {
        Picture Get(int id);

        Picture Add(Picture fileEntry);

        void Update(Picture fileEntry);

        void Delete(int id);
    }
}

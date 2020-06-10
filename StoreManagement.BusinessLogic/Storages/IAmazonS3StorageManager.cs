using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace StoreManagement.BusinessLogic.Storages
{
    public interface IAmazonS3StorageManager
    {
        void Create(Picture fileEntry, MemoryStream stream);
        byte[] Read(Picture fileEntry);
        void Delete(Picture fileEntry);
        string GetCannedSignedURL(string fileName);
    }
}

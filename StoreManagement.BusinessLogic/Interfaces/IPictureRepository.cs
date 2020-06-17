using StoreManagement.BusinessLogic.Dtos.Pictures;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IPictureRepository
    {
        IEnumerable<Picture> GetAllPictures();
        IEnumerable<Picture> GetAllPicturesByIdProduct(int productId);
        Task<Picture> GetPictureByIdAsync(int id);
        Task<bool> CreatePictureAsync(Picture pictureAdd);
        Task<bool> UpdatePictureAsync(int id, PictureUpdate pictureUpdate);
        Task<bool> DeletePictureAsync(int id);

    }
}

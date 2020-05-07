using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StoreManagement.BusinessLogic.Dtos.Pictures;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class PictureRepository : IPictureRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PictureRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreatePictureAsync(Picture pictureAdd)
        {
            try
            {
                _context.Pictures.Add(pictureAdd);
                await _context.SaveChangesAsync();

                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeletePictureAsync(int id)
        {
            var pictureIndb = await _context.Pictures.FirstOrDefaultAsync(x => x.Id == id);
            if (pictureIndb == null)
                return false;

            try
            {
                _context.Pictures.Remove(pictureIndb);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Picture> GetAllPictures()
        {
            return _context.Pictures.Include(x => x.Product).AsEnumerable();
        }

        public async Task<Picture> GetPictureByIdAsync(int id)
        {
            return await _context.Pictures.Include(x => x.Product).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdatePictureAsync(int id, PictureUpdate pictureUpdate)
        {
            var pictureIndb = await _context.Pictures.FirstOrDefaultAsync(x => x.Id == id);

            if (pictureIndb == null)
                return false;

            try
            {
                pictureIndb.ProductId = pictureUpdate.ProductId;
                pictureIndb.ImageUrl = pictureUpdate.ImageUrl;

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

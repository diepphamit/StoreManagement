using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
    public class CategoryReposirory : ICategoryReposirory
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CategoryReposirory(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateCategoryAsync(Category category)
        {
            try
            {
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var categoryIndb = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (categoryIndb == null) return false;

            try
            {
                _context.Categories.Remove(categoryIndb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> EditCategoryAsync(int id, Category categoryUpdate)
        {
            var categoryIndb = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (categoryIndb == null) return false;

            try
            {
                categoryIndb.Name = categoryUpdate.Name;
                await _context.SaveChangesAsync();

                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Category> GetAllCategories(string keword)
        {
            return _context.Categories.AsEnumerable();
        }

        public async Task<Category> GetCateoryByIdAsync(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}

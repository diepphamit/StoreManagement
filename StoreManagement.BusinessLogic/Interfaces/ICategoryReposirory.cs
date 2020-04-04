using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface ICategoryReposirory
    {
        IEnumerable<Category> GetAllCategories(string keword);
        Task<Category> GetCateoryByIdAsync(int id);
        Task<bool> CreateCategoryAsync(Category category);
        Task<bool> EditCategoryAsync(int id, Category categoryUpdate);
        Task<bool> DeleteCategoryAsync(int id);
    }
}

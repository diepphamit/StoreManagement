using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAllProducts(string keyword);
        IEnumerable<BranchProduct> GetAllProductsInBranch(int BranchId);
        IEnumerable<Product> GetAllProductNotInBranch(int branchId);
        Task<Product> GetProductByIdAsync(int id);
        Task<bool> CreateProductAsync(Product product);
        Task<bool> EditProductAsync(int id, Product product);
        Task<bool> DeleteProductAsync(int id);

    }
}

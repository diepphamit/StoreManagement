using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
    public class BranchProductRepository : IBranchProductRepository
    {
        private readonly DataContext _context;

        public BranchProductRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateBranchProductAsync(BranchProduct branchProduct)
        {
            try
            {
                var result = await _context.BranchProducts.FirstOrDefaultAsync(x => x.ProductId == branchProduct.ProductId && x.BrachId == branchProduct.BrachId);
                if(result != null)
                {
                    result.Quantity += branchProduct.Quantity;
                }
                else _context.BranchProducts.Add(branchProduct);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }

        public async Task<bool> DeleteBranchProductAsync(int id)
        {
            var branchProduct = await _context.BranchProducts.FirstOrDefaultAsync(x => x.Id == id);
            if (branchProduct == null)
                return false;

            try
            {
                _context.Remove(branchProduct);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<bool> EditBranchProductAsync(int id, BranchProduct branchProductUpdate)
        {
            var branchProduct = await _context.BranchProducts.FirstOrDefaultAsync(x => x.Id == id);
            if (branchProduct == null)
                return false;

            try
            {
                branchProduct.Quantity = branchProductUpdate.Quantity;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<BranchProduct> GetAllBranchProduct(int branchId, string keyword)
        {
            if (string.IsNullOrEmpty(keyword)) keyword = "";
            return _context.BranchProducts.Include(x => x.Branch)
                                   .Include(x => x.Product).ThenInclude(x => x.Category)
                                   .Include(x => x.Product).ThenInclude(x => x.Supplier)
                                   .Include(x => x.Product).ThenInclude(x => x.Pictures).Where(y => y.BrachId == branchId && y.Product.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();

        }

        public async Task<BranchProduct> GetBranchProductByIdAsync(int id)
        {
            return await _context.BranchProducts.Include(x => x.Branch).Include(p => p.Product).FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}

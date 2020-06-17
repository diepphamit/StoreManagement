using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IBranchProductRepository
    {
        IEnumerable<BranchProduct> GetAllBranchProduct(int BranchId, string keyword);
        Task<BranchProduct> GetBranchProductByIdAsync(int id);
        Task<bool> CreateBranchProductAsync(BranchProduct branchProduct);
        Task<bool> EditBranchProductAsync(int id, BranchProduct branchProductUpdate);
        Task<bool> DeleteBranchProductAsync(int id);

    }
}

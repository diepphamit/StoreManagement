using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IBranchRepository
    {
        IEnumerable<Branch> GetAllBranches(string keyword);
        Task<Branch> GetBranchById(int id);
        Task<bool> CreateBranch(Branch branch);
        Task<bool> EditBranch(int id, Branch branchupdate);
        Task<bool> DeleteBranch(int id);
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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
    public class BranchRepository : IBranchRepository
    {
        private readonly DataContext _context;

        public BranchRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateBranch(Branch branch)
        {
            try
            {
                _context.Branches.Add(branch);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<bool> DeleteBranch(int id)
        {
            var branch = await _context.Branches.FirstOrDefaultAsync(x => x.Id == id);
            if (branch == null) return false;
            try
            {
                _context.Branches.Remove(branch);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<bool> EditBranch(int id, Branch branchupdate)
        {
            var branch = await _context.Branches.FirstOrDefaultAsync(x => x.Id == id);
            if (branch == null) return false;
            try
            {
                branch.Description = branchupdate.Description;
                branch.Address = branchupdate.Address;
                branch.PhoneNumber = branchupdate.PhoneNumber;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Branch> GetAllBranches(string keyword)
        {
            if (string.IsNullOrEmpty(keyword)) keyword = "";
            return _context.Branches.Where(x => x.Description.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<Branch> GetBranchById(int id)
        {
            return await _context.Branches.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}

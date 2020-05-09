using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface ISupplierRepository
    {
        IEnumerable<Supplier> GetAllSupplier(string keyword);
        Task<Supplier> GetSupplierByIdAsync(int id);
        Task<bool> CreateSupplierAsync(Supplier supplier);
        Task<bool> EditSupplierAsync(int id, Supplier supplier);
        Task<bool> DeleteSupplierAsync(int id);

    }
}

using StoreManagement.BusinessLogic.Dtos.Statistical;
using StoreManagement.BusinessLogic.Helper;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IStatisticalRepository
    {
        IEnumerable<ProductStatistical> ProductSoles(string keyword);
        IEnumerable<ProductStatistical> ProductNotTaken(int branchId, string keyword);
        IEnumerable<CustomerByProduct> GetAllCustomerByProduct();
        IEnumerable<CustomerByProduct> GetAllStaffByProduct();
        IEnumerable<NumberProduct> ProductSapHet(int branchId);

    }
}

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
        IEnumerable<ProductStatistical> ProductSoles();
        IEnumerable<ProductStatistical> ProductNotTaken();

    }
}

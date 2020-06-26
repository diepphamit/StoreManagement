using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IUpdatTotalPriceRepository
    {
        void UpdateTotalPrice(int orderId);
    }
}

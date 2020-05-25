using StoreManagement.BusinessLogic.Dtos.Orders;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Core
{
    public class TotalRevenueMonth
    {
        public int Total { get; set; }
        public IEnumerable<RevenueUI> Revenues { get; set; }
    }
}

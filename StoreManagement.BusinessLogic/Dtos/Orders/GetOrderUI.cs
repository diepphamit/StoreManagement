using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Orders
{
    public class GetOrderUI
    {
        public string keyword { get; set; }
        public int customerId { get; set; }
        public bool status { get; set; }
        public DateTime startDay { get; set; }
        public DateTime endDay { get; set; }
    }

}

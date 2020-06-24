using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.OrderDetails
{
    public class ListOrderDetailUpdate
    {
        public List<OrderDetailUpdate> items { get; set; }
        public List<OrderDetailUpdate> itemDeletes { get; set; }
    }
}

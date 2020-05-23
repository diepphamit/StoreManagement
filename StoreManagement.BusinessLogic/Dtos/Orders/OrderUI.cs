using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Orders
{
    public class OrderUI
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public bool Status { get; set; }
        public int Code { get; set; }
        public int TotalPrice { get; set; }
    }
}

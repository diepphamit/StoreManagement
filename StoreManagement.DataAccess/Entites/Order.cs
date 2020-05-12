using System;
using System.Collections.Generic;

namespace StoreManagement.DataAccess.Entites
{
    public class Order
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public virtual User Staff { get; set; }
        public int?  CustomerId{ get; set; }
        public virtual User Customer { get; set; }
        public DateTime OrderDate { get; set; }
        public bool Status { get; set; }
        public int Code { get; set; }
        public int TotalPrice { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

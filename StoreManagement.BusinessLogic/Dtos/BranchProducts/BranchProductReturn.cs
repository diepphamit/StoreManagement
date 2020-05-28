using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.BranchProducts
{
    public class BranchProductReturn
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BrachId { get; set; }
        public string BranchDescription { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
}

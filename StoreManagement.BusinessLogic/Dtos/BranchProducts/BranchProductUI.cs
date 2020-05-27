using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.BranchProducts
{
    public class BranchProductUI
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BrachId { get; set; }
        public int ProductId { get; set; }
    }
}

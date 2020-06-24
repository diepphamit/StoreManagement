using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Statistical
{
    public class NumberProduct
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Barcode { get; set; }
        public string SupplierName { get; set; }
        public string CategoryName { get; set; }
    }
}

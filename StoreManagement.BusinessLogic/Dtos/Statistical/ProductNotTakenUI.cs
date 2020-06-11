using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Statistical
{
    public class ProductNotTakenUI
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Barcode { get; set; }
        public int QuantityStatistical { get; set; }
        public int ProductQuantity { get; set; }
    }
}

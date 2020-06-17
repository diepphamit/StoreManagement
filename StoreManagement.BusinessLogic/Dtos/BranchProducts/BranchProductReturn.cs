using StoreManagement.BusinessLogic.Dtos.Pictures;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.BranchProducts
{
    public class BranchProductReturn
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string BranchDescription { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Barcode { get; set; }
        public string SupplierName { get; set; }
        public string CategoryName { get; set; }
        public List<PictureDto> Pictures { get; set; }
    }
}

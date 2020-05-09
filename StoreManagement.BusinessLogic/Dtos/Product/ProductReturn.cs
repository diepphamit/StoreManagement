using StoreManagement.BusinessLogic.Dtos.Pictures;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Product
{
    public class ProductReturn
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Barcode { get; set; }
        public string SupplierName { get; set; }
        public string CategoryName { get; set; }
        public List<PictureDto> Pictures{ get; set; }
    }
}

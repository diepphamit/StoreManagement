using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Helper
{
    public class ProductStatistical
    {
        public Product product { get; set; }
        public int QuantityStatistical { get; set; }
        public int ProductQuantity { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.OrderDetails
{
    public class OrderDetailUI
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int DisCount { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public string ProductName { get; set; }
    }
}
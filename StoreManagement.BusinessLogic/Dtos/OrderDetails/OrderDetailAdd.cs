﻿using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.OrderDetails
{
    public class OrderDetailAdd
    {
        public int Quantity { get; set; }
        public int DisCount { get; set; }
        public int ProductId { get; set; }
    }
}
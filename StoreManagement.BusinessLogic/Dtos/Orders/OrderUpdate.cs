﻿using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Orders
{
    public class OrderUpdate
    {
        public int StaffId { get; set; }
        public int CustomerId { get; set; }
        public bool Status { get; set; }
        public int Code { get; set; }
    }
}
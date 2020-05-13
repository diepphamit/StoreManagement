using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Core
{
    public class PaginationSet<T>
    {
        public int Total { get; set; }

        public IEnumerable<T> Items { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.DataAccess.Entites
{
    public class Branch
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public virtual ICollection<BranchProduct> BranchProducts { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StoreManagement.DataAccess.Entites
{
    public class BranchProduct
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BrachId { get; set; }
        [ForeignKey("BrachId")]
        public virtual Branch Branch { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}

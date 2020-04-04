using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StoreManagement.DataAccess.Entites
{
    public class UserPermission
    {
        public int Id { get; set; }
        public int GroupUserId { get; set; }
        [ForeignKey("GroupUserId")]
        public virtual GroupUser GroupUser { get; set; }
        public int PermissionId { get; set; }
        [ForeignKey("PermissionId")]
        public virtual Permission Permission { get; set; }

        public bool Licensed { get; set; }
    }
}

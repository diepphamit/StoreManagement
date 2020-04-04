using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.DataAccess.Entites
{
    public class GroupUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<UserPermission> UserPermissions { get; set; }
    }
}

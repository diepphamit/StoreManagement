using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Auth
{
    public class UserAuthReturn
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string GroupRole { get; set; }
        public List<string> Roles { get; set; }
    }
}

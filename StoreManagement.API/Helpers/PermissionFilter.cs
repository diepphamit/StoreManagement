using Hangfire.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StoreManagement.DataAccess.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreManagement.API.Helpers
{
    public class PermissionFilter : AuthorizeAttribute, IAuthorizationFilter
    {

        public string Permissions { get; set; }


        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (string.IsNullOrEmpty(Permissions))
            {
                //Validation cannot take place without any permissions so returning unauthorized
                context.Result = new UnauthorizedResult();
                return;
            }


                //The below line can be used if you are reading permissions from token
                //var permissionsFromToken = context.HttpContext;

                //Identity.Name will have windows logged in user id, in case of Windows Authentication
                //Indentity.Name will have user name passed from token, in case of JWT Authenntication and having claim type "ClaimTypes.Name"
                var userName = context.HttpContext.User.Identity.Name;
            //var assignedPermissionsForUser = MockData.UserPermissions.Where(x => x.Key == userName).Select(x => x.Value).ToList();
            //var x = new DataContext();
            // var permissions = new DataContext.Users.Include(x => x.GroupUser).Include(y => y.GroupUser.UserPermissions).Where(x => x.Username == userName).ToList();
            //var requiredPermissions = Permissions.Split(","); //Multiple permissiosn can be received from controller, delimiter "," is used to get individual values
            //foreach(var x in requiredPermissions)
            //{
            //    if (assignedPermissionsForUser.Contains(x))
            //        return; //User Authorized. Wihtout setting any result value and just returning is sufficent for authorizing user
            //}

            //context.Result = new UnauthorizedResult();
            using(DataContext db = new DataContext())
            {
                List<string> listPermission = (from user in db.Users
                                     join userGroup in db.GroupUsers on user.GroupUserId equals userGroup.Id
                                     join userPer in db.UserPermissions on userGroup.Id equals userPer.GroupUserId
                                     join per in db.Permissions on userPer.PermissionId equals per.Id
                                     where (user.Username == userName && userPer.Licensed == true)
                                     select per.Name).ToList();

                foreach (var item in listPermission)
                {
                    if (Permissions.Contains(item))
                        return; //User Authorized. Wihtout setting any result value and just returning is sufficent for authorizing user
                }

            }
            context.Result = new UnauthorizedResult();
            return;
        }
    }
}

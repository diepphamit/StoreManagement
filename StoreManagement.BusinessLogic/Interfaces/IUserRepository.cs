using StoreManagement.BusinessLogic.Dtos.Users;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers(string keyword);
        Task<User> GetUserByIdAsync(int id);
        Task<bool> CreateUserAsync(UserForCreate userCreate);
        Task<bool> EditUserAsync(int id, UserUpdateDto userUpdate);
        Task<bool> DeleteUserAsync(int id);
        Task<bool> UserExists(string username);
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StoreManagement.BusinessLogic.Dtos.Users;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateUserAsync(UserForCreate userCreate)
        {
            var user = _mapper.Map<User>(userCreate);
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(userCreate.Password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var userInDb = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if (userInDb == null) 
                return false;

            try
            {
                _context.Users.Remove(userInDb);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> EditUserAsync(int id, UserUpdateDto userUpdate)
        {
            var userInDb = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if (userInDb == null)
                return false;

            try
            {
                userInDb.Address = userUpdate.Address;
                userInDb.DateOfBirth = userUpdate.DateOfBirth;
                userInDb.Email = userUpdate.Email;
                userInDb.Gender = userUpdate.Gender;
                userInDb.GroupUserId = userUpdate.GroupUserId;
                userInDb.Image = userUpdate.Image;
                userInDb.Name = userUpdate.Name;
                userInDb.PhoneNumber = userUpdate.PhoneNumber;

                _context.Users.Update(userInDb);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<User> GetAllUsers(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                keyword = "";

            return _context.Users.Include(x => x.GroupUser)
                .Where(p => p.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.Include(x => x.GroupUser).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> UserExists(string username)
        {
            var userInDb = await _context.Users.FirstOrDefaultAsync(p => p.Username == username);

            return userInDb != null;
        }
    }

}

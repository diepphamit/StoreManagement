using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.API.Helpers;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.Users;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [PermissionFilter(Permissions = "READ_USER")]
        [HttpGet]
        public IActionResult GetAllUsers(string keyword, int page = 1, int pagesize = 10)
        {
            var currentUser = HttpContext.User.Identity.Name;
            var listUsers = _userRepo.GetAllUsers(keyword);
            listUsers = listUsers.Where(x => x.Username != currentUser);

            int totalCount = listUsers.Count();

            var query = listUsers.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

            var respone = _mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(query);

            var paginationset = new PaginationSet<UserDto>
            {
                Total = totalCount,
                Items = respone
            };

            return Ok(paginationset);

        }

        [PermissionFilter(Permissions = "READ_USER")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepo.GetUserByIdAsync(id);

            if (user == null)
                return NotFound();

            return Ok(_mapper.Map<UserDto>(user));
        }

        [PermissionFilter(Permissions = "CREATE_USER")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserForCreate userForCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _userRepo.UserExists(userForCreate.Username))
                return BadRequest("The User has been existed");

            var result = await _userRepo.CreateUserAsync(userForCreate);
            if (result)
                return Ok();

            return BadRequest();
        }

        [PermissionFilter(Permissions = "UPDATE_USER")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto userForUpdate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userRepo.EditUserAsync(id, userForUpdate);
            if (result)
                return Ok();

            return BadRequest();
        }

        [PermissionFilter(Permissions = "DELETE_USER")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userRepo.DeleteUserAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }


    }
}
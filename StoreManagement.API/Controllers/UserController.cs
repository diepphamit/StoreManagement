﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public IActionResult GetAllUsers(string keyword)
        {
            var listUsers = _userRepo.GetAllUsers(keyword);

            return Ok(_mapper.Map<IEnumerable<UserDto>>(listUsers));

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepo.GetUserByIdAsync(id);

            if (user == null)
                return NotFound();

            return Ok(_mapper.Map<UserDto>(user));
        }

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
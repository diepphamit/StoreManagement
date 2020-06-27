using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StoreManagement.BusinessLogic.Dtos;
using StoreManagement.BusinessLogic.Dtos.Auth;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(
            IAuthRepository authRepository,
            IConfiguration configuration,
            IMapper mapper
            )
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserAuthDto userAuthDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            userAuthDto.Username = userAuthDto.Username.ToLower();
            if (await _authRepository.UserExists(userAuthDto.Username))
                return BadRequest(new { message = false});

            var userToCrete = new User
            {
                Username = userAuthDto.Username,
                GroupUserId = 3
            };

            var createdUser = await _authRepository.Register(userToCrete, userAuthDto.Password);

            return Ok(new { message = true});
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(UserAuthDto userAuthDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userInDb = await _authRepository.Login(userAuthDto.Username, userAuthDto.Password);

            if (userInDb == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userInDb.Id.ToString()),
                new Claim(ClaimTypes.Name, userInDb.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

            var userReturn = _mapper.Map<UserAuthReturn>(userInDb);
            userReturn.Roles = _authRepository.getRolesByUsername(userInDb.Username);

            return Ok(new
            {
                access_token = tokenHandler.WriteToken(token),
                user = userReturn
            });
        }

        [Route("loginadmin")]
        [HttpPost]
        public async Task<IActionResult> LoginAdmin([FromBody]UserAuthDto userAuthDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userInDb = await _authRepository.LoginAdminPage(userAuthDto.Username, userAuthDto.Password);

            if (userInDb == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userInDb.Id.ToString()),
                new Claim(ClaimTypes.Name, userInDb.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

            var userReturn = _mapper.Map<UserAuthReturn>(userInDb);
            userReturn.Roles = _authRepository.getRolesByUsername(userInDb.Username);

            return Ok(new
            {
                access_token = tokenHandler.WriteToken(token),
                user = userReturn
            });
        }
    }
}
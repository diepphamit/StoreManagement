using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public List<string> Get()
        {
            return new List<string> { "a", "b" };
        }
    }
}
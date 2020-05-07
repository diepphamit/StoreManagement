using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Dtos.Pictures;
using StoreManagement.BusinessLogic.Interfaces;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureRepository _repo;
        private readonly IMapper _mapper;

        public PictureController(IPictureRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllPicture()
        {
            var pictures = _repo.GetAllPictures();

            var picturesReturn = _mapper.Map<IEnumerable<PictureUI>>(pictures);

            return Ok(picturesReturn);
        }
    }
}
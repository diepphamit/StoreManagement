using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.Pictures;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureRepository _pictureRepository;
        private readonly IMapper _mapper;

        public PictureController(IPictureRepository repo, IMapper mapper)
        {
            _pictureRepository = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllPicture(int page = 1, int pagesize = 10)
        {
            try
            {
                var list = _pictureRepository.GetAllPictures();

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<Picture>, IEnumerable<PictureUI>>(query);

                var paginationset = new PaginationSet<PictureUI>()
                {
                    Items = response,
                    Total = totalCount
                };

                return Ok(paginationset);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPictureById(int id)
        {
            var picture = await _pictureRepository.GetPictureByIdAsync(id);

            if (picture == null)
                return NotFound();

            return Ok(_mapper.Map<PictureDto>(picture));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePicture([FromBody]PictureForAdd pictureAdd)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var picture = _mapper.Map<Picture>(pictureAdd);
            var result = await _pictureRepository.CreatePictureAsync(picture);

            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePicture(int id)
        {
            var result = await _pictureRepository.DeletePictureAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePicture(int id, [FromBody]PictureUpdate pictureUpdate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //var picture = _mapper.Map<Picture>(pictureUpdate);

            var result = await _pictureRepository.UpdatePictureAsync(id, pictureUpdate);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
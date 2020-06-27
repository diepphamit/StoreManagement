using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.API.Helpers;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.Pictures;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.BusinessLogic.Storages;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureRepository _pictureRepository;
        private readonly IMapper _mapper;
        private readonly IFileRepository _repository;
        private readonly IAmazonS3StorageManager _storageManager;

        public PictureController(IPictureRepository repo,
            IMapper mapper,
            IFileRepository repository,
            IAmazonS3StorageManager storageManager)
        {
            _pictureRepository = repo;
            _mapper = mapper;
            _repository = repository;
            _storageManager = storageManager;
        }

        [AllowAnonymous]
        [Route("GetAllPicture")]
        [HttpGet]
        public IActionResult GetAllPicture(int page = 1, int pagesize = 10)
        {
            try
            {
                var list = _pictureRepository.GetAllPictures();

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                

                foreach(var item in query)
                {
                    item.ImageUrl = _storageManager.GetCannedSignedURL(item.FileLocation);
                }

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

        [AllowAnonymous]
        [Route("GetAllPictureByProductId")]
        [HttpGet]
        public IActionResult GetAllPictureByProductId(int productId, int page = 1, int pagesize = 10)
        {
            try
            {
                var list = _pictureRepository.GetAllPicturesByIdProduct(productId);

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);



                foreach (var item in query)
                {
                    item.ImageUrl = _storageManager.GetCannedSignedURL(item.FileLocation);
                }

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

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPictureById(int id)
        {
            var picture = await _pictureRepository.GetPictureByIdAsync(id);

            if (picture == null)
                return NotFound();

            var pictureToReturn = new PictureDto
            {
                Id = picture.Id,
                ProductId = picture.ProductId,
                ImageUrl = _storageManager.GetCannedSignedURL(picture.FileLocation)
            };

            return Ok(pictureToReturn);
        }

        [PermissionFilter(Permissions = PermissionConstant.CREATE_PICTURE)]
        [HttpPost]
        public async Task<IActionResult> CreatePicture([FromForm]UploadFileDto pictureAdd)
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            //var picture = _mapper.Map<Picture>(pictureAdd);
            //var result = await _pictureRepository.CreatePictureAsync(picture);

            //if (result)
            //    return Ok();

            //return BadRequest();

            int? id = null;

            try
            {
                var fileEntry = new Picture
                {
                    ProductId = pictureAdd.ProductId,
                    Size = pictureAdd.FormFile.Length,
                    UploadedTime = DateTime.Now,
                    FileName = pictureAdd.FormFile.FileName,
                    FileLocation = Guid.NewGuid().ToString()
                };

                _repository.Add(fileEntry);

                id = fileEntry.Id;

                using (var stream = new MemoryStream())
                {
                    await pictureAdd.FormFile.CopyToAsync(stream);
                    _storageManager.Create(fileEntry, stream);
                }

                _repository.Update(fileEntry);

                return Ok(fileEntry.Id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                if (id.HasValue)
                {
                    _repository.Delete(id.Value);
                }

                return BadRequest();
            }
        }

        [PermissionFilter(Permissions = PermissionConstant.DELETE_PICTURE)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePicture(int id)
        {
            var pictureInDb = _repository.Get(id);
            var result = await _pictureRepository.DeletePictureAsync(id);
            _storageManager.Delete(pictureInDb);

            if (result)
                return Ok();

            return BadRequest();
        }

        [PermissionFilter(Permissions = PermissionConstant.UPDATE_PICTURE)]
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
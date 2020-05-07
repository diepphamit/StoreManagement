using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Dtos.Categories;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllCategories(string keyword)
        {
            var categories = _categoryRepository.GetAllCategories(keyword);

            if (categories == null)
                return NotFound();

            return Ok(_mapper.Map<IEnumerable<CategoryUI>>(categories));

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);

            if (category == null)
                return NotFound();

            return Ok(_mapper.Map<CategoryUI>(category));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody]CategoryUI category)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryAdd = _mapper.Map<Category>(category);
            var result = await _categoryRepository.CreateCategoryAsync(categoryAdd);

            if (result) 
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryRepository.DeleteCategoryAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody]CategoryUI category)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryUpdate = _mapper.Map<Category>(category);

            var result = await _categoryRepository.EditCategoryAsync(id, categoryUpdate);
            if (result) 
                return Ok();

            return BadRequest();

        }
    }
}
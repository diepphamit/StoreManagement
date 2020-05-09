using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Dtos.Product;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllProducts(string keyword)
        {
            var products = _productRepository.GetAllProducts(keyword);

            if (products == null)
                return NotFound();

            return Ok(_mapper.Map<IEnumerable<ProductReturn>>(products));

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            if (product == null)
                return NotFound();

            return Ok(_mapper.Map<ProductReturn>(product));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody]ProductForCreate productCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var productAdd = _mapper.Map<Product>(productCreate);
            var result = await _productRepository.CreateProductAsync(productAdd);

            if (result) 
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productRepository.DeleteProductAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody]ProductForUpdate product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var productUpdate = _mapper.Map<Product>(product);

            var result = await _productRepository.EditProductAsync(id, productUpdate);
            if (result) 
                return Ok();

            return BadRequest();

        }
    }
}
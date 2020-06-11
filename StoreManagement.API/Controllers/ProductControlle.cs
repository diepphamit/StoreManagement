﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Math.EC.Rfc7748;
using StoreManagement.BusinessLogic.Core;
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
        public IActionResult GetAllProducts(string keyword, int page = 1, int pageSize = 10)
        {
            try
            {
                var list = _productRepository.GetAllProducts(keyword);

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pageSize).Take(pageSize);

                var response = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductReturn>>(query);

                var paginationSet = new PaginationSet<ProductReturn>()
                {
                    Items = response,
                    Total = totalCount,
                };

                return Ok(paginationSet);
            }
            catch (Exception ex)
            {
                //_logger.LogError("Có lỗi trong quá trình lấy dữ liệu", ex.ToString());

                return BadRequest();
            }

        }
        [Route("GetAllProductInBranch")]
        [HttpGet]
        public IActionResult GetAllProductInBranches(int BranchId, int page = 1, int pagesize = 10)
        {
            var products = _productRepository.GetAllProductsInBranch(BranchId);

            int totalCount = products.Count();

            try
            {
                var query = products.OrderByDescending(x => x.ProductId).Skip((page - 1) * pagesize).Take(pagesize);

                var respone = _mapper.Map<IEnumerable<BranchProduct>, IEnumerable<ProductReturn>>(query);

                var paginationset = new PaginationSet<ProductReturn>
                {
                    Items = respone,
                    Total = totalCount
                };

                return Ok(paginationset);
            }
            catch (Exception)
            {
                return BadRequest();
            }

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
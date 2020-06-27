using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Math.EC.Rfc7748;
using StoreManagement.API.Helpers;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.Product;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.BusinessLogic.Storages;
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
        private readonly IAmazonS3StorageManager _storageManager;

        public ProductController(IProductRepository productRepository, IMapper mapper, IAmazonS3StorageManager storageManager)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _storageManager = storageManager;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAllProducts(string keyword, int page = 1, int pageSize = 10)
        {
            try
            {
                var list = _productRepository.GetAllProducts(keyword);

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pageSize).Take(pageSize);
                foreach (var item in query)
                {
                    if (item.Pictures != null)
                    {
                        foreach (var pic in item.Pictures)
                        {
                            pic.ImageUrl = _storageManager.GetCannedSignedURL(pic.FileLocation);
                        }
                    }

                }

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
        [AllowAnonymous]
        [Route("GetAllProductInBranch")]
        [HttpGet]
        public IActionResult GetAllProductInBranches(int BranchId, int page = 1, int pagesize = 10)
        {
            var products = _productRepository.GetAllProductsInBranch(BranchId);

            int totalCount = products.Count();

            try
            {
                var query = products.OrderByDescending(x => x.ProductId).Skip((page - 1) * pagesize).Take(pagesize);

                foreach (var item in query)
                {
                    if (item.Product.Pictures != null)
                    {
                        foreach (var pic in item.Product.Pictures)
                        {
                            pic.ImageUrl = _storageManager.GetCannedSignedURL(pic.FileLocation);
                        }
                    }

                }

                var respone = _mapper.Map<IEnumerable<BranchProduct>, IEnumerable<ProductInBranchReturn>>(query);

                var paginationset = new PaginationSet<ProductInBranchReturn>
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
        [Route("GetAllProductNotInBranch")]
        [HttpGet]
        public IActionResult GetAllProductNotInBranch(int branchId)
        {
            var product = _productRepository.GetAllProductNotInBranch(branchId);
            var productReturn = _mapper.Map<IEnumerable<ProductNotInBranch>>(product);

            return Ok(productReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            if (product == null)
                return NotFound();


            if (product.Pictures != null)
            {
                foreach (var pic in product.Pictures)
                {
                    pic.ImageUrl = _storageManager.GetCannedSignedURL(pic.FileLocation);
                }
            }
        

            return Ok(_mapper.Map<ProductForReturn>(product));

        }

        [PermissionFilter(Permissions = PermissionConstant.CREATE_PRODUCT)]
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

        [PermissionFilter(Permissions = PermissionConstant.DELETE_PRODUCT)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productRepository.DeleteProductAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }

        [PermissionFilter(Permissions = PermissionConstant.UPDATE_PRODUCT)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody]ProductForReturn product)
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
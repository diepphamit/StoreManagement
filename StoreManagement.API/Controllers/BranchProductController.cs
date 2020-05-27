using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.BranchProducts;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchProductController : ControllerBase
    {
        private readonly IBranchProductRepository _branchProductRepository;
        private readonly IMapper _mapper;

        public BranchProductController(IBranchProductRepository branchProductRepository, IMapper mapper)
        {
            _branchProductRepository = branchProductRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllBranchProduct(int page = 1, int pagesize = 10)
        {
            try
            {
                var branchProduct = _branchProductRepository.GetAllBranchProduct();

                int totalCount = branchProduct.Count();

                var query = branchProduct.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<BranchProduct>, IEnumerable<BranchProductReturn>>(query);

                var paginationset = new PaginationSet<BranchProductReturn>
                {
                    Total = totalCount,
                    Items = response
                };

                return Ok(paginationset);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranchProductById(int id)
        {
            var branchProduct = await _branchProductRepository.GetBranchProductByIdAsync(id);
            if (branchProduct == null)
                return BadRequest();

            return
                Ok(_mapper.Map<BranchProductReturn>(branchProduct));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBranchProduct([FromBody]BranchProductUI branchProductAdd)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var branchProduct = _mapper.Map<BranchProduct>(branchProductAdd);

            var result = await _branchProductRepository.CreateBranchProductAsync(branchProduct);

            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBranchProduct(int id, [FromBody]BranchProductUI branchProductUpdate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var branchProduct = _mapper.Map<BranchProduct>(branchProductUpdate);

            var result = await _branchProductRepository.EditBranchProductAsync(id, branchProduct);

            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranchProduct(int id)
        {
            var result = await _branchProductRepository.DeleteBranchProductAsync(id);

            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
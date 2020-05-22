using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.BusinessLogic.Dtos.Suppliers;
using StoreManagement.DataAccess.Entites;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.NetworkInformation;
using StoreManagement.BusinessLogic.Core;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierRepository _supplierRepository;
        private readonly IMapper _mapper;

        public SupplierController(ISupplierRepository supplierRepository, IMapper mapper)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllSupplier(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var list = _supplierRepository.GetAllSupplier(keyword);

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<Supplier>, IEnumerable<SupplierUI>>(query);

                var paginationset = new PaginationSet<SupplierUI>()
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
        public async Task<IActionResult> GetSupplierById(int id)
        {
            var supplier = await _supplierRepository.GetSupplierByIdAsync(id);
            if (supplier == null) return NotFound();
            return Ok(_mapper.Map<SupplierUI>(supplier));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSupplier([FromBody]SupplierUI supplierui)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var supplier = _mapper.Map<Supplier>(supplierui);
            var result = await _supplierRepository.CreateSupplierAsync(supplier);
            if (result) return Ok();
            return BadRequest();
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSupplier(int id, [FromBody]SupplierUI supplierUI)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var supplier = _mapper.Map<Supplier>(supplierUI);
            var result = await _supplierRepository.EditSupplierAsync(id, supplier);
            if (result) return Ok();
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var result = await _supplierRepository.DeleteSupplierAsync(id);
            if (result) return Ok();
            return BadRequest();
        }
    }
}
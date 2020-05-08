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
        public IActionResult GetAllSupplier(string keyword)
        {
            var suppliers = _supplierRepository.GetAllSupplier(keyword);
            if (suppliers == null) return NotFound();
            return Ok(_mapper.Map<IEnumerable<SupplierUI>>(suppliers));
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
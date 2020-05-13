using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Dtos.Branches;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IBranchRepository _branchRepository;
        private readonly IMapper _mapper;

        public BranchController(IBranchRepository branchRepository, IMapper mapper)
        {
            _branchRepository = branchRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllBranch(string keyword)
        {
            var branches = _branchRepository.GetAllBranches(keyword);
            if(branches==null) return NotFound();
            return Ok(_mapper.Map<IEnumerable<BranchUI>>(branches));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranchByid(int id)
        {
            var branch = await _branchRepository.GetBranchById(id);
            if (branch == null) return NotFound();
            return Ok(_mapper.Map<BranchUI>(branch));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBranch([FromBody]BranchUI branchUI)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var branchAdd = _mapper.Map<Branch>(branchUI);
            var result = await _branchRepository.CreateBranch(branchAdd);
            if (result) return Ok();
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBranch(int id, [FromBody]BranchUI branchUI)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var branch = _mapper.Map<Branch>(branchUI);
            var result = await _branchRepository.EditBranch(id, branch);
            if (result) return Ok();
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var result = await _branchRepository.DeleteBranch(id);
            if (result) return Ok();
            return BadRequest();
        }
    }
}
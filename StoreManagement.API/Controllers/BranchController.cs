using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.API.Helpers;
using StoreManagement.BusinessLogic.Core;
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

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAllBranch(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var list = _branchRepository.GetAllBranches(keyword);

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<Branch>, IEnumerable<BranchUI>>(query);

                var pagination = new PaginationSet<BranchUI>()
                {
                    Items = response,
                    Total = totalCount
                };

                return Ok(pagination);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranchByid(int id)
        {
            var branch = await _branchRepository.GetBranchById(id);
            if (branch == null) return NotFound();
            return Ok(_mapper.Map<BranchUI>(branch));
        }

        [PermissionFilter(Permissions = "CREATE_BRANCH")]
        [HttpPost]
        public async Task<IActionResult> CreateBranch([FromBody]BranchUI branchUI)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var branchAdd = _mapper.Map<Branch>(branchUI);
            var result = await _branchRepository.CreateBranch(branchAdd);
            if (result) return Ok();
            return BadRequest();
        }

        [PermissionFilter(Permissions = "UPDATE_BRANCH")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBranch(int id, [FromBody]BranchUI branchUI)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var branch = _mapper.Map<Branch>(branchUI);
            var result = await _branchRepository.EditBranch(id, branch);
            if (result) return Ok();
            return BadRequest();
        }

        [PermissionFilter(Permissions = "DELETE_BRANCH")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var result = await _branchRepository.DeleteBranch(id);
            if (result) return Ok();
            return BadRequest();
        }
    }
}
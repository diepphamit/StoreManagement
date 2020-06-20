using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.Statistical;
using StoreManagement.BusinessLogic.Helper;
using StoreManagement.BusinessLogic.Interfaces;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticalController : ControllerBase
    {
        private readonly IStatisticalRepository _statistical;
        private readonly IMapper _mapper;

        public StatisticalController(IStatisticalRepository statistical, IMapper mapper)
        {
            _statistical = statistical;
            _mapper = mapper;
        }
        [Route("ProductSole")]
        [HttpGet]
        public ActionResult GetProductSole(int page = 1, int pagesize = 10)
        {
            var productSoles = _statistical.ProductSoles();

            int totalCount = productSoles.Count();
            try
            {
                var query = productSoles.OrderByDescending(x => x.QuantityStatistical).Skip((page - 1) * pagesize).Take(pagesize);
                var respone = _mapper.Map<IEnumerable<ProductSoleUI>>(query);
                var paginationset = new PaginationSet<ProductSoleUI>
                {
                    Total = totalCount,
                    Items = respone
                };
                return Ok(paginationset);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }

        }

        [Route("ProductNotTaken")]
        [HttpGet]
        public ActionResult ProductNotTaken(int page = 1, int pagesize = 10)
        {
            var ProductNotTakens = _statistical.ProductNotTaken();

            int totalCount = ProductNotTakens.Count();

            try
            {
                var query = ProductNotTakens.OrderByDescending(x => x.QuantityStatistical).Skip((page - 1) * pagesize).Take(pagesize);

                var respone = _mapper.Map<IEnumerable<ProductNotTakenUI>>(query);

                var paginationset = new PaginationSet<ProductNotTakenUI>
                {
                    Total = totalCount,
                    Items = respone
                };

                return Ok(paginationset);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [Route("GetCustomers")]
        [HttpGet]
        public ActionResult GetCustomers(int page = 1, int pagesize = 10)
        {
            var listCustomers = _statistical.GetAllCustomerByProduct();

            int totalCount = listCustomers.Count();

            try
            {
                var query = listCustomers.OrderByDescending(x => x.TotalPrice).Skip((page - 1) * pagesize).Take(pagesize);

                var paginationset = new PaginationSet<CustomerByProduct>
                {
                    Total = totalCount,
                    Items = query
                };

                return Ok(paginationset);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [Route("GetStaffs")]
        [HttpGet]
        public ActionResult GetStaffs(int page = 1, int pagesize = 10)
        {
            var listStaffs = _statistical.GetAllStaffByProduct();

            int totalCount = listStaffs.Count();

            try
            {
                var query = listStaffs.OrderByDescending(x => x.TotalPrice).Skip((page - 1) * pagesize).Take(pagesize);

                var paginationset = new PaginationSet<CustomerByProduct>
                {
                    Total = totalCount,
                    Items = query
                };

                return Ok(paginationset);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.Orders;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        [Route("GetAllOrder")]
        [HttpGet]
        public IActionResult GetAllOrder(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var list = _orderRepository.GetAllOrder(keyword);

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderUI>>(query);

                var paginationset = new PaginationSet<OrderUI>()
                {
                    Items = response,
                    Total = totalCount
                };

                return Ok(paginationset);
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [Route("Revenue")]
        [HttpGet]
        public async Task<IActionResult> GetRevenueMonth(DateTime date)
        {

            var revenue = await _orderRepository.GetRevenueMonth(date);
           
            var totalRevenueMonth = new TotalRevenueMonth()
            {
                Revenues = revenue,
                Total = revenue.Sum(x => x.TotalRevenue)
            };
            return Ok(totalRevenueMonth);
        }


        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody]OrderUI orderUI)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var order = _mapper.Map<Order>(orderUI);
            var result = await _orderRepository.CreateOrderAsync(order);
            if(result) 
                return Ok();

            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order == null) 
                return NotFound();
            return Ok(_mapper.Map<OrderUI>(order));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderRepository.DeleteOrderAsync(id);
            if (result) 
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody]OrderUI orderUI)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = _mapper.Map<Order>(orderUI);

            var result = await _orderRepository.EditOrderAsync(id, order);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet]
        public IActionResult GetAllOrder(string keyword)
        {
            var order = _orderRepository.GetAllOrder(keyword);
            if (order == null) 
                return NotFound();

            return Ok(_mapper.Map<IEnumerable<OrderUI>>(order));
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
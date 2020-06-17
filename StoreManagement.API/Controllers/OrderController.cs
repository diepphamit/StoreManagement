using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.OrderDetails;
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
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [Route("GetAllOrder")]
        [HttpGet]
        public IActionResult GetAllOrder(int customerId, string keyword, int page = 1, int pagesize = 10)
        {
            try
            {

                var list = _orderRepository.GetAllOrder(customerId, keyword);

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

        [AllowAnonymous]
        [Route("GetAllOrderByStaffId")]
        [HttpGet]
        public IActionResult GetAllOrderByStaffId(int staffId, string keyword, int page = 1, int pagesize = 10)
        {
            try
            { 

                var list = _orderRepository.GetAllOrderByStaffId(staffId, keyword);

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

        [AllowAnonymous]
        [Route("Revenue")]
        [HttpGet]
        public IActionResult GetRevenueMonth(DateTime date)
        {

            var revenue = _orderRepository.GetRevenueMonth(date);
           
            var totalRevenueMonth = new TotalRevenueMonth()
            {
                Revenues = revenue,
                Total = revenue.Sum(x => x.TotalRevenue)
            };
            return Ok(totalRevenueMonth);
        }


        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody]OrderAdd orderAdd)
        {
            //int staffId, int customerId, bool status, int code,[FromBody]IEnumerable<OrderDetailAdd> orderDetailAdd
            var newOrderAdd = new OrderUI()
            {
                StaffId = orderAdd.StaffId,
                CustomerId = orderAdd.CustomerId,
                Status = orderAdd.Status,
                Code = orderAdd.Code
            };
            var order = _mapper.Map<Order>(newOrderAdd);

            var orderDetail = _mapper.Map<IEnumerable<OrderDetail>>(orderAdd.orderDetail);

            var result = await _orderRepository.CreateOrderAsync(order, orderDetail);
            if (result)
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
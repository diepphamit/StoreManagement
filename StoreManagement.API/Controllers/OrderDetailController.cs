using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StoreManagement.BusinessLogic.Core;
using StoreManagement.BusinessLogic.Dtos.OrderDetails;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.BusinessLogic.Storages;
using StoreManagement.DataAccess.Entites;

namespace StoreManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IMapper _mapper;
        private readonly IAmazonS3StorageManager _storageManager;

        public OrderDetailController(IOrderDetailRepository orderDetailRepository, 
            IMapper mapper, 
            IAmazonS3StorageManager storageManager)
        {
            _orderDetailRepository = orderDetailRepository;
            _mapper = mapper;
            _storageManager = storageManager;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAllOrderDetail(int OrderId, int page = 1, int pagesize = 10)
        {
            try
            {
                var list = _orderDetailRepository.GetAllOrderDetail(OrderId);

                int totalCount = list.Count();

                var query = list.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

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

                    var response = _mapper.Map<IEnumerable<OrderDetail>, IEnumerable<OrderDetailUI>>(query);

                var paginationset = new PaginationSet<OrderDetailUI>()
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetailByid(int id)
        {
            var orderDetail = await _orderDetailRepository.GetOrderDetailById(id);

            if (orderDetail == null)
                return NotFound();

            foreach (var pic in orderDetail.Product.Pictures)
            {
                pic.ImageUrl = _storageManager.GetCannedSignedURL(pic.FileLocation);
            }

            return Ok(_mapper.Map<OrderDetailUI>(orderDetail));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderDetail([FromBody]OrderDetailAdd orderDetailAdd)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orderDetail = _mapper.Map<OrderDetail>(orderDetailAdd);
            var result = await _orderDetailRepository.createOrderDetail(orderDetail);

            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderDetail(int id, [FromBody]OrderDetailAdd orderDetailAdd)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orderDetail = _mapper.Map<OrderDetail>(orderDetailAdd);
            var result = await _orderDetailRepository.EditOrderDetail(id, orderDetail);

            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var result = await _orderDetailRepository.DeleteOrderDetail(id);

            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
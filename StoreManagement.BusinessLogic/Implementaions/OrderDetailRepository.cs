using Microsoft.EntityFrameworkCore;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly DataContext _context;

        public OrderDetailRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> createOrderDetail(OrderDetail orderDetailAdd)
        {
            try
            {
                _context.OrderDetails.Add(orderDetailAdd);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<bool> DeleteOrderDetail(int id)
        {
            var orderDetail = await _context.OrderDetails.FirstOrDefaultAsync(x => x.Id == id);
            if (orderDetail == null)
                return false;

            try
            {
                _context.OrderDetails.Remove(orderDetail);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<bool> EditOrderDetail(int id, OrderDetail orderDetailUpdate)
        {
            var orderDetail = await _context.OrderDetails.FirstOrDefaultAsync(x => x.Id == id);
            if (orderDetail == null)
                return false;

            try
            {
                orderDetail.DisCount = orderDetailUpdate.DisCount;
                orderDetail.OrderId = orderDetailUpdate.OrderId;
                orderDetail.ProductId = orderDetailUpdate.OrderId;
                orderDetail.Quantity = orderDetailUpdate.Quantity;
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<OrderDetail> GetAllOrderDetail()
        {
            return _context.OrderDetails.Include(x => x.Product).AsEnumerable();
        }

        public async Task<OrderDetail> GetOrderDetailById(int id)
        {
            return await _context.OrderDetails.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}

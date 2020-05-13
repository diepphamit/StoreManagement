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
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateOrderAsync(Order order)
        {
            try
            {
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null)
                return false;

            try
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<bool> EditOrderAsync(int id, Order orderupdate)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null) return false;

            try
            {
                order.Code = orderupdate.Code;
                order.CustomerId = orderupdate.CustomerId;
                order.OrderDate = orderupdate.OrderDate;
                order.StaffId = orderupdate.StaffId;
                order.Status = orderupdate.Status;
                order.TotalPrice = orderupdate.TotalPrice;
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public IEnumerable<Order> GetAllOrder(string keyword)
        {
            if (string.IsNullOrEmpty(keyword)) keyword = "";
            return _context.Orders.Where(x => x.Code.ToString().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
        }


    }
}

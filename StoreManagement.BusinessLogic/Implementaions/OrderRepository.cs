using Microsoft.EntityFrameworkCore;
using StoreManagement.BusinessLogic.Dtos.Orders;
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

        public async Task<IEnumerable<RevenueUI>> GetRevenueMonth(DateTime date)
        {
            List<RevenueUI> list = new List<RevenueUI>();
            int totalRevenue;
            RevenueUI RevenueUI;
            var revenue = _context.Orders.Where(x => x.OrderDate.Year == date.Year && x.OrderDate.Month == date.Month);
           
            for(int i =1; i<=DaysInMonth(date.Month, date.Year); i++)
            {
                totalRevenue = 0;
                RevenueUI = new RevenueUI();

                foreach (var item in revenue)
                {
                    if(item.OrderDate.Day == i)
                    {
                        totalRevenue += item.TotalPrice;
                    }
                }
                RevenueUI.TotalRevenue = totalRevenue;
                RevenueUI.datetime = new DateTime(date.Year, date.Month, i);
                //RevenueUI.TotalRevenue = (int)_context.Orders.Where(x => x.OrderDate.Year == date.Year && x.OrderDate.Month == date.Month && x.OrderDate.Day == i).Sum(p => p.TotalPrice);
                //RevenueUI.datetime = new DateTime(date.Year, date.Month, i);

                list.Add(RevenueUI);
            }
            return list.AsEnumerable();
        }

        private int DaysInMonth(int month, int year)
        {
            switch (month)
            {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                default:
                    if (year % 4 == 0 && year % 100 != 0)
                        return 29;
                    return 28;
            }
        }
    }
}

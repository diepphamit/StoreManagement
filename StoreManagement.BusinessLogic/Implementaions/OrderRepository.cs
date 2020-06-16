﻿using Microsoft.EntityFrameworkCore;
using StoreManagement.BusinessLogic.Dtos.Orders;
using StoreManagement.BusinessLogic.Helper;
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
        private readonly IEmailSender _emailSender;
        private readonly IUserRepository _userRepository;

        public OrderRepository(DataContext context, IEmailSender emailSender, IUserRepository userRepository)
        {
            _context = context;
            _emailSender = emailSender;
            _userRepository = userRepository;
        }
        public async Task<bool> CreateOrderAsync(Order order, IEnumerable<OrderDetail> orderDetail)
        {
            try
            {
                order.Code = new Random().Next(1000000000, Int32.MaxValue);
                order.OrderDate = DateTime.Now;
                order.TotalPrice = TotalPrice(orderDetail);
                _context.Orders.Add(order);

                foreach (var item in orderDetail)
                {
                    item.Order = order;
                    _context.OrderDetails.Add(item);
                    var branchProduct = await _context.BranchProducts.FirstOrDefaultAsync(x => x.ProductId == item.ProductId);
                    branchProduct.Quantity -= item.Quantity;
                }

                await _context.SaveChangesAsync();

                //Test send mail
                User customerUser = _context.Users.FirstOrDefault(x => x.Id == order.CustomerId);
                string content = "Xin Chào " + customerUser.Name + "\n Cảm ơn bạn đã tin tưởng chúng tôi. \n Chúng tôi đã nhận được"
                    + " đơn hàng của bạn và mời bạn đến của hàng gần nhất để nhận hàng\nMã đơn hàng là "+ order.Code;
                var message = new Message(new string[] { customerUser.Email }, "StoreManagenment", content);
                await _emailSender.SendEmailAsync(message);

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
                //order.TotalPrice = TotalPrice(order.OrderDetails);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public IEnumerable<Order> GetAllOrder(GetOrderUI getOrderUI)
        {
            if (string.IsNullOrEmpty(getOrderUI.keyword)) getOrderUI.keyword = "";
         
            if (getOrderUI.customerId == 0)
                return _context.Orders.Include(x => x.Customer).Include(x => x.Staff)
                    .Where(x => x.Status == getOrderUI.status && x.OrderDate >= getOrderUI.startDay && x.OrderDate <= getOrderUI.endDay).AsEnumerable();
            return _context.Orders.Include(x => x.Customer).Include(x => x.Staff)
                 .Where(x => x.CustomerId == getOrderUI.customerId && x.Status == getOrderUI.status && x.OrderDate >= getOrderUI.startDay && x.OrderDate <= getOrderUI.endDay).AsEnumerable();
        }

        public IEnumerable<Order> GetAllOrderByStaffId(int staffId, string keyword)
        {
            if (string.IsNullOrEmpty(keyword)) keyword = "";

            return _context.Orders.Include(x => x.Customer).Include(y => y.Staff).Where(x =>
                ((x.StaffId == staffId || x.StaffId == 1) && x.Code.ToString().Contains(keyword)))
                .ToList();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
        }

        public IEnumerable<RevenueUI> GetRevenueMonth(DateTime date)
        {
            List<RevenueUI> list = new List<RevenueUI>();
            int totalRevenue;
            RevenueUI RevenueUI;
            var revenue = _context.Orders.Where(x => x.OrderDate.Year == date.Year && x.OrderDate.Month == date.Month && x.Status == true);
           
            for(int i =1; i <= DateTime.DaysInMonth(date.Year, date.Month); i++)
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

        private int TotalPrice(IEnumerable<OrderDetail> orderDetails)
        {
            int totalPrice = 0;
            foreach (var item in orderDetails)
            {
                var product = _context.Products.Include(x => x.OrderDetails).FirstOrDefault(p => p.Id == item.ProductId);
                totalPrice += product.Price * item.Quantity;
            }
            return totalPrice;
        }



        //private int DaysInMonth(int month, int year)
        //{
        //    switch (month)
        //    {
        //        case 1:
        //        case 3:
        //        case 5:
        //        case 7:
        //        case 8:
        //        case 10:
        //        case 12:
        //            return 31;
        //        case 4:
        //        case 6:
        //        case 9:
        //        case 11:
        //            return 30;
        //        default:
        //            if (year % 4 == 0 && year % 100 != 0)
        //                return 29;
        //            return 28;
        //    }
        //}
    }
}

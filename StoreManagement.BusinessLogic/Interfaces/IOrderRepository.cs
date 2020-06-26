using StoreManagement.BusinessLogic.Dtos.Orders;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAllOrder(int customerId, string keyword);
        IEnumerable<Order> GetAllOrderByStaffId(int staffId, string keyword);
        Task<Order> GetOrderByIdAsync(int id);
        Task<bool> CreateOrderAsync(Order order, IEnumerable<OrderDetail> orderDetail);
        Task<bool> EditOrderAsync(int id, Order orderupdate);
        Task<bool> DeleteOrderAsync(int id);
        IEnumerable<RevenueUI> GetRevenueMonth(int BranchId, DateTime date);
    }
}

using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAllOrder(string keyword);
        Task<Order> GetOrderByIdAsync(int id);
        Task<bool> CreateOrderAsync(Order order);
        Task<bool> EditOrderAsync(int id, Order orderupdate);
        Task<bool> DeleteOrderAsync(int id);
    }
}

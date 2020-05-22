using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Interfaces
{
    public interface IOrderDetailRepository
    {
        IEnumerable<OrderDetail> GetAllOrderDetail(int orderId);
        Task<OrderDetail> GetOrderDetailById(int id);
        Task<bool> createOrderDetail(OrderDetail orderDetailAdd);
        Task<bool> EditOrderDetail(int id, OrderDetail orderDetailUpdate);
        Task<bool> DeleteOrderDetail(int id);
    }
}

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
        private readonly IUpdatTotalPriceRepository _updatTotalPriceRepository;

        public OrderDetailRepository(DataContext context, IUpdatTotalPriceRepository updatTotalPriceRepository)
        {
            _context = context;
            _updatTotalPriceRepository = updatTotalPriceRepository;
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

        public async Task<bool> EditOrderDetail(int orderId, IEnumerable<OrderDetail> orderDetailUpdate, IEnumerable<OrderDetail> orderDetailDeletes)
        {

            try
            {
                int branchId = _context.Orders.FirstOrDefault(x => x.Id == orderId).BranchId;
                if (branchId == null)
                    return false;
                foreach (var item in orderDetailUpdate)
                {
                    var orderDetail = await _context.OrderDetails.FirstOrDefaultAsync(x => x.ProductId == item.ProductId && x.OrderId == orderId);
                    var updateQuantity = await _context.BranchProducts.FirstOrDefaultAsync(x => x.ProductId == item.ProductId && x.BrachId == branchId);
                    if (updateQuantity == null)
                        return false;
                    if (orderDetail == null)
                    {
                        item.OrderId = orderId;
                        _context.OrderDetails.Add(item);
                        updateQuantity.Quantity -= item.Quantity;
                    }

                    else
                    {
                        updateQuantity.Quantity -= (item.Quantity - orderDetail.Quantity) ;
                        orderDetail.Quantity = item.Quantity;
                        orderDetail.DisCount = item.DisCount;
                    }
                    await _context.SaveChangesAsync();
                }

                foreach (var item in orderDetailDeletes)
                {
                    var orderDetail = await _context.OrderDetails.FirstOrDefaultAsync(x => x.ProductId == item.ProductId && x.OrderId == orderId);
                    if (orderDetail != null)
                    {
                        var updateQuantity = await _context.BranchProducts.FirstOrDefaultAsync(x => x.ProductId == item.ProductId && x.BrachId == branchId);
                        updateQuantity.Quantity += orderDetail.Quantity;
                        _context.OrderDetails.Remove(orderDetail);
                        await _context.SaveChangesAsync();
                    }
                }
                _updatTotalPriceRepository.UpdateTotalPrice(orderId);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<OrderDetail> GetAllOrderDetail(int orderId)
        {
            if (orderId == 0)
                return _context.OrderDetails.Include(x => x.Product).ThenInclude(z => z.Pictures).Include(y => y.Order).ThenInclude(z => z.Customer).ToList();
            return _context.OrderDetails.Include(x => x.Product).ThenInclude(z => z.Pictures).Include(p => p.Order).ThenInclude(y => y.Customer).Where(p => p.OrderId == orderId).AsEnumerable();
        }

        public async Task<OrderDetail> GetOrderDetailById(int id)
        {
            return await _context.OrderDetails.Include(x => x.Product).ThenInclude(z => z.Pictures).Include(p => p.Order).ThenInclude(y => y.Customer).FirstOrDefaultAsync(x => x.Id == id);
        }

        //public void UpdateTotalPrice(int orderId)
        //{

        //    int totalPrice = 0;
        //    var listorderDetail = _context.OrderDetails.Where(x => x.OrderId == orderId).AsEnumerable();
        //    foreach (var item in listorderDetail)
        //    {
        //        var product = _context.Products.FirstOrDefault(p => p.Id == item.ProductId);
        //        totalPrice += product.Price * item.Quantity;
        //    }
        //    var order = _context.Orders.FirstOrDefault(x => x.Id == orderId);
        //    order.TotalPrice = totalPrice;
        //    _context.SaveChanges();

        //}
    }
}

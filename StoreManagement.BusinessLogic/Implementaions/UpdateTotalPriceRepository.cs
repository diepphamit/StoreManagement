using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class UpdateTotalPriceRepository : IUpdatTotalPriceRepository
    {
        private readonly DataContext _context;

        public UpdateTotalPriceRepository(DataContext context)
        {
            _context = context;
        }
        public void UpdateTotalPrice(int orderId)
        {
            int totalPrice = 0;
            var listorderDetail = _context.OrderDetails.Where(x => x.OrderId == orderId).AsEnumerable();
            foreach (var item in listorderDetail)
            {
                var product = _context.Products.FirstOrDefault(p => p.Id == item.ProductId);
                totalPrice += product.Price * item.Quantity;
            }
            var order = _context.Orders.FirstOrDefault(x => x.Id == orderId);
            order.TotalPrice = totalPrice;
            _context.SaveChanges();
        }
    }
}

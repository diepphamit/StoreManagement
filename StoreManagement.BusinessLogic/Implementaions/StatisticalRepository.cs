using Microsoft.EntityFrameworkCore;
using StoreManagement.BusinessLogic.Helper;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class StatisticalRepository : IStatisticalRepository
    {
        private readonly DataContext _context;

        public StatisticalRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<ProductStatistical> ProductNotTaken()
        {
            List<ProductStatistical> productNotTakens = new List<ProductStatistical>();
            ProductStatistical productNotTaken;
            var product = _context.Products.ToList();
            foreach (var item in product)
            {
                productNotTaken = new ProductStatistical();
                productNotTaken.product = item;

                var quantity = _context.BranchProducts.FirstOrDefault(x => x.ProductId == item.Id);
                if (quantity == null)
                    productNotTaken.ProductQuantity = 0;
                else
                    productNotTaken.ProductQuantity = quantity.Quantity;



                productNotTaken.QuantityStatistical = _context.OrderDetails.Include(y => y.Order).Where(x => x.ProductId == item.Id && x.Order.Status == false).Sum(x => x.Quantity);
                productNotTakens.Add(productNotTaken);
            }
            return productNotTakens.AsEnumerable();
        }

        public IEnumerable<ProductStatistical> ProductSoles()
        {
            List<ProductStatistical> productSoles = new List<ProductStatistical>();
            ProductStatistical productSole;
            var product = _context.Products.ToList();
            foreach (var item in product)
            {
                productSole = new ProductStatistical();
                productSole.product = item;
               
                var quantity = _context.BranchProducts.FirstOrDefault(x => x.ProductId == item.Id);
                if(quantity == null)
                    productSole.ProductQuantity = 0;
                else
                    productSole.ProductQuantity = quantity.Quantity;
                
                
                    
                productSole.QuantityStatistical = _context.OrderDetails.Include(y => y.Order).Where(x => x.ProductId == item.Id && x.Order.Status == true).Sum(x => x.Quantity);
                productSoles.Add(productSole);
            }
            return productSoles.AsEnumerable();
        }
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StoreManagement.BusinessLogic.Dtos.Statistical;
using StoreManagement.BusinessLogic.Helper;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Twilio.TwiML.Voice;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class StatisticalRepository : IStatisticalRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public StatisticalRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<CustomerByProduct> GetAllCustomerByProduct()
        {
            var listCustomersinDb = _context.Users.Where(x => x.GroupUserId == 3).ToList();

            var listCustomers = _mapper.Map<IEnumerable<CustomerByProduct>>(listCustomersinDb);

            foreach (var customer in listCustomers)
            {
                customer.TotalPrice = _context.Orders.Where(x => x.CustomerId == customer.Id).Sum(p => p.TotalPrice);
            }

            return listCustomers;
        }

        public IEnumerable<CustomerByProduct> GetAllStaffByProduct()
        {
            var listStaffsinDb = _context.Users.Where(x => (x.GroupUserId == 2 || x.GroupUserId == 4)).ToList();

            var listStaffs = _mapper.Map<IEnumerable<CustomerByProduct>>(listStaffsinDb);

            foreach (var staff in listStaffs)
            {
                staff.TotalPrice = _context.Orders.Where(x => x.StaffId == staff.Id).Sum(p => p.TotalPrice);
            }

            return listStaffs;
        }

        public IEnumerable<ProductStatistical> ProductNotTaken(int branchId, string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                keyword = "";
            List<ProductStatistical> productNotTakens = new List<ProductStatistical>();
            ProductStatistical productNotTaken;
            if (branchId == 0)
            {
                var product = _context.Products.Where(x => x.Name.ToLower().Contains(keyword.ToLower())).ToList();

                foreach (var item in product)
                {
                    productNotTaken = new ProductStatistical();
                    productNotTaken.product = item;

                    var quantity = _context.BranchProducts.Where(x => x.ProductId == item.Id).Sum(x => x.Quantity);
                    productNotTaken.ProductQuantity = quantity;
                    productNotTaken.QuantityStatistical = _context.OrderDetails.Include(y => y.Order).Where(x => x.ProductId == item.Id && x.Order.Status == false).Sum(x => x.Quantity);
                    productNotTakens.Add(productNotTaken);
                }
            }
            else
            {
                var product = _context.BranchProducts.Include(x => x.Product).Where(x => x.BrachId == branchId && x.Product.Name.ToLower().Contains(keyword.ToLower()));

                foreach (var item in product)
                {
                    productNotTaken = new ProductStatistical();
                    productNotTaken.product = item.Product;

                    var quantity = _context.BranchProducts.FirstOrDefault(x => x.ProductId == item.ProductId && x.BrachId == branchId);
                    productNotTaken.ProductQuantity = quantity.Quantity;
                    productNotTaken.QuantityStatistical = _context.OrderDetails.Include(y => y.Order).Where(x => x.ProductId == item.ProductId && x.Order.Status == false && x.Order.BranchId == branchId).Sum(x => x.Quantity);
                    productNotTakens.Add(productNotTaken);
                }
            }


            return productNotTakens.AsEnumerable();
        }

        public IEnumerable<ProductStatistical> ProductSoles(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                keyword = "";

            List<ProductStatistical> productSoles = new List<ProductStatistical>();
            ProductStatistical productSole;
            var product = _context.Products.Where(x => x.Name.ToLower().Contains(keyword.ToLower())).ToList();
            foreach (var item in product)
            {
                productSole = new ProductStatistical();
                productSole.product = item;

                productSole.ProductQuantity = _context.BranchProducts.Where(x => x.ProductId == item.Id).Sum(y => y.Quantity);

                productSole.QuantityStatistical = _context.OrderDetails.Include(x => x.Order).Where(x => x.ProductId == item.Id && x.Order.Status == true).Sum(x => x.Quantity);
                productSoles.Add(productSole);
            }
            return productSoles.AsEnumerable();
        }
        public IEnumerable<NumberProduct> ProductSapHet(int branchId)
        {
            List<NumberProduct> products = new List<NumberProduct>();
            NumberProduct numberProduct;
            if (branchId == 0)
            {
                var product = _context.Products.Include(x => x.Category).Include(x => x.Supplier).ToList();
                foreach (var item in product)
                {
                    numberProduct = new NumberProduct();
                    numberProduct = _mapper.Map<NumberProduct>(item);
                    numberProduct.Quantity = _context.BranchProducts.Where(x => x.ProductId == item.Id).Sum(x => x.Quantity);
                    products.Add(numberProduct);
                }
            }
            else
            {
                var product = _context.BranchProducts
                    .Include(x => x.Product).ThenInclude(x => x.Supplier)
                    .Include(x => x.Product).ThenInclude(x => x.Category)
                    .Where(x => x.BrachId == branchId).AsEnumerable();
                foreach (var item in product)
                {
                    numberProduct = new NumberProduct();
                    numberProduct = _mapper.Map<NumberProduct>(item);
                    numberProduct.Quantity = _context.BranchProducts.FirstOrDefault(x => x.BrachId == branchId && x.ProductId == item.Product.Id).Quantity;
                    products.Add(numberProduct);
                }
            }
            return products.AsEnumerable().Distinct();
        }
    }
}

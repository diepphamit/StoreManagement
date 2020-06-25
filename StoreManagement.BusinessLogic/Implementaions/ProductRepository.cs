using AutoMapper;
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
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUpdatTotalPriceRepository _updatTotalPriceRepository;

        public ProductRepository(DataContext context, IMapper mapper, IUpdatTotalPriceRepository updatTotalPriceRepository)
        {
            _context = context;
            _mapper = mapper;
            _updatTotalPriceRepository = updatTotalPriceRepository;
        }
        public async Task<bool> CreateProductAsync(Product product)
        {
            try
            {
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var productIndb = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (productIndb == null) return false;

            try
            {
                _context.Products.Remove(productIndb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> EditProductAsync(int id, Product product)
        {
            var productIndb = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (productIndb == null) return false;

            try
            {
                productIndb.Name = product.Name;
                productIndb.Price = product.Price;
                productIndb.SupplierId = product.SupplierId;
                productIndb.Barcode = product.Barcode;
                productIndb.CategoryId = product.CategoryId;
                productIndb.Description = product.Description;
                productIndb.Discount = product.Discount;

                await _context.SaveChangesAsync();

                var orderDetail = _context.OrderDetails.Include(x => x.Order).Where(x => x.ProductId == id && x.Order.Status == false).ToList();
                foreach (var item in orderDetail)
                {
                    _updatTotalPriceRepository.UpdateTotalPrice(item.OrderId);
                }

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Product> GetAllProducts(string keyword)
        {
            if (string.IsNullOrEmpty(keyword)) keyword = "";

            return _context.Products
                .Include(x => x.Pictures).Include(y => y.Category).Include(z => z.Supplier)
                .Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }   


        public IEnumerable<BranchProduct> GetAllProductsInBranch(int branchId)
        {
            if(branchId == 0)
                return _context.BranchProducts
                                   .Include(x => x.Product).ThenInclude(x => x.Category)
                                   .Include(x => x.Product).ThenInclude(x => x.Supplier)
                                   .Include(x => x.Product).ThenInclude(x => x.Pictures).AsEnumerable();
            return _context.BranchProducts.Include(x => x.Product).ThenInclude(x => x.Category)
                                   .Include(x => x.Product).ThenInclude(x => x.Supplier)
                                   .Include(x => x.Product).Where(y => y.BrachId == branchId)
                                   .Include(x => x.Product).ThenInclude(y => y.Pictures).AsEnumerable();
        }

        public IEnumerable<Product> GetAllProductNotInBranch(int branchId)
        {
            var productInBranch = _context.BranchProducts.Where(x => x.BrachId == branchId).Select(x => x.ProductId).ToList();
            var productNotInBranch = _context.Products.Where(x => !productInBranch.Contains(x.Id));
            return productNotInBranch.AsEnumerable();
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(x => x.Pictures).Include(y => y.Supplier).Include(z => z.Category).FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}

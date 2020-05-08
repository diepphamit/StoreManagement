using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Data;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace StoreManagement.BusinessLogic.Implementaions
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SupplierRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateSupplierAsync(Supplier supplier)
        {
            try
            {
                _context.Suppliers.Add(supplier);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<bool> DeleteSupplierAsync(int id)
        {
            var supplierIndb = await _context.Suppliers.FirstOrDefaultAsync(p => p.Id == id);
            if (supplierIndb == null) return false;
            try
            {

                _context.Suppliers.Remove(supplierIndb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<bool> EditSupplierAsync(int id, Supplier supplier)
        {
            var supplierIndb = await _context.Suppliers.FirstOrDefaultAsync(x => x.Id == id);
            if (supplierIndb == null) return false;
            try
            {
                supplierIndb.Name = supplier.Name;
                supplierIndb.PhoneNumber = supplier.PhoneNumber;
                supplierIndb.Description = supplier.Description;
                supplierIndb.Address = supplier.Address;
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<Supplier> GetAllSupplier(string keyword)
        {
            if (string.IsNullOrEmpty(keyword)) keyword = "";
            return _context.Suppliers.Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }
        public async Task<Supplier> GetSupplierByIdAsync(int id)
        {
            return await _context.Suppliers.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}

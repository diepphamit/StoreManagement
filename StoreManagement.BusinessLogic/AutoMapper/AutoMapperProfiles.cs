using AutoMapper;
using StoreManagement.BusinessLogic.Dtos.Auth;
using StoreManagement.BusinessLogic.Dtos.Branches;
using StoreManagement.BusinessLogic.Dtos.BranchProducts;
using StoreManagement.BusinessLogic.Dtos.Categories;
using StoreManagement.BusinessLogic.Dtos.OrderDetails;
using StoreManagement.BusinessLogic.Dtos.Orders;
using StoreManagement.BusinessLogic.Dtos.Pictures;
using StoreManagement.BusinessLogic.Dtos.Product;
using StoreManagement.BusinessLogic.Dtos.Suppliers;
using StoreManagement.BusinessLogic.Dtos.Users;
using StoreManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.AutoMapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserAuthReturn>()
                .ForMember(x => x.GroupRole, y => { y.MapFrom(z => z.GroupUser.Name); });

            CreateMap<Category, CategoryUI>();
            CreateMap<CategoryUI, Category>();

            CreateMap<Product, ProductReturn>()
                .ForMember(x => x.SupplierName, y => { y.MapFrom(z => z.Supplier.Name); })
                .ForMember(x => x.CategoryName, y => { y.MapFrom(z => z.Category.Name); });
            CreateMap<ProductForCreate, Product>();
            CreateMap<ProductForUpdate, Product>();

            CreateMap<User, UserDto>().ForMember(x => x.GroupRole, y => { y.MapFrom(z => z.GroupUser.Name); });
            CreateMap<UserForCreate, User>();
            CreateMap<UserUpdateDto, User>();

            CreateMap<Picture, PictureUI>().ForMember(x => x.ProductName, y => { y.MapFrom(z => z.Product.Name); });
            CreateMap<PictureUpdate, Picture>();
            CreateMap<Picture, PictureDto>();
            CreateMap<PictureForAdd, Picture>();

            CreateMap<Supplier, SupplierUI>();
            CreateMap<SupplierUI, Supplier>();
            CreateMap<Branch, BranchUI>();
            CreateMap<BranchUI, Branch>();
            CreateMap<Order, OrderUI>()
                .ForMember(x => x.CustomerName, y => { y.MapFrom(z => z.Customer.Username); })
                .ForMember(x => x.StaffName, y => { y.MapFrom(z => z.Staff.Username); });
            CreateMap<OrderUI, Order>();
            CreateMap<OrderDetail, OrderDetailUI>().ForMember(x => x.ProductName, y => { y.MapFrom(z => z.Product.Name); });
            CreateMap<OrderDetail, OrderDetailAdd>();
            CreateMap<OrderDetailAdd, OrderDetail>();
            CreateMap<BranchProduct, BranchProductReturn>().ForMember(x => x.ProductName, y => { y.MapFrom(z => z.Product.Name); })
                                                           .ForMember(x => x.BranchDescription, y => { y.MapFrom(z => z.Branch.Description); });
            CreateMap<BranchProductUI, BranchProduct>();
        }
        
    }
}

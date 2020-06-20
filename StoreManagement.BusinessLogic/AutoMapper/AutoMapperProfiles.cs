using AutoMapper;
using StoreManagement.BusinessLogic.Dtos.Auth;
using StoreManagement.BusinessLogic.Dtos.Branches;
using StoreManagement.BusinessLogic.Dtos.BranchProducts;
using StoreManagement.BusinessLogic.Dtos.Categories;
using StoreManagement.BusinessLogic.Dtos.OrderDetails;
using StoreManagement.BusinessLogic.Dtos.Orders;
using StoreManagement.BusinessLogic.Dtos.Pictures;
using StoreManagement.BusinessLogic.Dtos.Product;
using StoreManagement.BusinessLogic.Dtos.Statistical;
using StoreManagement.BusinessLogic.Dtos.Suppliers;
using StoreManagement.BusinessLogic.Dtos.Users;
using StoreManagement.BusinessLogic.Helper;
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
            CreateMap<OrderDetail, OrderDetailUI>().ForMember(x => x.ProductName, y => { y.MapFrom(z => z.Product.Name); })
                                                   .ForMember(x => x.CustomerName, y => { y.MapFrom(z => z.Order.Customer.Name); })
                                                   .ForMember(x => x.Price, y => y.MapFrom(z => z.Product.Price))
                                                   .ForMember(x => x.Picture, y => y.MapFrom(z => z.Product.Pictures));
            CreateMap<OrderDetail, OrderDetailAdd>();
            CreateMap<OrderDetailAdd, OrderDetail>();
            CreateMap<BranchProduct, BranchProductReturn>().ForMember(x => x.ProductName, y => { y.MapFrom(z => z.Product.Name); })
                                                           .ForMember(x => x.BranchDescription, y => { y.MapFrom(z => z.Branch.Description); })
                                                           .ForMember(x => x.Price, y => { y.MapFrom(z => z.Product.Price); })
                                                           .ForMember(x => x.Discount, y => { y.MapFrom(z => z.Product.Discount); })
                                                           .ForMember(x => x.Barcode, y => { y.MapFrom(z => z.Product.Barcode); })
                                                           .ForMember(x => x.Pictures, y => { y.MapFrom(z => z.Product.Pictures); })
                                                           .ForMember(x => x.SupplierName, y => { y.MapFrom(z => z.Product.Supplier.Name); })
                                                           .ForMember(x => x.CategoryName, y => { y.MapFrom(z => z.Product.Category.Name); });
            CreateMap<BranchProductUI, BranchProduct>();
            CreateMap<ProductStatistical, ProductSoleUI>().ForMember(x => x.Name, y => y.MapFrom(z => z.product.Name))
                                                   .ForMember(x => x.Description, y => y.MapFrom(z => z.product.Description))
                                                   .ForMember(x => x.Price, y => y.MapFrom(z => z.product.Price))
                                                   .ForMember(x => x.Discount, y => y.MapFrom(z => z.product.Discount))
                                                   .ForMember(x => x.Barcode, y => y.MapFrom(z => z.product.Barcode))
                                                   .ForMember(x => x.ProductQuantity, y => y.MapFrom(z => z.QuantityStatistical));
            CreateMap<ProductStatistical, ProductNotTakenUI>().ForMember(x => x.Name, y => y.MapFrom(z => z.product.Name))
                                                   .ForMember(x => x.Description, y => y.MapFrom(z => z.product.Description))
                                                   .ForMember(x => x.Price, y => y.MapFrom(z => z.product.Price))
                                                   .ForMember(x => x.Discount, y => y.MapFrom(z => z.product.Discount))
                                                   .ForMember(x => x.Barcode, y => y.MapFrom(z => z.product.Barcode))
                                                   .ForMember(x => x.ProductQuantity, y => y.MapFrom(z => z.QuantityStatistical));
            CreateMap<User, CustomerByProduct>();

            CreateMap<BranchProduct, ProductReturn>()
                .ForMember(x => x.Id, y => { y.MapFrom(z => z.Product.Id); })
                .ForMember(x => x.Description, y => { y.MapFrom(z => z.Product.Description); })
                .ForMember(x => x.Price, y => { y.MapFrom(z => z.Product.Price); })
                .ForMember(x => x.Discount, y => { y.MapFrom(z => z.Product.Discount); })
                .ForMember(x => x.Barcode, y => { y.MapFrom(z => z.Product.Barcode); })
                .ForMember(x => x.Pictures, y => { y.MapFrom(z => z.Product.Pictures); })
                .ForMember(x => x.SupplierName, y => { y.MapFrom(z => z.Product.Supplier.Name); })
                .ForMember(x => x.CategoryName, y => { y.MapFrom(z => z.Product.Category.Name); });
        }

    }
}

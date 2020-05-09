using AutoMapper;
using StoreManagement.BusinessLogic.Dtos.Auth;
using StoreManagement.BusinessLogic.Dtos.Categories;
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
            CreateMap<Supplier, SupplierUI>();
            CreateMap<SupplierUI, Supplier>();
        }
        
    }
}

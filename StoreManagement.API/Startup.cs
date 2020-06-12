using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StoreManagement.API.Helpers;
using StoreManagement.BusinessLogic.AutoMapper;
using StoreManagement.BusinessLogic.Helper;
using StoreManagement.BusinessLogic.Implementaions;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.BusinessLogic.Storages;
using StoreManagement.DataAccess.Data;

namespace StoreManagement.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
               options.UseSqlServer(
                   Configuration.GetConnectionString("DefaultConnection"), x => x.MigrationsAssembly("StoreManagement.DataAccess")));

            var emailConfig = Configuration
                                .GetSection("EmailConfiguration")
                                .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();

            services.Configure<FormOptions>(o => {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            services.Configure<AmazonStorageSetting>(Configuration.GetSection("AmazonStorage"));
            services.Configure<AmazonCloudFront>(Configuration.GetSection("AmazonCloudFront"));
            //services.AddDistributedRedisCache(options =>
            //{
            //    options.Configuration = Configuration.GetConnectionString("RedisConnection");
            //});
            


            services.AddControllers();
            
            

            services.AddAutoMapper(typeof(AutoMapperProfiles), typeof(AutoMapperProfiles));
            //Repository
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IAmazonS3StorageManager, AmazonS3StorageManager>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPictureRepository, PictureRepository>();
            services.AddScoped<ISupplierRepository, SupplierRepository>();
            services.AddScoped<IBranchRepository, BranchRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
            services.AddScoped<IBranchProductRepository, BranchProductRepository>();
            services.AddScoped<IStatisticalRepository, StatisticalRepository>();

            services.AddScoped<PermissionFilter>();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                    .AddJwtBearer(x =>
                    {
                        x.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                                    .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });

            //services.AddAuthorization();

            services.AddMvc(ops => {
                ops.EnableEndpointRouting = false;
                
            }) ;

            
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Store Management API", Version = "v1.0" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Store Management API");
            });

            app.UseRouting();
            
            
            app.UseAuthentication();
            //app.UseAuthorization();
            app.UseMvc();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

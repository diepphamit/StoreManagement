using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.BusinessLogic.Dtos.Categories;
using StoreManagement.BusinessLogic.Helper;
using StoreManagement.BusinessLogic.Interfaces;
using StoreManagement.DataAccess.Entites;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace StoreManagement.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper, IEmailSender emailSender)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        [HttpGet]
        public  IActionResult GetAllCategories(string keyword)
        {
            var categories = _categoryRepository.GetAllCategories(keyword);

            if (categories == null)
                return NotFound();

            return Ok(_mapper.Map<IEnumerable<CategoryUI>>(categories));

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            //var message = new Message(new string[] { "daviddiep17101998@gmail.com" }, "Test email async", "This is the content from our async email.");
            //await _emailSender.SendEmailAsync(message);

            try
            {
                // Find your Account Sid and Auth Token at twilio.com/user/account  
                const string accountSid = "ACb35d3041ed494f0b9f768d1418c01232";
                const string authToken = "a40e2417a5fd1810c1b87eca02df71c7";
                TwilioClient.Init(accountSid, authToken);

                var to = new PhoneNumber("+12513222850");
                var message = MessageResource.Create(
                    to,
                    from: new PhoneNumber("+84349679477"), //  From number, must be an SMS-enabled Twilio number ( This will send sms from ur "To" numbers ).  
                    body: $"Hello Diep !! Welcome to Asp.Net Core With Twilio SMS API !!");

            }
            catch (Exception ex)
            {
                throw ex;
            }

            var category = await _categoryRepository.GetCategoryByIdAsync(id);

            if (category == null)
                return NotFound();

            return Ok(_mapper.Map<CategoryUI>(category));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody]CategoryUI category)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryAdd = _mapper.Map<Category>(category);
            var result = await _categoryRepository.CreateCategoryAsync(categoryAdd);

            if (result) 
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryRepository.DeleteCategoryAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody]CategoryUI category)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryUpdate = _mapper.Map<Category>(category);

            var result = await _categoryRepository.EditCategoryAsync(id, categoryUpdate);
            if (result) 
                return Ok();

            return BadRequest();

        }
    }
}
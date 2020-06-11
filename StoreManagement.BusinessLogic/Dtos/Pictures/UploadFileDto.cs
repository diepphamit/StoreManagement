using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Pictures
{
    public class UploadFileDto
    {
       
        public int ProductId { get; set; }

        [Required]
        [Display(Name = "File")]
        public IFormFile FormFile { get; set; }
    }
}

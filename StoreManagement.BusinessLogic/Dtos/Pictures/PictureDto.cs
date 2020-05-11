using System;
using System.Collections.Generic;
using System.Text;

namespace StoreManagement.BusinessLogic.Dtos.Pictures
{
    public class PictureDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public int productId { get; set; }
    }
}

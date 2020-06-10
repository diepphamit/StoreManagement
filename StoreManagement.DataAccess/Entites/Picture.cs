using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StoreManagement.DataAccess.Entites
{
    public class Picture
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string FileName { get; set; }

        public string Description { get; set; }

        public long Size { get; set; }

        public DateTime UploadedTime { get; set; }

        public string FileLocation { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}

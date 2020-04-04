using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StoreManagement.DataAccess.Entites
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public string CommentText { get; set; }

        public string CommenterName { get; set; }

        public DateTime CreatedOn { get; set; }

        public string EntityTypeId { get; set; }

        public int EntityId { get; set; }
        public int? ParentId { get; set; }
        public virtual Comment Parent { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StoreManagement.DataAccess.Entites
{
    public class Vote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public int Rating { get; set; }
        public string VoterName { get; set; }
        public DateTime CreatedOn { get; set; }

        public string EntityTypeId { get; set; }

        public int EntityId { get; set; }

    }
}

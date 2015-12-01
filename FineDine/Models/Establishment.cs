using System.Collections.Generic;

namespace FineDine.Models
{
    public class Establishment
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string EstablishmentName { get; set; }
        public string EstablishmentDescription { get; set; }
        public int? LocationId { get; set; }
        public virtual Location Location { get; set; }
        public ICollection<byte[]> Gallery { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
        public int? BusinessUserId { get; set; }
        public virtual BusinessUser BusinessUser { get; set; }
        public float MainRating { get; set; }
        public string PhoneNumber { get; set; }
        public string WorkingHours { get; set; }        
        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }

    }
}
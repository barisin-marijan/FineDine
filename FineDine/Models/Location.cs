using System.Collections.Generic;

namespace FineDine.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }

        public virtual ICollection<Establishment> Establishments { get; set; }
        public virtual ICollection<PersonalUser> PersonalUsers { get; set; }
        public virtual ICollection<BusinessUser> BusinessUsers { get; set; }
    }
}
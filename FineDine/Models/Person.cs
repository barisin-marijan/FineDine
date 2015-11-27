using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FineDine.Models
{
    public abstract class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte[] ProfilePicture { get; set; }
        public string Address { get; set; }
        public int LocationId { get; set; }
        public virtual Location Location { get; set; }
    }
}
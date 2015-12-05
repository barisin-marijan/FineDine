using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FineDine.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Country { get; set; }
        
    }
}
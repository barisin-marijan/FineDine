using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FineDine.Models
{
    public class Establishment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }
        public string WorkingHours { get; set; }
        public double MainRating { get; set; }
        public string Description { get; set; }
    }
}
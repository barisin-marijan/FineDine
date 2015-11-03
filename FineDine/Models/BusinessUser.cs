using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FineDine.Models
{
    public class BusinessUser : Person
    {
        public virtual ICollection<Establishment> Establishments { get; set; }
       
    }
}
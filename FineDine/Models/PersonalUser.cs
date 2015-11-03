using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FineDine.Models
{
    public class PersonalUser : Person
    {
       public virtual ICollection<Comment> Comments { get; set; }
    }
}
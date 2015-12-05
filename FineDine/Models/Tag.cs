using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FineDine.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual List<Establishment> Establishments { get; set; }
    }
}
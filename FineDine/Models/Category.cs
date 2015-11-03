using System.Collections.Generic;

namespace FineDine.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryType { get; set; }
        public virtual ICollection<Establishment> Establishments { get; set; }
    }
}
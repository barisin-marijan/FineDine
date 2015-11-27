using System.Collections.Generic;

namespace FineDine.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        public virtual ICollection<Establishment> Establishments { get; set; }
    }
}
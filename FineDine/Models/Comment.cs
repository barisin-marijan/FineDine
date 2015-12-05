using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FineDine.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime DateTime { get; set; }

    }
}
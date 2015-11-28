using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using FineDine.Models;

namespace FineDine.DAL
{
    public class FineDineContext : DbContext
    {
        public DbSet<BusinessUser> BusinessUsers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Establishment> Establishments { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<PersonalUser> PersonalUsers { get; set; }
        public DbSet<Tag> Tags { get; set; }

        
    }
}
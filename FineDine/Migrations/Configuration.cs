namespace FineDine.Migrations
{
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    

    internal sealed class Configuration : DbMigrationsConfiguration<FineDine.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "FineDine.Models.ApplicationDbContext";
        }

        protected override void Seed(FineDine.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //


            var Establishments = new List<Establishment>()
            {
                new Establishment() {Name = "Pekara Juriæ", Address ="Šimiæeva 2", Description="Pekara vrlo atraktivnih peciva."},
                new Establishment() {Name = "Restoran Apetit", Address ="Voæni trg 7", Description="Jeftin restoran u centru grada."},
            };

            var Locations = new List<Location>()
            {
                new Location() {City="Solin", Country = "Croatia", PostCode = "21210" },
                new Location() {City="Split", Country = "Croatia", PostCode = "21000" },
            };

            Establishments[0].Location = Locations[0];
            Establishments[1].Location = Locations[1];

            var DbUsersList = context.Users.ToList();

            Establishments[0].Owner = DbUsersList[0];
            Establishments[1].Owner = DbUsersList[1];

            Locations[0].Establishments = new List<Establishment>() { Establishments[0] };
            Locations[1].Establishments = new List<Establishment>() { Establishments[1] };

            Establishments.ForEach(estbl => context.Establishments.Add(estbl));
            Locations.ForEach(loc => context.Locations.Add(loc));



        }
    }
}

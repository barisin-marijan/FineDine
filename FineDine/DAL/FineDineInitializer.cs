using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FineDine.Models;
using System.Data.Entity;

namespace FineDine.DAL
{
    public class FineDineInitializer : DropCreateDatabaseAlways<FineDineContext>
    {
        protected override void Seed(FineDineContext context)
        {
            var Tags = new List<Tag>()
            {
                new Tag() { TagName = "fancy"},
                new Tag() { TagName = "romantic"}
            };

            Tags.ForEach(tag => context.Tags.Add(tag));

            var PersonalUsers = new List<PersonalUser>()
            {
                new PersonalUser() { FirstName = "Ante" , LastName = "Antić", Email = "ante.antic@t-com.hr"},
                new PersonalUser() { FirstName = "Rob" , LastName = "Stark", Email = "rob.stark@winterfell-telecom.ws"},
            };

            PersonalUsers.ForEach(personaluser => context.PersonalUsers.Add(personaluser));

            var BusinessUsers = new List<BusinessUser>()
            {
                new BusinessUser() { FirstName = "Ante" , LastName = "Antić", Email = "ante.antic@t-com.hr"},
                new BusinessUser() { FirstName = "Rob" , LastName = "Stark", Email = "rob.stark@winterfell-telecom.ws"},
            };

            BusinessUsers.ForEach(businessuser => context.BusinessUsers.Add(businessuser));

            var Locations = new List<Location>()
            {
                new Location() { City = "Split"},
                new Location() { City = "Solin"},
            };

            var Establishments = new List<Establishment>()
            {
                new Establishment() {EstablishmentName = "Bakini bureci d.o.o.", Location = Locations[0], WorkingHours  = "ne radimo nediljon" , BusinessUser = BusinessUsers[0] },
                new Establishment() {EstablishmentName = "Didini čvarci d.o.o.", Location = Locations[1], WorkingHours = "ne radimo nediljon", BusinessUser = BusinessUsers[1]},
            };
            BusinessUsers[0].Establishments = new List<Establishment>() {Establishments[0] };
            BusinessUsers[1].Establishments = new List<Establishment>() { Establishments[1] };
            Locations[0].Establishments = new List<Establishment>() {Establishments[0] };
            Locations[1].Establishments = new List<Establishment>() { Establishments[1] };

            Locations.ForEach(location => context.Locations.Add(location));
            Establishments.ForEach(establishment => context.Establishments.Add(establishment));

            context.SaveChanges();
        }
    }
}
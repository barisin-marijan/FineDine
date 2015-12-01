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

            var PersonalUsers = new List<PersonalUser>()
            {
                new PersonalUser() { FirstName = "Ante" , LastName = "Antić", Email = "ante.antic@t-com.hr"},
                new PersonalUser() { FirstName = "Rob" , LastName = "Stark", Email = "rob.stark@winterfell-telecom.ws"},
            };

            var BusinessUsers = new List<BusinessUser>()
            {
                new BusinessUser() { FirstName = "Ante" , LastName = "Antić", Email = "ante.antic@t-com.hr"},
                new BusinessUser() { FirstName = "Rob" , LastName = "Stark", Email = "rob.stark@winterfell-telecom.ws"},
            };
        }
    }
}
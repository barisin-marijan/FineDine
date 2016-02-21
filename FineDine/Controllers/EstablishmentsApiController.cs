using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FineDine.Models;

namespace FineDine.Controllers
{
    public class tempEstablishment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string WorkingHours { get; set; }
        public double? MainRating { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public string CategoryName { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Owner { get; set; }

        public tempEstablishment(int id, string name, string address, string workinghours, double? mainrating, string description, string phone, string catNam, string postalcode, string city, string owner)
        {
            Id = id;
            Name = name;
            Address = address;
            WorkingHours = workinghours;
            MainRating = mainrating;
            Description = description;
            PhoneNumber = phone;
            CategoryName = catNam;
            PostalCode = postalcode;
            City = city;
            Owner = owner;
        }

        public tempEstablishment()
        {
        }
    }

    public class EstablishmentsApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/EstablishmentsApi
        public IQueryable<tempEstablishment> GetEstablishments()
        {
            var dbEstablishments = from estbl in db.Establishments select new tempEstablishment() {Id = estbl.Id, Name = estbl.Name, Address = estbl.Address, WorkingHours = estbl.WorkingHours, MainRating = estbl.MainRating, Description = estbl.Description, PhoneNumber = estbl.PhoneNumber, CategoryName = estbl.Category.Name, PostalCode = estbl.Location.PostCode, City = estbl.Location.City, Owner = estbl.Owner.UserName };

            return dbEstablishments;
        }

        // GET: api/EstablishmentsApi/5
        [ResponseType(typeof(Establishment))]
        public IHttpActionResult GetEstablishment(int id)
        {
            Establishment establishment = db.Establishments.Find(id);
            if (establishment == null)
            {
                return NotFound();
            }

            var temp = new tempEstablishment(establishment.Id, establishment.Name, establishment.Address, establishment.WorkingHours, establishment.MainRating, establishment.Description, establishment.PhoneNumber,establishment.Category.Name, establishment.Location.PostCode, establishment.Location.City, establishment.Owner.UserName);

            return Ok(temp);                       
        }

        // PUT: api/EstablishmentsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstablishment(int id, tempEstablishment establishment)
        {
            Establishment newEstablishment = new Establishment();
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != establishment.Id)
            {
                return BadRequest();
            }
            else
            {
                var temp = from estbl in db.Establishments
                                   where estbl.Id == id
                                   select estbl;
                newEstablishment = temp.Single();
                
                var locationList = db.Locations.ToList();
                bool locationFlag = true;

                Location newLocation = new Location() { City = establishment.City, PostCode = establishment.PostalCode, Country = newEstablishment.Location.Country };

                foreach (var location in locationList)
                {
                    if (location.Country == newEstablishment.Location.Country && location.City == establishment.City && location.PostCode == establishment.PostalCode)
                    {
                        newLocation = location;
                        locationFlag = false;
                    }
                }

                if (locationFlag)
                    db.Locations.Add(newLocation);

                newEstablishment.Location = newLocation;

                newEstablishment.Address = establishment.Address;

                var categoriesList = db.Categories.ToList();
                if (establishment.CategoryName == "Restaurant")
                    newEstablishment.Category = categoriesList[0];
                else if (establishment.CategoryName == "Fast Food")
                    newEstablishment.Category = categoriesList[1];
                else if (establishment.CategoryName == "Bar")
                    newEstablishment.Category = categoriesList[2];
                else if (establishment.CategoryName == "Coffee Shop")
                    newEstablishment.Category = categoriesList[3];

                newEstablishment.PhoneNumber = establishment.PhoneNumber;
                newEstablishment.WorkingHours = establishment.WorkingHours;

                db.Entry(newEstablishment).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                    return Ok();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EstablishmentExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }            
            }
        }

        // POST: api/EstablishmentsApi
        [ResponseType(typeof(Establishment))]
        public IHttpActionResult PostEstablishment(Establishment establishment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Establishments.Add(establishment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = establishment.Id }, establishment);
        }

        // DELETE: api/EstablishmentsApi/5
        [ResponseType(typeof(Establishment))]
        public IHttpActionResult DeleteEstablishment(int id)
        {
            Establishment establishment = db.Establishments.Find(id);
            if (establishment == null)
            {
                return NotFound();
            }

            db.Establishments.Remove(establishment);
            db.SaveChanges();

            return Ok(establishment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstablishmentExists(int id)
        {
            return db.Establishments.Count(e => e.Id == id) > 0;
        }
    }
}
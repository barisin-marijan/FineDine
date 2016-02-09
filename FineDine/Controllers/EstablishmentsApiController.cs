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
    }

    public class EstablishmentsApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/EstablishmentsApi
        public IQueryable<Establishment> GetEstablishments()
        {
            return db.Establishments;
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
            //return Ok(Json(establishment));
            
        }

        // PUT: api/EstablishmentsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstablishment(int id, Establishment establishment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != establishment.Id)
            {
                return BadRequest();
            }

            db.Entry(establishment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
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

            return StatusCode(HttpStatusCode.NoContent);
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
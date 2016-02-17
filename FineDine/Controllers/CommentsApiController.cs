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
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FineDine.Controllers
{
    public class tempComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public string Date { get; set; }

        public string Author { get; set; }
        public int EstablishmentId { get; set; }

        public tempComment(int id, string content, int rating, string date, string author, int establishmentId)
        {
            Id = id;
            Content = content;
            Rating = rating;
            Date = date;
            Author = author;
            EstablishmentId = establishmentId;
        }

        public tempComment()
        {
            
        }
    }

    public class CommentsApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        // GET: api/CommentsApi/5
        //[ResponseType(typeof(Comment))]
        public IQueryable<tempComment> GetComment(int id)
        {
            var dbComments = from comment in db.Comments
                             where comment.Establishment.Id == id
                             select new tempComment() { Id = comment.Id, Content = comment.Content, Rating = comment.Rating, Date = comment.DateTime.ToString(), Author = comment.Author.UserName, EstablishmentId = comment.Establishment.Id } ;


            //IQueryable<tempComment> tempComments = null;

            return dbComments;
        }

        // PUT: api/CommentsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComment(int id, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comment.Id)
            {
                return BadRequest();
            }

            db.Entry(comment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // POST: api/CommentsApi
        [ResponseType(typeof(tempComment))]
        public IHttpActionResult PostComment(tempComment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedComment = new Comment();

            string id;
            id = User.Identity.GetUserId();
            id = RequestContext.Principal.Identity.GetUserId();
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            var currentUser = manager.FindById(id);

            addedComment.Author = currentUser;
            addedComment.Content = comment.Content;
            addedComment.DateTime = DateTime.Now;
            if (comment.Rating < 1)
                comment.Rating = 1;
            else if (comment.Rating > 5)
                comment.Rating = 5;
            addedComment.Rating = comment.Rating;

            var currentEstablishment = from estbl in db.Establishments where estbl.Id == comment.EstablishmentId select estbl;
            var final_establishment = currentEstablishment.Single();
            addedComment.Establishment = final_establishment;

            db.Comments.Add(addedComment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = comment.Id }, comment);
        }

        // DELETE: api/CommentsApi/5
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int id)
        {
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound();
            }

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok(comment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int id)
        {
            return db.Comments.Count(e => e.Id == id) > 0;
        }
    }
}
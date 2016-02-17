using FineDine.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace FineDine.Controllers
{
    public class userNameClass
    {
        public string un { get; set; }
    }


    public class ServicesApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        
        // GET: api/ServicesApi/5
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult GetService(userNameClass userName)
        {
            //var currentUserId = User.Identity.GetUserId();
            //var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            //var currentUser = manager.FindById(User.Identity.GetUserId());

            string id;
            id = User.Identity.GetUserId();
            id = RequestContext.Principal.Identity.GetUserId();
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            var currentUser = manager.FindById(id);

            if (currentUser == null)
                //return NotFound();
                //return Ok();
                return StatusCode(HttpStatusCode.NoContent);

            if (currentUser.UserName == userName.un)            
                return Ok();
            
            else
                //return BadRequest();     
                return StatusCode(HttpStatusCode.Accepted);

            //return Ok();
            //return StatusCode(HttpStatusCode.NoContent);
            //return Ok(Json<proba>(new proba()));            
        }

       
    }
}

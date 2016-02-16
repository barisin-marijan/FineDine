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
    public class ServicesApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ServicesApi/5
        [ResponseType(typeof(void))]
        [HttpGet]
        public IHttpActionResult GetService(string userName)
        {
            /*var currentUserId = User.Identity.GetUserId();
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            var currentUser = manager.FindById(User.Identity.GetUserId());

            if (currentUser == null)
                //return NotFound();
                return Ok();

            if (currentUser.UserName == userName)            
                return Ok();
            
            else
                return BadRequest();       */

            return Ok();
            

        }
    }
}

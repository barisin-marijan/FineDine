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
            string id;
            id = User.Identity.GetUserId();
            id = RequestContext.Principal.Identity.GetUserId();
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            var currentUser = manager.FindById(id);

            if (currentUser == null)
                return StatusCode(HttpStatusCode.NoContent);

            if (currentUser.UserName == userName.un)            
                return Ok();
            
            else   
                return StatusCode(HttpStatusCode.Accepted);          
        }

       
    }
}

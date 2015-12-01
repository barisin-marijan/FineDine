using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FineDine.DAL;
using FineDine.Models;

namespace FineDine.Controllers
{
    public class BusinessUsersController : Controller
    {
        private FineDineContext db = new FineDineContext();

        // GET: BusinessUsers
        public ActionResult Index()
        {
            var businessUsers = db.BusinessUsers.Include(b => b.Location);
            return View(businessUsers.ToList());
        }

        // GET: BusinessUsers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BusinessUser businessUser = db.BusinessUsers.Find(id);
            if (businessUser == null)
            {
                return HttpNotFound();
            }
            return View(businessUser);
        }

        // GET: BusinessUsers/Create
        public ActionResult Create()
        {
            ViewBag.LocationId = new SelectList(db.Locations, "Id", "City");
            return View();
        }

        // POST: BusinessUsers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,FirstName,LastName,Email,ProfilePicture,Address,LocationId")] BusinessUser businessUser)
        {
            if (ModelState.IsValid)
            {
                db.BusinessUsers.Add(businessUser);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.LocationId = new SelectList(db.Locations, "Id", "City", businessUser.LocationId);
            return View(businessUser);
        }

        // GET: BusinessUsers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BusinessUser businessUser = db.BusinessUsers.Find(id);
            if (businessUser == null)
            {
                return HttpNotFound();
            }
            ViewBag.LocationId = new SelectList(db.Locations, "Id", "City", businessUser.LocationId);
            return View(businessUser);
        }

        // POST: BusinessUsers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,FirstName,LastName,Email,ProfilePicture,Address,LocationId")] BusinessUser businessUser)
        {
            if (ModelState.IsValid)
            {
                db.Entry(businessUser).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.LocationId = new SelectList(db.Locations, "Id", "City", businessUser.LocationId);
            return View(businessUser);
        }

        // GET: BusinessUsers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BusinessUser businessUser = db.BusinessUsers.Find(id);
            if (businessUser == null)
            {
                return HttpNotFound();
            }
            return View(businessUser);
        }

        // POST: BusinessUsers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            BusinessUser businessUser = db.BusinessUsers.Find(id);
            db.BusinessUsers.Remove(businessUser);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

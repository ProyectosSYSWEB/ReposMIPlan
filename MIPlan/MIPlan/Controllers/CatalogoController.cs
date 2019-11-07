using MIPlan.Data;
using MIPlan.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MIPlan.Controllers
{
    public class CatalogoController : Controller
    {
        // GET: Catalogo
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Basicos()
        {
            return View();
        }

        // GET: Catalogo/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Catalogo/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Catalogo/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Catalogo/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Catalogo/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Catalogo/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Catalogo/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public JsonResult ListaAcreditadores(string TipoPer)
        {
            List<Comun> list = new List<Comun>();
            list=CursorDataContext.ObtenerAcreditadores(TipoPer);
            //List<Resultado> lstResultado = new List<Resultado>();
           


            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaBasicos(string TipoPer)
        {
            List<Comun> list = new List<Comun>();
            list = CursorDataContext.ObtenerAcreditadores(TipoPer);
            return Json(list, JsonRequestBehavior.AllowGet);
        }



    }
}

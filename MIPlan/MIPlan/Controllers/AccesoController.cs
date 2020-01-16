using MIPlan.Data;
using MIPlan.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MIPlan.Controllers
{
    public class AccesoController : Controller
    {
        // GET: Acceso
        public ActionResult Index()
        {
            return View();
        }

        // GET: Acceso/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Acceso/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Acceso/Create
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

        // GET: Acceso/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Acceso/Edit/5
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

        // GET: Acceso/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Acceso/Delete/5
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

        public JsonResult IniciarSesion (string usuario, string contrasena, string ejercicio)
        {
            Comun objComun = new Comun();
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            string Verificador = string.Empty;
            try
            {                
                objComun.Usuario = usuario;
                objComun.Contrasena = contrasena;
                objComun.Ejercicio = ejercicio;
                list = DataContext.VerificaUsuario(objComun, ref Verificador);                                
                if(Verificador == "0")
                {
                    System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"] = list;
                    objResultado.Error = false;
                    objResultado.MensajeError = "";
                    objResultado.Resultado = list;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                    return Json(objResultado, JsonRequestBehavior.AllowGet);
                }
            }
            catch(Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }
    }
}

using MIPlan.Data;
using MIPlan.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MIPlan.Controllers
{
    public class PlanTrabajoController : Controller
    {
        // GET: PlanTrabajo
        public ActionResult Index()
        {
            return View();
        }

        // GET: PlanTrabajo/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PlanTrabajo/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PlanTrabajo/Create
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

        // GET: PlanTrabajo/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PlanTrabajo/Edit/5
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

        // GET: PlanTrabajo/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PlanTrabajo/Delete/5
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
        public JsonResult ListaUnidadResponsable()
        {
            Sesion SesionUsu = new Sesion();
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            try
            {

                if (Session["UsuarioPlan"] != null)
                    SesionUsu = (Sesion)System.Web.HttpContext.Current.Session["UsuarioPlan"];
                else
                    SesionUsu.Usuario = "";

                list = CursorDataContext.ObtenerComboUnidades(SesionUsu.Usuario);
                objResultado.Error = false;
                objResultado.MensajeError = string.Empty;
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult ListaEjercicios()
        {
            Sesion SesionUsu = new Sesion();
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            try
            {

              
                list = CursorDataContext.ObtenerComboEjercicios();
                objResultado.Error = false;
                objResultado.MensajeError = string.Empty;
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult ListaPlanes()
        {
            Sesion SesionUsu = new Sesion();
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            try
            {


                list = CursorDataContext.ObtenerComboPlanTrabajo();
                objResultado.Error = false;
                objResultado.MensajeError = string.Empty;
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult GridAreasAtencion(string Dependencia)/**/
        {
            Sesion SesionUsu = new Sesion();
            List<AreasAtencion> list = new List<AreasAtencion>();
            ResultadoAreasAtencion objResultado = new ResultadoAreasAtencion();
            try
            {


                list =  CursorDataContext.ObtenerGridAreasAtencion(Dependencia);
                objResultado.Error = false;
                objResultado.MensajeError = string.Empty;
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult GridActividades(int idMeta)/**/
        {
            Sesion SesionUsu = new Sesion();
            List<Actividades> list = new List<Actividades>();
            ResultadoActividades objResultado = new ResultadoActividades();
            try
            {


                list = CursorDataContext.ObtenerGridActividades(idMeta);
                objResultado.Error = false;
                objResultado.MensajeError = string.Empty;
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult ObtenerDatosActividades(int Id)
        {
            Actividades objActividades = new Actividades();
            ResultadoActividades objResultado = new ResultadoActividades();
            string Verificador = string.Empty;
            try
            {                
                objResultado.Resultado = DataContext.ObtenerDatosActividades(Id, ref Verificador);
                if(Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = "";
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                }
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;

                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult EliminarActividades(int Id)
        {
            Actividades objActividades = new Actividades();
            ResultadoActividades objResultado = new ResultadoActividades();
            string Verificador = string.Empty;
            try
            {
                objActividades.Id = Id;
                GuardarDataContext.EliminarActividades(objActividades, ref Verificador);
                if(Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = "";
                    objResultado.Resultado = null;
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = "";
                    objResultado.Resultado = null;
                }
                return Json(objResultado, JsonRequestBehavior.AllowGet);
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

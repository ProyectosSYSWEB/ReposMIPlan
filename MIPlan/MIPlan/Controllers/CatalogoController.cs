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

        public ActionResult BasicosRegistro()
        {
            return View();
        }
        public ActionResult Acreditadores()
        {
            return View();
        }
        public ActionResult AcreditadoresRegistro()
        {
            return View();
        }

        public ActionResult AreasAtencion()
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

        //public JsonResult ListaBasicos()
        //{
        //    List<Comun> list = new List<Comun>();
        //    list = CursorDataContext.ObtenerBasicos();
        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult ObtenerDependencias()
        {
            List<Comun> list = new List<Comun>();
            Resultado objResultado = new Resultado();
            try
            {
                list = CursorDataContext.ObtenerDependencias("LISSETH");
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.LstComun = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.LstComun = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerGridBasicos(string Dependencia)
        {
            List<Basicos> list = new List<Basicos>();
            Resultado objResultado = new Resultado();
            try
            {
                list = CursorDataContext.ObtenerBasicos();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.LstBasicos = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.LstBasicos = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerGridAcreditaciones()
        {
            List<Acreditaciones> list = new List<Acreditaciones>();
            Resultado objResultado = new Resultado();
            try
            {
                list = CursorDataContext.ObtenerAcreditaciones();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.ListAcreditaciones = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
                //S
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.ListAcreditaciones = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerGridAreasAtencion()
        {
            List<AreasAtencion> list = new List<AreasAtencion>();
            Resultado objResultado = new Resultado();
            try
            {                
                list = CursorDataContext.ObtenerAreasAtencion();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.ListAreasAtencion = list;                
                return Json(objResultado, JsonRequestBehavior.AllowGet);                
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.ListAreasAtencion = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerUnidades()
        {
            List<Unidades> list = new List<Unidades>();
            Resultado objResultado = new Resultado();
            try
            {
                list = CursorDataContext.ObtenerUnidades();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.ListUnidades = list;                
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.ListUnidades = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }        

        public JsonResult GuardarBasicos(string tipo, string clave, string status, string descripcion, string valor, string orden)
        {
            Resultado objResultado = new Resultado();
            try
            {
                string Verificador = string.Empty;
                Basicos objBasicos = new Basicos();
                objBasicos.Tipo = tipo;
                objBasicos.Clave = clave;
                objBasicos.Status = status;
                objBasicos.Descripcion = descripcion;
                objBasicos.Valor = valor;
                objBasicos.Orden = orden;
                GuardarDataContext.GuardarBasicos(objBasicos, ref Verificador);
                if(Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = "";
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = Verificador;
                }
                return Json(objResultado, JsonRequestBehavior.AllowGet);
                
            }
            catch(Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }

    }
}

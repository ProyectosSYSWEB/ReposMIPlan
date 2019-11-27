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

        public ActionResult UnidadesResponsables()
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
            ResultadoComun objResultado = new ResultadoComun();
            try
            {
                list = CursorDataContext.ObtenerDependencias("LISSETH");
                objResultado.Error = false;
                objResultado.MensajeError = "";
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

        public JsonResult ObtenerGridBasicos(string Dependencia)
        {
            List<Basicos> list = new List<Basicos>();
            ResultadoBasicos objResultado = new ResultadoBasicos();
            try
            {
                list = CursorDataContext.ObtenerBasicos();
                objResultado.Error = false;
                objResultado.MensajeError = "";
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

        public JsonResult ObtenerGridAcreditaciones()
        {
            List<Acreditaciones> list = new List<Acreditaciones>();
            ResultadoAcreditacion objResultado = new ResultadoAcreditacion();
            try
            {
                list = CursorDataContext.ObtenerAcreditaciones();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
                //S
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerAcreditaciones(int IdAcreditacion)
        {
            string Verificador = string.Empty;
            ResultadoAcreditacion objResp = new ResultadoAcreditacion();

            try
            {
                var List = DataContext.ObtenerDatosAcreditaciones(IdAcreditacion, ref Verificador);
                if (Verificador == "0")
                {
                    objResp.Error = false;
                    objResp.MensajeError = string.Empty;
                    objResp.Resultado = List;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResp.Error = true;
                    objResp.MensajeError = Verificador;
                    objResp.Resultado = null;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResp.Error = true;
                objResp.MensajeError = Verificador;
                objResp.Resultado = null;
                return Json(objResp, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerAreasAtencion(int IdAreaAtencion)
        {
            string Verificador = string.Empty;
            ResultadoAreasAtencion objResp = new ResultadoAreasAtencion();

            try
            {
                var List = DataContext.ObtenerDatosAreasAtencion(IdAreaAtencion, ref Verificador);
                if (Verificador == "0")
                {
                    objResp.Error = false;
                    objResp.MensajeError = string.Empty;
                    objResp.Resultado = List;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResp.Error = true;
                    objResp.MensajeError = Verificador;
                    objResp.Resultado = null;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResp.Error = true;
                objResp.MensajeError = Verificador;
                objResp.Resultado = null;
                return Json(objResp, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerUnidadesResponsables(int IdUnidad)
        {
            string Verificador = string.Empty;
            ResultadoUnidades objResp = new ResultadoUnidades();

            try
            {
                var List = DataContext.ObtenerDatosUnidades(IdUnidad, ref Verificador);
                if (Verificador == "0")
                {
                    objResp.Error = false;
                    objResp.MensajeError = string.Empty;
                    objResp.Resultado = List;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResp.Error = true;
                    objResp.MensajeError = Verificador;
                    objResp.Resultado = null;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResp.Error = true;
                objResp.MensajeError = Verificador;
                objResp.Resultado = null;
                return Json(objResp, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult ObtenerGridAreasAtencion()
        {
            List<AreasAtencion> list = new List<AreasAtencion>();
            ResultadoAreasAtencion objResultado = new ResultadoAreasAtencion();
            try
            {                
                list = CursorDataContext.ObtenerAreasAtencion();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = list;                
                return Json(objResultado, JsonRequestBehavior.AllowGet);                
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ObtenerGridUnidadesResponsables()
        {
            string Verificador = string.Empty;

            ResultadoUnidades objResp = new ResultadoUnidades();          
            try
            {
                var List = CursorDataContext.ObtenerUnidadesResponsables();
                if (Verificador == "0")
                {
                    objResp.Error = false;
                    objResp.MensajeError = string.Empty;
                    objResp.Resultado = List;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    objResp.Error = true;
                    objResp.MensajeError = Verificador;
                    objResp.Resultado = null;
                    return Json(objResp, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                objResp.Error = true;
                objResp.MensajeError = Verificador;
                objResp.Resultado = null;
                return Json(objResp, JsonRequestBehavior.AllowGet);
            }


        }

        public JsonResult ObtenerUnidades()
        {
            List<Unidades> list = new List<Unidades>();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            try
            {
                list = CursorDataContext.ObtenerUnidades();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = list;                
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        /*METODOS DE LUIS*/
        public JsonResult ObtenerCarreras(string Dependencia)
        {
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            try
            {
                list = CursorDataContext.ObtenerCarreras(Dependencia);
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ObtenerOrganismos()
        {
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            try
            {
                list = CursorDataContext.ObtenerOrganismos();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ObtenerStatusAcreditaciones(string Dependencia)
        {
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            try
            {
                list = CursorDataContext.ObtenerCarreras(Dependencia);
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = list;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        /*FIN METODOS DE LUIS*/

        public JsonResult GuardarBasicos(string tipo, string clave, string status, string descripcion, string valor, string orden)
        {
            Resultado objResultado = new Resultado();
            try
            {
                //cambio
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

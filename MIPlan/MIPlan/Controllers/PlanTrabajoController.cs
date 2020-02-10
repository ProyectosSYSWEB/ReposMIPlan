using MIPlan.Data;
using MIPlan.Data.PlanTrabajo;
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

        /******************************************************************************************************************************Combos**************************/
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

                list = Data.PlanTrabajo.CursorDataContext.ObtenerComboUnidades(SesionUsu.Usuario);
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

              
                list = Data.PlanTrabajo.CursorDataContext.ObtenerComboEjercicios();
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


                list = Data.PlanTrabajo.CursorDataContext.ObtenerComboPlanTrabajo();
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
        /********************************************************************************************************************************************************/
        /******************************************************************************************************************************Areas de Atención**************************/
        public JsonResult GridAreasAtencion(string Dependencia)/**/
        {
            Sesion SesionUsu = new Sesion();
            List<AreasAtencion> list = new List<AreasAtencion>();
            ResultadoAreasAtencion objResultado = new ResultadoAreasAtencion();
            try
            {
                list = Data.PlanTrabajo.CursorDataContext.ObtenerGridAreasAtencion(Dependencia);
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

        /******************************************************************************************************************************Actividades**************************/
        public JsonResult GridActividades(int idMeta)/**/
        {
            Sesion SesionUsu = new Sesion();
            List<Actividades> list = new List<Actividades>();
            ResultadoActividades objResultado = new ResultadoActividades();
            try
            {


                list = Data.PlanTrabajo.CursorDataContext.ObtenerGridActividades(idMeta);
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
                objResultado.Resultado = Data.PlanTrabajo.DataContext.ObtenerDatosActividades(Id, ref Verificador);
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
       


        public JsonResult EditarActividades(int Id, string Programa, string Descripcion, string FechaInicio, string FechaFin, string Impacto, string Prioritaria, string Clave, string Status)
        {
            List<Sesion> SesionUsu = new List<Sesion>();
            Sesion objUsuario = new Sesion();

            Actividades objActividad = new Actividades();
            ResultadoActividades objResultado = new ResultadoActividades();
            string Verificador = string.Empty;
            try
            {
                objActividad.Id = Id;
                objActividad.Id_Programa = Convert.ToInt32(Programa);
                objActividad.Descripcion = Descripcion;
                objActividad.Fecha_Inicio = FechaInicio;
                objActividad.Fecha_Fin = FechaFin;
                objActividad.Impacto = Impacto;
                objActividad.Prioritaria = Prioritaria;
                objActividad.Clave = Clave;
                objActividad.Status = Status;

                SesionUsu = (List<Sesion>)System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"];
                Data.PlanTrabajo.GuardarDataContext.EditarActividades(objActividad, SesionUsu[0].Usuario, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = "";
                    objResultado.Resultado = null;
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = "No existe el registro";
                    objResultado.Resultado = null;
                }

                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GuardarActividades(string Meta, string Clave, string Descripcion, string Impacto,  string Status, string FechaInicio, string FechaFin, string Programa, string Prioritaria)
        {
            Actividades objActividad = new Actividades();
            ResultadoActividades objResultado = new ResultadoActividades();
            string Verificador = string.Empty;
            List<Sesion> SesionUsu = new List<Sesion>();
            if (System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"] != null)                        
                SesionUsu = (List<Sesion>)System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"];
            try
            {
                objActividad.Id_Meta = Convert.ToInt32(Meta);
                objActividad.Clave = Clave;
                objActividad.Descripcion = Descripcion;                
                objActividad.Impacto = Impacto;
                objActividad.Fecha_Inicio = FechaInicio;
                objActividad.Fecha_Fin = FechaFin;
                objActividad.Id_Programa = Convert.ToInt32(Programa);
                objActividad.Prioritaria = Prioritaria;
                objActividad.Status = Status;
                Data.PlanTrabajo.GuardarDataContext.GuardarActividades(objActividad, SesionUsu[0].Usuario, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = "";
                    objResultado.Resultado = null;
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                }
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

        public JsonResult EliminarActividades(int Id)
        {
            Actividades objActividades = new Actividades();
            ResultadoActividades objResultado = new ResultadoActividades();
            string Verificador = string.Empty;
            try
            {
                objActividades.Id = Id;
                Data.PlanTrabajo.GuardarDataContext.EliminarActividades(objActividades, ref Verificador);
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


        /********************************************************************************************************************************************************/
        public JsonResult ObtenerProgramas()
        {
            List<Comun> list = new List<Comun>();
            ResultadoComun objResultado = new ResultadoComun();
            try
            {
                string Verificador = string.Empty;
                list = Data.CursorDataContext.ObtenerComboBasicos("PRO", "null");
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


        /**********************************************************************************************************************Unidades Reponsables**********************************/
        public JsonResult GridUnidadesResp(int idActividad)/**/
        {            
            List<UnidadesResponsables> list = new List<UnidadesResponsables>();
            ResultadoUnidades objResultado = new ResultadoUnidades();
            string Verificador = string.Empty;
            List<Sesion> SesionUsu = new List<Sesion>();
            if (System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"] != null)
                SesionUsu = (List<Sesion>)System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"];

            try
            {


                list = Data.PlanTrabajo.CursorDataContext.ObtenerGridUnidadesResp(idActividad, SesionUsu[0].Usuario, ref Verificador);
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
        /********************************************************************************************************************************************************/
        public JsonResult ObtenerDatosUnidadesResp(int IdUnidad)
        {
            UnidadesResponsables objUnidadesResp = new UnidadesResponsables();
            ResultadoUnidades objResultado = new ResultadoUnidades();
            string Verificador = string.Empty;
            try
            {
                objResultado.Resultado = Data.PlanTrabajo.DataContext.ObtenerDatosUnidadesResp(IdUnidad, ref Verificador);
                if (Verificador == "0")
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
            catch (Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;

                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }
        /********************************************************************************************************************************************************/
        public JsonResult EditarUnidadesResp(int Id, string Dependencia, string Clave, string Descripcion, string Status, string Coordinador)
        {

            UnidadesResponsables objUnidadesResp = new UnidadesResponsables();
            ResultadoUnidades objResultado = new ResultadoUnidades();
            string Verificador = string.Empty;
            try
            {
                objUnidadesResp.Id = Id;
                objUnidadesResp.Dependencia = Dependencia;
                objUnidadesResp.Clave = Clave;
                objUnidadesResp.Descripcion = Descripcion;
                objUnidadesResp.Status = Status;
                objUnidadesResp.Coordinador = Coordinador;
           
                Data.PlanTrabajo.GuardarDataContext.EditarUnidadesResp(objUnidadesResp, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = "";
                    objResultado.Resultado = null;
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                }

                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        /********************************************************************************************************************************************************/

        public JsonResult EliminarUnidadResponsable(int IdR)
        {
            UnidadesResponsables objUnidad = new UnidadesResponsables();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {
                objUnidad.Id = IdR;
                Data.PlanTrabajo.GuardarDataContext.EliminarUnidadesResp(objUnidad, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                }
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


        /********************************************************************************************************************************************************/

        public JsonResult GuardarUnidadesResp(int Id_Actividades, int Id_Unidad)
        {
            ResponsableModel objUnidadesResp = new ResponsableModel();
            ResultadoResponsable objResultado = new ResultadoResponsable();
            string Verificador = string.Empty;
            try
            {

                objUnidadesResp.Id_Actividades = Id_Actividades;
                objUnidadesResp.Id_Unidad = Id_Unidad;
                Data.PlanTrabajo.GuardarDataContext.GuardarUnidadesResp(objUnidadesResp, ref Verificador);
                if (Verificador == "0")
                {
                    objResultado.Error = false;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                }
                else
                {
                    objResultado.Error = true;
                    objResultado.MensajeError = Verificador;
                    objResultado.Resultado = null;
                }
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

        /********************************************************************************************************************************************************/


        public JsonResult ObtenerGridUnidadesModal(string dependencia)
        {
            List<UnidadesResponsables> list = new List<UnidadesResponsables>();
            ResultadoUnidades objResultado = new ResultadoUnidades();
            string Verificador = string.Empty;
            List<Sesion> SesionUsu = new List<Sesion>();
            if (System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"] != null)
                SesionUsu = (List<Sesion>)System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"];

            try
            {


                list = Data.PlanTrabajo.CursorDataContext.ObtenerGridUnidadesModal(SesionUsu[0].Usuario, dependencia, ref Verificador);
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


    }
}

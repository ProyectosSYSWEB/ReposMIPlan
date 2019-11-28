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
        //}s

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

        public JsonResult ObtenerGridPeriodos()
        {
            List<Periodos> list = new List<Periodos>();
            ResultadoPeriodos objResultado = new ResultadoPeriodos();
            try
            {
                list = CursorDataContext.ObtenerPeriodos();
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = list;
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

        
        /*METODOS DE LUIS */
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

        public JsonResult ObtenerPerdiodos(int Id)
        {
            List<Periodos> list = new List<Periodos>();
            ResultadoPeriodos objResultado = new ResultadoPeriodos();
            try
            {
                string Verificador = string.Empty;
                list = DataContext.ObtenerDatosPeriodos(Id, ref Verificador);
                if(Verificador == "0")
                {
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
        

        public JsonResult EditarUnidadesResponsables (int id, string dependencia, string clave, string descripcion, string status, string coordinador)
        {
            Unidades objUnidades = new Unidades();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {
                objUnidades.Id = id;
                objUnidades.Dependencia = dependencia;
                objUnidades.Clave = clave;
                objUnidades.Descripcion = descripcion;
                objUnidades.Status = status.ToUpper();
                objUnidades.Coordinador = coordinador.ToUpper();
                GuardarDataContext.EditarUnidadesResponsables(objUnidades, ref Verificador);
                if (Verificador == "0"){
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
            catch(Exception ex)
            {
                objResultado.Error = true;
                objResultado.MensajeError = ex.Message;
                objResultado.Resultado = null;
                return Json(objResultado, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult EditarAreasAtencion(int id, string dependencia, string clave, string descripcion, string status, string categoria)
        {
            AreasAtencion objAreasAt = new AreasAtencion();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {
                objAreasAt.Id = id;
                objAreasAt.Dependencia = dependencia;
                objAreasAt.Clave = clave;
                objAreasAt.Descripcion = descripcion;
                objAreasAt.Status = status.ToUpper();
                objAreasAt.Categoria = categoria.ToUpper();
                GuardarDataContext.EditarAreasAtencion(objAreasAt, ref Verificador);
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

        public JsonResult EditarAcreditaciones(int id, string dependencia, string carrera, string organismo, string fechaIni, string fechaFin, string status, string observaciones)
        {
            Acreditaciones objAcreditaciones = new Acreditaciones();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {
                objAcreditaciones.Id = id;
                objAcreditaciones.Dependencia = dependencia;
                objAcreditaciones.Carrera = carrera;
                objAcreditaciones.Organismo = organismo;
                objAcreditaciones.FechaInicial = fechaIni;
                objAcreditaciones.FechaFinal = fechaFin;
                objAcreditaciones.Status = status;
                objAcreditaciones.Observaciones = observaciones;
                GuardarDataContext.EditarAcreditaciones(objAcreditaciones, ref Verificador);
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

        public JsonResult EditarPerdiodos(int id, string dependencia, string periodo, string descripcion, string status, string ejercicio, string inicio, string fin)
        {
            Periodos objPeriodos = new Periodos();
            ResultadoPeriodos objResultado = new ResultadoPeriodos();
            try
            {
                string Verificador = string.Empty;
                objPeriodos.Id = id;
                objPeriodos.Dependencia = dependencia;
                objPeriodos.Periodo = periodo;
                objPeriodos.Descripcion = descripcion;
                objPeriodos.Status = status;
                objPeriodos.Ejercicio = ejercicio;
                objPeriodos.Inicio = inicio;
                objPeriodos.Fin = fin;
                GuardarDataContext.EditarPeriodos(objPeriodos, ref Verificador);
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
        public JsonResult GuardarAcreditaciones(string dependencia, string carrera, string organismo, string fechaIni, string fechaFin, string status, string observaciones)
        {
            Acreditaciones objAcreditaciones = new Acreditaciones();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {                
                objAcreditaciones.Dependencia = dependencia;
                objAcreditaciones.Carrera = carrera;
                objAcreditaciones.Organismo = organismo;
                objAcreditaciones.FechaInicial = fechaIni;
                objAcreditaciones.FechaFinal = fechaFin;
                objAcreditaciones.Status = status;
                objAcreditaciones.Observaciones = observaciones;
                GuardarDataContext.GuardarAcreditaciones(objAcreditaciones, ref Verificador);
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

        public JsonResult GuardarAreasAtencion(string dependencia, string clave, string descripcion, string status, string categoria)
        {
            AreasAtencion objAreasAt = new AreasAtencion();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {                
                objAreasAt.Dependencia = dependencia;
                objAreasAt.Clave = clave;
                objAreasAt.Descripcion = descripcion;
                objAreasAt.Status = status.ToUpper();
                objAreasAt.Categoria = categoria.ToUpper();
                GuardarDataContext.GuardarAreasAtencion(objAreasAt, ref Verificador);
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

        public JsonResult GuardarUnidadesResponsables(string dependencia, string clave, string descripcion, string status, string coordinador)
        {
            Unidades objUnidades = new Unidades();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {                
                objUnidades.Dependencia = dependencia;
                objUnidades.Clave = clave;
                objUnidades.Descripcion = descripcion;
                objUnidades.Status = status.ToUpper();
                objUnidades.Coordinador = coordinador.ToUpper();
                GuardarDataContext.GuardarUnidadesResponsables(objUnidades, ref Verificador);
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

        public JsonResult GuardarPerdiodos(string dependencia, string periodo, string descripcion, string status, string ejercicio, string inicio, string fin)
        {
            Periodos objPeriodos = new Periodos();
            ResultadoPeriodos objResultado = new ResultadoPeriodos();            
            try
            {
                string Verificador = string.Empty;
                objPeriodos.Dependencia = dependencia;
                objPeriodos.Periodo = periodo;
                objPeriodos.Descripcion = descripcion;
                objPeriodos.Status = status;
                objPeriodos.Ejercicio = ejercicio;
                objPeriodos.Inicio = inicio;
                objPeriodos.Fin = fin;
                GuardarDataContext.GuardarPeriodos(objPeriodos, ref Verificador);
                if(Verificador == "0")
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
                return Json(objResultado,JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult EliminarAcreditacion(int IdAcreditacion)
        {
            Acreditaciones objAcreditacion = new Acreditaciones();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {               
                objAcreditacion.Id = IdAcreditacion;
                GuardarDataContext.EliminarAcreditacion(objAcreditacion, ref Verificador);
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

        public JsonResult EliminarAreaAtencion(int IdArea)
        {
            AreasAtencion objAreasAt = new AreasAtencion();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {
                objAreasAt.Id = IdArea;
                GuardarDataContext.EliminarAreaAtencion(objAreasAt, ref Verificador);
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

        public JsonResult EliminarUnidadResponsable(int IdUnidad)
        {
            Unidades objUnidad = new Unidades();
            ResultadoUnidad objResultado = new ResultadoUnidad();
            string Verificador = string.Empty;
            try
            {
                objUnidad.Id = IdUnidad;
                GuardarDataContext.EliminarUnidadResponsable(objUnidad, ref Verificador);
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

        public JsonResult EliminarPeriodo(int Id)
        {
            Periodos objPeriodos = new Periodos();
            ResultadoPeriodos objResultado = new ResultadoPeriodos();
            string Verificador = string.Empty;
            try
            {
                objPeriodos.Id = Id;
                GuardarDataContext.EliminarPeriodo(objPeriodos, ref Verificador);
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





    }
}

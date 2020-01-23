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

        public JsonResult ObtenerDatosUsuario()
        {
            ResultadoSesion objResultado = new ResultadoSesion();
            try
            {
                objResultado.Resultado = (List<Sesion>)System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"];
                objResultado.Error = false;
                objResultado.MensajeError = "";
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

        public JsonResult IniciarSesion (string usuario, string contrasena, string ejercicio)
        {
            Sesion objSesion = new Sesion();
            List<Sesion> list = new List<Sesion>();
            ResultadoSesion objResultado = new ResultadoSesion();
            string Verificador = string.Empty;
            try
            {
                objSesion.Usuario = usuario.ToUpper();
                objSesion.Contrasena = contrasena;
                objSesion.Ejercicio = Convert.ToInt32(ejercicio);
                list = DataContext.VerificaUsuario(objSesion, ref Verificador);                                
                if(Verificador == "0")
                {
                    if (list[0].Existe == "S")
                    {
                        System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"] = list;
                        objResultado.Error = false;
                        objResultado.MensajeError = "";
                        objResultado.Resultado = list;
                    }
                    else
                    {
                        objResultado.Error = true;
                        objResultado.MensajeError = "Usuario o contraseña erroneos";
                        objResultado.Resultado = null;
                    }
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


        public JsonResult CerrarSesion()
        {
            ResultadoSesion objResultado = new ResultadoSesion();
            try
            {
                System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"] = null;
                objResultado.Error = false;
                objResultado.MensajeError = "";
                objResultado.Resultado = null;
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

        public JsonResult ObtenerMenu()
        {
            List<Sesion> SesionUsu = new List<Sesion>();
            SesionUsu = (List<Sesion>)System.Web.HttpContext.Current.Session["SessionDatosUsuarioLogeado"];
            if (SesionUsu != null)
            {
                try
                {
                    var ListaMenu = System.Web.HttpContext.Current.Session["ListaMenu"];
                    if (ListaMenu == null)
                    {
                        var Lista = CursorDataContext.ObtenerMenu(SesionUsu[0].Usuario.ToUpper());
                        List<MENUPADRE> list = new List<MENUPADRE>();
                        if (Lista.MENUPADRE.Count > 0)
                        {
                            MENU dc = new MENU();
                            {
                                var menu = Lista.MENUPADRE.Select(c => new
                                {
                                    c.ID,
                                    c.NOMBRE,
                                    SubMenu = c.SUBMENU.Select(s => new
                                    {
                                        s.NOMBRE,
                                        s.CONTROL_NOMBRE
                                    })
                                });
                                System.Web.HttpContext.Current.Session["ListaMenu"] = Lista;
                                return new JsonResult
                                {
                                    Data = menu,
                                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                                };
                            }
                        }
                        else
                            return Json(false, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        var Lista = System.Web.HttpContext.Current.Session["ListaMenu"] as MENU;
                        List<MENUPADRE> list = new List<MENUPADRE>();
                        if (Lista.MENUPADRE.Count > 0)
                        {
                            MENU dc = new MENU();
                            {
                                var menu = Lista.MENUPADRE.Select(c => new
                                {
                                    c.ID,
                                    c.NOMBRE,
                                    SubMenu = c.SUBMENU.Select(s => new
                                    {
                                        s.NOMBRE,
                                        s.CONTROL_NOMBRE
                                    })
                                });
                                System.Web.HttpContext.Current.Session["ListaMenu"] = Lista;
                                return new JsonResult
                                {
                                    Data = menu,
                                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                                };
                            }
                        }
                        else
                            return Json(false, JsonRequestBehavior.AllowGet);
                    }

                }
                catch (Exception ex)
                {
                    return Json("Error256" + ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}

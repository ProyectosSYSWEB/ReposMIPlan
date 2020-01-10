using MIPlan.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Data
{
    public class CursorDataContext
    {
        public static List<Comun> ObtenerAcreditadores(string TipoPersona)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Acreditadores", ref dr);
                List<Comun> listarComun = new List<Comun>();
                while (dr.Read())
                {
                    Comun objComun = new Comun();
                    objComun.Id = Convert.ToString(dr[0]);
                    objComun.Descripcion = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
                }
                return listarComun;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Basicos> ObtenerBasicos()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {                
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Basicos", ref dr);
                List<Basicos> listarBasicos = new List<Basicos>();
                while (dr.Read())
                {
                    Basicos objBasicos = new Basicos();
                    objBasicos.Id = Convert.ToInt32(dr[0]);
                    objBasicos.Tipo = Convert.ToString(dr[1]);
                    objBasicos.Clave = Convert.ToString(dr[2]);
                    objBasicos.Status = Convert.ToString(dr[3]);
                    objBasicos.Descripcion = Convert.ToString(dr[4]);
                    objBasicos.Valor = Convert.ToString(dr[5]);
                    objBasicos.Orden = Convert.ToString(dr[6]);

                    listarBasicos.Add(objBasicos);
                }
                return listarBasicos;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerDependencias(string Usuario)
        {
            string[] Parametros = { "p_tipo" };
            object[] Valores = { Usuario };
            var Lista = ExeProcedimiento.GenerarOracleCommandCursor_Combo("PKG_PLANEACION.Obt_Combo_Dependencia", Parametros, Valores);
            return Lista;
        }
        public static List<Acreditaciones> ObtenerAcreditaciones(string Dependencia)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia" };
                object[] Valores = { Dependencia };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Acreditaciones", ref dr, Parametros, Valores);
                List<Acreditaciones> listarAcreditaciones = new List<Acreditaciones>();
                while (dr.Read())
                {
                    Acreditaciones objAcreditaciones = new Acreditaciones();
                    objAcreditaciones.Id = Convert.ToInt32(dr[0]);
                    objAcreditaciones.Dependencia = Convert.ToString(dr[1]);
                    objAcreditaciones.Carrera = Convert.ToString(dr[2]);
                    objAcreditaciones.Organismo = Convert.ToString(dr[3]);
                    objAcreditaciones.FechaInicial = Convert.ToString(dr[4]);
                    objAcreditaciones.FechaFinal = Convert.ToString(dr[5]);
                    objAcreditaciones.Status = Convert.ToString(dr[6]);
                    objAcreditaciones.Observaciones = Convert.ToString(dr[7]);

                    listarAcreditaciones.Add(objAcreditaciones);
                }
                return listarAcreditaciones;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<AreasAtencion> ObtenerAreasAtencion(string Dependencia)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia" };
                object[] Valores = { Dependencia };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_AreasAtencion", ref dr, Parametros, Valores);
                List<AreasAtencion> listarAreasAtencion = new List<AreasAtencion>();
                while (dr.Read())
                {
                    AreasAtencion objAreasAtencion = new AreasAtencion();
                    objAreasAtencion.Id = Convert.ToInt32(dr[0]);
                    objAreasAtencion.Dependencia = Convert.ToString(dr[1]);
                    objAreasAtencion.Clave = Convert.ToString(dr[2]);
                    objAreasAtencion.Descripcion = Convert.ToString(dr[3]);
                    objAreasAtencion.Status = Convert.ToString(dr[4]);
                    objAreasAtencion.Categoria = Convert.ToString(dr[5]);
                    listarAreasAtencion.Add(objAreasAtencion);
                }
                return listarAreasAtencion;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Unidades> ObtenerUnidades(string Dependencia)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia" };
                object[] Valores = { Dependencia };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Unidades", ref dr, Parametros, Valores);
                List<Unidades> listarUnidades = new List<Unidades>();
                while (dr.Read())
                {
                    Unidades objUnidades = new Unidades();
                    objUnidades.Id = Convert.ToInt32(dr[0]);
                    objUnidades.Dependencia = Convert.ToString(dr[1]);
                    objUnidades.Clave = Convert.ToString(dr[2]);
                    objUnidades.Descripcion = Convert.ToString(dr[3]);
                    objUnidades.Status = Convert.ToString(dr[4]);
                    objUnidades.Coordinador = Convert.ToString(dr[5]);

                    listarUnidades.Add(objUnidades);
                }
                return listarUnidades;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerCarreras(string Dependencia)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia" };
                object[] Valores = { Dependencia };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Carreras", ref dr, Parametros, Valores);
                List<Comun> listarComun = new List<Comun>();
                while (dr.Read())
                {
                    Comun objComun = new Comun();
                    objComun.Id = Convert.ToString(dr[0]);
                    objComun.Descripcion = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
                }
                return listarComun;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerOrganismos()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Organismos", ref dr);
                List<Comun> listarComun = new List<Comun>();
                while (dr.Read())
                {
                    Comun objComun = new Comun();
                    objComun.Id = Convert.ToString(dr[0]);
                    objComun.Descripcion = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
                }
                return listarComun;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerComboBasicos(string Tipo, string SubTipo)
        {
            //IND
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_TIPO", "P_SUBTIPO" };
                object[] Valores = { Tipo, SubTipo };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Basicos", ref dr, Parametros, Valores);
                List<Comun> listarComun = new List<Comun>();
                while (dr.Read())
                {
                    Comun objComun = new Comun();
                    objComun.Id = Convert.ToString(dr[0]);
                    objComun.Descripcion = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
                }
                return listarComun;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerStatusAcreditaciones()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Status_Acredita", ref dr);
                List<Comun> listarComun = new List<Comun>();
                while (dr.Read())
                {
                    Comun objComun = new Comun();
                    objComun.Id = Convert.ToString(dr[0]);
                    objComun.Descripcion = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
                }
                return listarComun;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<UnidadesResponsables> ObtenerUnidadesResponsables(string Dependencia)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia" };
                object[] Valores = { Dependencia };
                OracleDataReader dr = null;              
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Unidades_Responsables", ref dr, Parametros, Valores);
                List<UnidadesResponsables> listarUnidades = new List<UnidadesResponsables>();
                while (dr.Read())
                {
                    UnidadesResponsables objrUnidades = new UnidadesResponsables();
                    objrUnidades.Id = Convert.ToInt32(dr[0]);
                    objrUnidades.Dependecia = Convert.ToString(dr[1]);
                    objrUnidades.Clave = Convert.ToString(dr[2]);
                    objrUnidades.Descripcion = Convert.ToString(dr[3]);
                    objrUnidades.Status = Convert.ToString(dr[4]);
                    objrUnidades.Coordinador = Convert.ToString(dr[4]);
                    listarUnidades.Add(objrUnidades);
                }
                return listarUnidades;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Periodos> ObtenerPeriodos(string Dependencia)
        {
            //
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Dependencia" };
                object[] Valores = { Dependencia };
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Periodos", ref dr,Parametros, Valores);
                List<Periodos> listarPeriodos = new List<Periodos>();
                while (dr.Read())
                {
                    Periodos objPeriodos = new Periodos();
                    objPeriodos.Id = Convert.ToInt32(dr[0]);
                    objPeriodos.Dependencia = Convert.ToString(dr[1]);
                    objPeriodos.Periodo = Convert.ToString(dr[2]);
                    objPeriodos.Descripcion = Convert.ToString(dr[3]);
                    objPeriodos.Status = Convert.ToString(dr[4]);
                    objPeriodos.Ejercicio = Convert.ToString(dr[5]);
                    objPeriodos.Inicio = Convert.ToString(dr[6]);
                    objPeriodos.Fin = Convert.ToString(dr[7]);
                    listarPeriodos.Add(objPeriodos);
                }
                return listarPeriodos;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerComboUnidades(string Usuario)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_Usuario" };
                object[] Valores = { Usuario };


                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Unidades", ref dr, Parametros, Valores);
                List<Comun> listarUnidades = new List<Comun>();
                while (dr.Read())
                {
                    Comun objUnidades = new Comun();
                    objUnidades.Id = Convert.ToString(dr[0]);                   
                    objUnidades.Descripcion = Convert.ToString(dr[1]);
                    listarUnidades.Add(objUnidades);
                }
                return listarUnidades;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerComboEjercicios()
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
               

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Ejercicios", ref dr);
                List<Comun> listarEjercicios = new List<Comun>();
                while (dr.Read())
                {
                    Comun objEjercicio = new Comun();
                    objEjercicio.Id = Convert.ToString(dr[0]);
                    objEjercicio.Descripcion = Convert.ToString(dr[1]);
                    listarEjercicios.Add(objEjercicio);
                }
                return listarEjercicios;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerComboPlanTrabajo()
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {


                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Plan", ref dr);
                List<Comun> listarPlanes = new List<Comun>();
                while (dr.Read())
                {
                    Comun objPlan = new Comun();
                    objPlan.Id = Convert.ToString(dr[0]);
                    objPlan.Descripcion = Convert.ToString(dr[1]);
                    listarPlanes.Add(objPlan);
                }
                return listarPlanes;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<AreasAtencion> ObtenerGridAreasAtencion(string Dependencia)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {

                string[] Parametros = { "p_dependencia" };
                object[] Valores = { Dependencia };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Areas_Atencion", ref dr, Parametros, Valores);
                List<AreasAtencion> listarAreasAtencion = new List<AreasAtencion>();
                while (dr.Read())
                {
                    AreasAtencion objAreaAtencion = new AreasAtencion();
                    objAreaAtencion.Id = Convert.ToInt32(dr[0]);
                    objAreaAtencion.Descripcion = Convert.ToString(dr[2]);
                    listarAreasAtencion.Add(objAreaAtencion);
                }
                return listarAreasAtencion;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerComboCatBasicos()
        {            
            var Lista = ExeProcedimiento.GenerarOracleCommandCursor_Combo("PKG_PLANEACION.Obt_Combo_Cat_Basicos");
            return Lista;
        }
        public static List<Basicos> ObtenerGridBasicos(string IdBasicos)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {

                string[] Parametros = { "p_clave" };
                object[] Valores = { IdBasicos };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Basicos", ref dr, Parametros, Valores);
                List<Basicos> list = new List<Basicos>();
                while (dr.Read())
                {
                    Basicos objBasicos = new Basicos();
                    objBasicos.Id = Convert.ToInt32(dr[0]);
                    objBasicos.DescripcionPadre = Convert.ToString(dr[7]);
                    objBasicos.Clave = Convert.ToString(dr[2]);
                    objBasicos.Descripcion = Convert.ToString(dr[4]);
                    objBasicos.Status = Convert.ToString(dr[3]);
                    list.Add(objBasicos);
                }
                return list;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }

    }
}

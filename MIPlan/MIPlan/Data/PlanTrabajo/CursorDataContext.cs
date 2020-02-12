using MIPlan.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Data.PlanTrabajo
{
    public class CursorDataContext
    {
        public static List<Comun> GridUnidadesDisponibles(string Usuario)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                string[] Parametros = { "P_USUARIO" };
                object[] Valores = { Usuario };


                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Unidades_Disponibles", ref dr, Parametros, Valores);
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
        /********************************************************************************************************************************************************/
        public static List<AreasAtencion> ObtenerGridAreasAtencion(int buscarPlan)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                //No se envia nada por que en el procedimiento Obt_Grid_Areas_Atencion esta por defecto el plan 3 
                //ya no debe recibir la dependencia, cambiar*
                string[] Parametros = { "P_PLAN" };
                object[] Valores = { buscarPlan };

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
        /********************************************************************************************************************************************************/

        public static List<AreasAtencion> ObtenerModalGridAreasAtencion(int Ejercicio, string Dependencia)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {

                string[] Parametros = { "p_ejercicio", "p_dependencia" };
                object[] Valores = { Ejercicio, Dependencia };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Plan_AreasAtencion", ref dr, Parametros, Valores);
                List<AreasAtencion> listarAreasAtencion = new List<AreasAtencion>();
                while (dr.Read())
                {
                    AreasAtencion objAreaAtencion = new AreasAtencion();               
                    objAreaAtencion.Id_Area = Convert.ToInt32(dr[1]);
                    objAreaAtencion.Descripcion = Convert.ToString(dr[2]);
                    objAreaAtencion.Id_Plan = Convert.ToInt32(dr[0]);


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
        /********************************************************************************************************************************************************/


        public static List<Actividades> ObtenerGridActividades(int idMeta)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {

                string[] Parametros = { "P_Id_Meta" };
                object[] Valores = { idMeta };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Actividades", ref dr, Parametros, Valores);
                List<Actividades> listarActividades = new List<Actividades>();
                while (dr.Read())
                {
                    Actividades objActividad = new Actividades();
                    objActividad.Id = Convert.ToInt32(dr[0]);
                    objActividad.Desc_Programa = Convert.ToString(dr[1]);
                    objActividad.Desc_Accion = Convert.ToString(dr[2]);
                    objActividad.Fecha_Inicio = Convert.ToString(dr[3]);
                    objActividad.Fecha_Fin = Convert.ToString(dr[4]);
                    objActividad.Impacto = Convert.ToString(dr[5]);
                    objActividad.Prioritaria = Convert.ToString(dr[6]);
                    objActividad.Status = Convert.ToString(dr[8]);
                   
                    
                    listarActividades.Add(objActividad);
                }
                return listarActividades;

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
        public static List<UnidadesResponsables> ObtenerGridUnidadesModal(string usuario, string dependencia, ref string Verificador)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {

                string[] Parametros = { "P_Usuario", "P_Dependencia" };
                object[] Valores = { usuario, dependencia };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Unidades_Usuario", ref dr, Parametros, Valores);
                List<UnidadesResponsables> listarUnidad = new List<UnidadesResponsables>();
                while (dr.Read())
                {
                    UnidadesResponsables objUnidad = new UnidadesResponsables();
                    objUnidad.Id = Convert.ToInt32(dr[0]);
                    objUnidad.Dependencia = Convert.ToString(dr[1]);
                    objUnidad.Clave = Convert.ToString(dr[2]);
                    objUnidad.Descripcion = Convert.ToString(dr[3]);
                    objUnidad.Status = Convert.ToString(dr[4]);
                    objUnidad.Coordinador = Convert.ToString(dr[5]);
                    


                    listarUnidad.Add(objUnidad);
                }
                return listarUnidad;

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
        public static List<PlanUnidadesResponsables> ObtenerGridUnidadesResp(int idActividad, string Usuario)
        {
            //s
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {

                string[] Parametros = { "P_Id_Actividad", "P_Usuario" };
                object[] Valores = { idActividad, Usuario };

                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Unidades_Resp", ref dr, Parametros, Valores);
                List<PlanUnidadesResponsables> list = new List<PlanUnidadesResponsables>();
                while (dr.Read())
                {
                    PlanUnidadesResponsables objUnidadResp = new PlanUnidadesResponsables();
                    objUnidadResp.Id = Convert.ToInt32(dr[0]);
                    objUnidadResp.Id_Actividad = Convert.ToInt32(dr[1]);
                    objUnidadResp.Descripcion = Convert.ToString(dr[2]);
                    objUnidadResp.Contacto = Convert.ToString(dr[3]);

                    list.Add(objUnidadResp);
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
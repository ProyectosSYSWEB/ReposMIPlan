using MIPlan.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Data.PlanTrabajo
{
    public class GuardarDataContext
    {
        public static void GuardarAreasAtencion(int Id_Plan, int Id_Area_Atencion, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_PLAN", "P_ID_AREA_ATENCION" };
                object[] Valores = { Id_Plan, Id_Area_Atencion };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_PLA_PLAN_METAS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }
        public static void EliminarAreasAtencion(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("DEL_PLA_PLAN_METAS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }

        public static void GuardarActividades(Actividades objActividad, string Usuario, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_META", "P_CLAVE", "P_DESCRIPCION", "P_IMPACTO",  "P_FECHA_INICIO", "P_FECHA_FIN", "P_ALTA_USUARIO", "P_ID_PROGRAMA", "P_PRIORITARIA", "P_STATUS" };
                object[] Valores = { objActividad.Id_Meta, objActividad.Clave, objActividad.Descripcion, objActividad.Impacto, objActividad.Fecha_Inicio, objActividad.Fecha_Fin, Usuario, objActividad.Id_Programa, objActividad.Prioritaria, objActividad.Status };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_PLA_PLAN_ACTIVIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }
        public static void EditarActividades(Actividades objActividad, string Usuario, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID", "P_ID_PROGRAMA", "P_DESCRIPCION", "P_FECHA_INICIO", "P_FECHA_FIN", "P_IMPACTO", "P_PRIORITARIA", "P_USUARIO_MODIFICA", "P_CLAVE", "P_STATUS"};
                object[] Valores = { objActividad.Id, objActividad.Id_Programa, objActividad.Descripcion, objActividad.Fecha_Inicio, objActividad.Fecha_Fin, objActividad.Impacto, objActividad.Prioritaria, Usuario, objActividad.Clave, objActividad.Status };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("UPD_PLA_PLAN_ACTIVIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }
        public static void EliminarActividades(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("DEL_PLA_PLAN_ACTIVIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }


        public static void GuardarUnidadesResp(ResponsableModel objUnidadesResp, ref string Verificador)
        {                   
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_ACTIVIDAD", "P_ID_UNIDAD" };
                object[] Valores = { objUnidadesResp.Id_Actividades, objUnidadesResp.Id_Unidad };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_PLA_PLAN_RESPONSABLES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }
        public static void EditarUnidadesResp(UnidadesResponsables objUnidadesResp, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID", "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_COORDINADOR"};
                object[] Valores = { objUnidadesResp.Id, objUnidadesResp.Dependencia, objUnidadesResp.Clave, objUnidadesResp.Descripcion, objUnidadesResp.Status, objUnidadesResp.Coordinador};
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("UPD_PLA_UNIDAES_RESP", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }    
        public static void EliminarUnidadesResp(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("DEL_PLA_PLAN_RESPONSABLES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
        }

    }
}
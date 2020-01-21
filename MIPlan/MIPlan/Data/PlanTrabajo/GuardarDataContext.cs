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
        public static void GuardarActividades(Actividades objActividad, string Usuario, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_META", "P_CLAVE", "P_DESCRIPCION", "P_IMPACTO",  "P_FECHA_INICIO", "P_FECHA_FIN", "P_ALTA_USUARIO", "P_ID_PROGRAMA", "P_PRIORITARIA" };
                object[] Valores = { objActividad.Id_Meta, objActividad.Clave, objActividad.Descripcion, objActividad.Impacto, objActividad.Fecha_Inicio, objActividad.Fecha_Fin, Usuario, objActividad.Id_Programa, objActividad.Prioritaria };
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
                string[] Parametros = { "P_ID", "P_ID_PROGRAMA", "P_DESCRIPCION", "P_FECHA_INICIO", "P_FECHA_FIN", "P_IMPACTO", "P_PRIORITARIA", "P_USUARIO_MODIFICA" };
                object[] Valores = { objActividad.Id, objActividad.Id_Programa, objActividad.Descripcion, objActividad.Fecha_Inicio, objActividad.Fecha_Fin, objActividad.Impacto, objActividad.Prioritaria, Usuario};
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
        public static void EliminarActividades(Actividades objActividades, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { objActividades.Id };
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

    }
}
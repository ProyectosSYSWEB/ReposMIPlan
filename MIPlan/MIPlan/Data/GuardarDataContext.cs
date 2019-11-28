using MIPlan.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Data
{
    public class GuardarDataContext
    {
        public static void GuardarBasicos(Basicos objBasicos, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = {"P_TIPO", "P_CLAVE", "P_STATUS",
                    "P_DESCRIPCION", "P_VALOR", "P_ORDEN"};
                object[] Valores = { objBasicos.Tipo, objBasicos.Clave, objBasicos.Status, objBasicos.Descripcion, objBasicos.Valor, objBasicos.Orden };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_PLA_BASICOS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);                
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

        public static void EditarUnidadesResponsables(Unidades objUnidades, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = {"P_ID", "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_COORDINADOR"};
                object[] Valores = { objUnidades.Id, objUnidades.Dependencia, objUnidades.Clave, objUnidades.Descripcion, objUnidades.Status, objUnidades.Coordinador };
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

        public static void EditarAreasAtencion(AreasAtencion objAreasAtencion, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID", "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_CATEGORIA" };
                object[] Valores = { objAreasAtencion.Id, objAreasAtencion.Dependencia, objAreasAtencion.Clave, objAreasAtencion.Descripcion, objAreasAtencion.Status, objAreasAtencion.Categoria };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("UPD_AREAS_ATENCION", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
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

        public static void EditarAcreditaciones(Acreditaciones objAcreditaciones, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_ID", "P_DEPENDENCIA", "P_CARRERA", "P_ORGANISMO", "P_FECHA_INICIAL", "P_FECHA_FINAL", "P_STATUS", "P_OBSERVACIONES" };
                object[] Valores = { objAcreditaciones.Id, objAcreditaciones.Dependencia, objAcreditaciones.Carrera, objAcreditaciones.Organismo, objAcreditaciones.FechaInicial, objAcreditaciones.FechaFinal, objAcreditaciones.Status, objAcreditaciones.Observaciones };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("UPD_ACREDITACIONES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
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



        public static void GuardarAcreditaciones(Acreditaciones objAcreditaciones, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_DEPENDENCIA", "P_CARRERA", "P_ORGANISMO", "P_FECHA_INICIAL", "P_FECHA_FINAL", "P_STATUS", "P_OBSERVACIONES" };
                object[] Valores = { objAcreditaciones.Dependencia, objAcreditaciones.Carrera, objAcreditaciones.Organismo, objAcreditaciones.FechaInicial, objAcreditaciones.FechaFinal, objAcreditaciones.Status, objAcreditaciones.Observaciones };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_PLA_ACREDITACIONES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
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

        public static void GuardarAreasAtencion(AreasAtencion objAreasAtencion, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_CATEGORIA" };
                object[] Valores = { objAreasAtencion.Dependencia, objAreasAtencion.Clave, objAreasAtencion.Descripcion, objAreasAtencion.Status, objAreasAtencion.Categoria };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_PLA_AREAS_ATENCION", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
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

        public static void GuardarUnidadesResponsables(Unidades objUnidades, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            try
            {
                OracleDataReader dr = null;
                string[] Parametros = { "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_COORDINADOR" };
                object[] Valores = { objUnidades.Dependencia, objUnidades.Clave, objUnidades.Descripcion, objUnidades.Status, objUnidades.Coordinador };
                string[] ParametrosOut = { "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("INS_PLA_UNIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
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
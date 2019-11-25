using MIPlan.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Data
{
    public class DataContext
    {
        public static List<Acreditaciones> ObtenerDatosAcreditaciones(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<Acreditaciones> list = new List<Acreditaciones>();
            Acreditaciones objDatosAcreditacion = new Acreditaciones();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_ACREDITADOR" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_DEPENDENCIA", "P_CARRERA", "P_ORGANISMO", "P_FECHA_INICIAL", "P_FECHA_FINAL", "P_STATUS", "P_OBSERVACIONES", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_ACREDITACIONES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objDatosAcreditacion.Dependencia = Convert.ToString(cmd.Parameters["P_DEPENDENCIA"].Value);
                objDatosAcreditacion.Carrera = Convert.ToString(cmd.Parameters["P_CARRERA"].Value);
                objDatosAcreditacion.Organismo = Convert.ToString(cmd.Parameters["P_ORGANISMO"].Value);
                objDatosAcreditacion.FechaInicial = Convert.ToString(cmd.Parameters["P_FECHA_INICIAL"].Value);
                objDatosAcreditacion.FechaFinal = Convert.ToString(cmd.Parameters["P_FECHA_FINAL"].Value);
                objDatosAcreditacion.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objDatosAcreditacion.Observaciones = Convert.ToString(cmd.Parameters["P_OBSERVACIONES"].Value);
                list.Add(objDatosAcreditacion);

            }
            catch (Exception ex)
            {
                Verificador = ex.Message;
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }
            return list;
            //return registroAgregado;
        }

    }
}
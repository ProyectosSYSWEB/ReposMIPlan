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
    }
}
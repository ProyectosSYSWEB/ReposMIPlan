using MIPlan.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Data.PlanTrabajo
{
    public class DataContext
    {
        public static List<Actividades> ObtenerDatosActividades(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<Actividades> list = new List<Actividades>();
            Actividades objActividaes = new Actividades();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_ID_PROGRAMA", "P_DESCRIPCION", "P_FECHA_INICIO", "P_FECHA_FIN", "P_IMPACTO", "P_PRIORITARIA", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_ACTIVIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                string IdPrograma = Convert.ToString(cmd.Parameters["P_ID_PROGRAMA"].Value);
                objActividaes.Id_Programa = Convert.ToInt32(IdPrograma);
                //objActividaes.Id_Programa = Convert.ToInt32(Convert.ToString(cmd.Parameters["P_ID_PROGRAMA"].Value));
                objActividaes.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objActividaes.Fecha_Inicio = Convert.ToString(cmd.Parameters["P_FECHA_INICIO"].Value);
                objActividaes.Fecha_Fin = Convert.ToString(cmd.Parameters["P_FECHA_FIN"].Value);
                objActividaes.Impacto = Convert.ToString(cmd.Parameters["P_IMPACTO"].Value);
                objActividaes.Prioritaria = Convert.ToString(cmd.Parameters["P_PRIORITARIA"].Value);
                objActividaes.Id = 1;
                list.Add(objActividaes);

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
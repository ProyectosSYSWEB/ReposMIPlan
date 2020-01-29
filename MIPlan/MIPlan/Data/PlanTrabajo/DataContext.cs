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
                string[] ParametrosOut = { "P_ID_PROGRAMA", "P_DESCRIPCION", "P_FECHA_INICIO", "P_FECHA_FIN", "P_IMPACTO", "P_PRIORITARIA", "P_STATUS", "P_CLAVE", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_ACTIVIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                string IdPrograma = Convert.ToString(cmd.Parameters["P_ID_PROGRAMA"].Value);
                objActividaes.Id_Programa = Convert.ToInt32(IdPrograma);
                //objActividaes.Id_Programa = Convert.ToInt32(Convert.ToString(cmd.Parameters["P_ID_PROGRAMA"].Value));
                objActividaes.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objActividaes.Fecha_Inicio = Convert.ToString(cmd.Parameters["P_FECHA_INICIO"].Value);
                objActividaes.Fecha_Fin = Convert.ToString(cmd.Parameters["P_FECHA_FIN"].Value);
                objActividaes.Impacto = Convert.ToString(cmd.Parameters["P_IMPACTO"].Value);
                objActividaes.Prioritaria = Convert.ToString(cmd.Parameters["P_PRIORITARIA"].Value);
                objActividaes.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objActividaes.Id = Id;
                objActividaes.Clave = Convert.ToString(cmd.Parameters["P_CLAVE"].Value);
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

        public static List<UnidadesResponsables> ObtenerDatosUnidadesResp(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<UnidadesResponsables> list = new List<UnidadesResponsables>();
            UnidadesResponsables objUnidadesResp = new UnidadesResponsables();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_UNIDAD" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_COORDINADOR", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_UNIDADES_RESPONSABLES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);

                objUnidadesResp.Id = Id;
                objUnidadesResp.Dependecia = Convert.ToString(cmd.Parameters["P_DEPENDENCIA"].Value);
                objUnidadesResp.Clave = Convert.ToString(cmd.Parameters["P_CLAVE"].Value);
                objUnidadesResp.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objUnidadesResp.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);                
                objUnidadesResp.Coordinador = Convert.ToString(cmd.Parameters["P_COORDINADOR"].Value);                                                                
                list.Add(objUnidadesResp);
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
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
                string[] ParametrosOut = { "P_ID_PROGRAMA", "P_DESCRIPCION", "P_DETALLES", "P_FECHA_INICIO", "P_FECHA_FIN", "P_IMPACTO", "P_PRIORITARIA", "P_STATUS", "P_CLAVE", "P_ID_PADRE","P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_ACTIVIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                string IdPrograma = Convert.ToString(cmd.Parameters["P_ID_PROGRAMA"].Value);
                string Id_Padre = Convert.ToString(cmd.Parameters["P_ID_PADRE"].Value);
                objActividaes.Id_Programa = Convert.ToInt32(IdPrograma);
                //objActividaes.Id_Programa = Convert.ToInt32(Convert.ToString(cmd.Parameters["P_ID_PROGRAMA"].Value));
                objActividaes.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objActividaes.Detalles = Convert.ToString(cmd.Parameters["P_DETALLES"].Value);
                objActividaes.Fecha_Inicio = Convert.ToString(cmd.Parameters["P_FECHA_INICIO"].Value);
                objActividaes.Fecha_Fin = Convert.ToString(cmd.Parameters["P_FECHA_FIN"].Value);
                objActividaes.Impacto = Convert.ToString(cmd.Parameters["P_IMPACTO"].Value);
                objActividaes.Prioritaria = Convert.ToString(cmd.Parameters["P_PRIORITARIA"].Value);
                objActividaes.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objActividaes.Id = Id;
                objActividaes.Clave = Convert.ToString(cmd.Parameters["P_CLAVE"].Value);
                objActividaes.Id_Padre = Convert.ToInt32(Id_Padre);
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

        public static List<ResponsableModel> ObtenerDatosUnidadesResp(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<ResponsableModel> list = new List<ResponsableModel>();
            ResponsableModel objUnidadesResp = new ResponsableModel();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_ID_ACTIVIDAD", "P_ID_UNIDAD", "P_CONTACTO", "P_TELEFONO", "P_CORREO", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_PLAN_RESPONSABLES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                string TempActv = Convert.ToString(cmd.Parameters["P_ID_ACTIVIDAD"].Value);
                string TempU = Convert.ToString(cmd.Parameters["P_ID_UNIDAD"].Value);
                objUnidadesResp.Id = Id;
                objUnidadesResp.Id_Actividades = Convert.ToInt32(TempActv);
                objUnidadesResp.Id_Unidad = Convert.ToInt32(TempU);
                objUnidadesResp.Contacto = Convert.ToString(cmd.Parameters["P_CONTACTO"].Value);
                objUnidadesResp.Telefono = Convert.ToString(cmd.Parameters["P_TELEFONO"].Value);                
                objUnidadesResp.Correo = Convert.ToString(cmd.Parameters["P_CORREO"].Value);                                                                
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
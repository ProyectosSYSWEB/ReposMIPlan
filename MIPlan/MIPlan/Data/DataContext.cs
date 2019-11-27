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
        public static List<AreasAtencion> ObtenerDatosAreasAtencion(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<AreasAtencion> list = new List<AreasAtencion>();
            AreasAtencion objDatosAreasAtencion = new AreasAtencion();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_ACREDITADOR" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_CATEGORIA", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_AREAS_ATENCION", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objDatosAreasAtencion.Dependencia = Convert.ToString(cmd.Parameters["P_DEPENDENCIA"].Value);
                objDatosAreasAtencion.Clave = Convert.ToString(cmd.Parameters["P_CLAVE"].Value);
                objDatosAreasAtencion.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objDatosAreasAtencion.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objDatosAreasAtencion.Categoria = Convert.ToString(cmd.Parameters["P_CATEGORIA"].Value);
                list.Add(objDatosAreasAtencion);

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
        public static List<UnidadesResponsables> ObtenerDatosUnidades(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<UnidadesResponsables> list = new List<UnidadesResponsables>();
            UnidadesResponsables objDatosUnidadades = new UnidadesResponsables();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_ACREDITADOR" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_COORDINADOR", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_UNIDADES_RESPONSABLES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objDatosUnidadades.Dependecia = Convert.ToString(cmd.Parameters["P_DEPENDENCIA"].Value);
                objDatosUnidadades.Clave = Convert.ToString(cmd.Parameters["P_CLAVE"].Value);
                objDatosUnidadades.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objDatosUnidadades.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objDatosUnidadades.Coordinador = Convert.ToString(cmd.Parameters["P_COORDINADOR"].Value);
                list.Add(objDatosUnidadades);

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

        public static List<Unidades> ObtenerUnidades(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<Unidades> list = new List<Unidades>();
            Unidades objUnidadades = new Unidades();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_DEPENDENCIA", "P_CLAVE", "P_DESCRIPCION", "P_STATUS", "P_COORDINADOR", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_UNIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objUnidadades.Dependencia = Convert.ToString(cmd.Parameters["P_DEPENDENCIA"].Value);
                objUnidadades.Clave = Convert.ToString(cmd.Parameters["P_CLAVE"].Value);
                objUnidadades.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objUnidadades.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objUnidadades.Coordinador = Convert.ToString(cmd.Parameters["P_COORDINADOR"].Value);
                objUnidadades.Id = Id;
                list.Add(objUnidadades);

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
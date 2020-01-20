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
                objDatosAreasAtencion.Id = Id;
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
                objDatosUnidadades.Id = Id;
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
        public static List<Periodos> ObtenerDatosPeriodos(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<Periodos> list = new List<Periodos>();
            Periodos objPeriodos = new Periodos();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_DEPENDENCIA", "P_DESCRIPCION","P_PERIODO", "P_STATUS", "P_EJERCICIO", "P_INICIO", "P_FIN", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_PERIODOS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objPeriodos.Id = Id;
                objPeriodos.Dependencia = Convert.ToString(cmd.Parameters["P_DEPENDENCIA"].Value);                
                objPeriodos.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objPeriodos.Periodo = Convert.ToString(cmd.Parameters["P_PERIODO"].Value);
                objPeriodos.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objPeriodos.Ejercicio = Convert.ToString(cmd.Parameters["P_EJERCICIO"].Value);
                objPeriodos.Inicio = Convert.ToString(cmd.Parameters["P_INICIO"].Value);
                objPeriodos.Fin = Convert.ToString(cmd.Parameters["P_FIN"].Value);
                list.Add(objPeriodos);

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
        
        public static List<Comun> VerificaUsuario(Comun objDatosSesion, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();            
            List<Comun> list = new List<Comun>();

            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_USUARIO", "P_PASSWORD"};
                object[] Valores = { objDatosSesion.Usuario, objDatosSesion.Contrasena};
                string[] ParametrosOut = {"P_VALIDADO", "P_NOMBRE", "P_CORREO", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand_Exe("VERIFICA_USUARIO", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                if (Verificador == "0")
                {                   
                    //objDatosSesion.Usuario = Convert.ToString(cmd.Parameters["P_NOMBRE"].Value);
                    objDatosSesion.Correo = Convert.ToString(cmd.Parameters["P_CORREO"].Value);
                    list.Add(objDatosSesion);
                }
                
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
        }
        public static List<Basicos> ObtenerDatosBasico(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<Basicos> list = new List<Basicos>();
            Basicos objBasico = new Basicos();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID_BASICOS" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_TIPO", "P_CLAVE", "P_STATUS", "P_DESCRIPCION", "P_ORDEN", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_BASICOS", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objBasico.Tipo = Convert.ToString(cmd.Parameters["P_TIPO"].Value);
                objBasico.Clave = Convert.ToString(cmd.Parameters["P_CLAVE"].Value);
                objBasico.Status = Convert.ToString(cmd.Parameters["P_STATUS"].Value);
                objBasico.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objBasico.Orden = Convert.ToString(cmd.Parameters["P_ORDEN"].Value);
                list.Add(objBasico);

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
        public static List<Indicadores> ObtenerDatosIndicador(int Id, ref string Verificador)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();
            List<Indicadores> list = new List<Indicadores>();
            Indicadores objIndicador = new Indicadores();
            try
            {

                OracleDataReader dr = null;
                string[] Parametros = { "P_ID" };
                object[] Valores = { Id };
                string[] ParametrosOut = { "P_CATEGORIA", "P_SUBTIPO", "P_ETIQUETA_1", "P_ETIQUETA_2", "P_DESCRIPCION", "P_BANDERA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_INDICADORES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objIndicador.Categoria = Convert.ToString(cmd.Parameters["P_CATEGORIA"].Value);
                objIndicador.Subtipo = Convert.ToString(cmd.Parameters["P_SUBTIPO"].Value);
                objIndicador.Etiqueta_1 = Convert.ToString(cmd.Parameters["P_ETIQUETA_1"].Value);
                objIndicador.Etiqueta_2 = Convert.ToString(cmd.Parameters["P_ETIQUETA_2"].Value);
                objIndicador.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                list.Add(objIndicador);

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
                string[] ParametrosOut = { "P_ID_PROGRAMA", "P_DESCRIPCION", "P_FECHA_INICIO", "P_FECHA_FIN", "P_IMPACTO", "P_PRIORITARIA" };
                cmd = exeProc.GenerarOracleCommand("OBT_PLA_ACTIVIDADES", ref Verificador, ref dr, Parametros, Valores, ParametrosOut);
                objActividaes.Id_Programa = Convert.ToInt32(cmd.Parameters["P_ID_PROGRAMA"].Value);
                objActividaes.Descripcion = Convert.ToString(cmd.Parameters["P_DESCRIPCION"].Value);
                objActividaes.Fecha_Inicio = Convert.ToString(cmd.Parameters["P_FECHA_INICIO"].Value);
                objActividaes.Fecha_Fin = Convert.ToString(cmd.Parameters["P_FECHA_FIN"].Value);
                objActividaes.Impacto = Convert.ToString(cmd.Parameters["P_IMPACTO"].Value);
                objActividaes.Prioritaria = Convert.ToString(cmd.Parameters["P_PRIORITARIA"].Value);
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
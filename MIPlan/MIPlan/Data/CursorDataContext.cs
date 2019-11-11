using MIPlan.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Data
{
    public class CursorDataContext
    {
        public static List<Comun> ObtenerAcreditadores(string TipoPersona)
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Combo_Acreditadores", ref dr);
                List<Comun> listarComun = new List<Comun>();
                while (dr.Read())
                {
                    Comun objComun = new Comun();
                    objComun.Id = Convert.ToString(dr[0]);
                    objComun.Descripcion = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
                }
                return listarComun;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }
        public static List<Comun> ObtenerBasicos()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Basicos", ref dr);
                List<Comun> listarComun = new List<Comun>();
                while (dr.Read())
                {
                    Comun objComun = new Comun();
                    objComun.Id = Convert.ToString(dr[0]);
                    objComun.Descripcion = Convert.ToString(dr[1]);
                    listarComun.Add(objComun);
                }
                return listarComun;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                exeProc.LimpiarOracleCommand(ref cmd);
            }

        }

        public static List<Comun> ObtenerDependencias(string Usuario)
        {
            string[] Parametros = { "p_tipo" };
            object[] Valores = { Usuario };
            var Lista = ExeProcedimiento.GenerarOracleCommandCursor_Combo("PKG_PLANEACION.Obt_Combo_Dependencia", Parametros, Valores);
            return Lista;
        }


    }
}
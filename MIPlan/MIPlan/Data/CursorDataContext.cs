﻿using MIPlan.Models;
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
        public static List<Basicos> ObtenerBasicos()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Basicos", ref dr);
                List<Basicos> listarBasicos = new List<Basicos>();
                while (dr.Read())
                {
                    Basicos objBasicos = new Basicos();
                    objBasicos.Id = Convert.ToInt32(dr[0]);
                    objBasicos.Tipo = Convert.ToString(dr[1]);
                    objBasicos.Clave = Convert.ToString(dr[2]);
                    objBasicos.Status = Convert.ToString(dr[3]);
                    objBasicos.Descripcion = Convert.ToString(dr[4]);
                    objBasicos.Valor = Convert.ToString(dr[5]);
                    objBasicos.Orden = Convert.ToString(dr[6]);

                    listarBasicos.Add(objBasicos);
                }
                return listarBasicos;

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


        public static List<Acreditaciones> ObtenerAcreditaciones()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Acreditaciones", ref dr);
                List<Acreditaciones> listarAcreditaciones = new List<Acreditaciones>();
                while (dr.Read())
                {
                    Acreditaciones objAcreditaciones = new Acreditaciones();
                    objAcreditaciones.Id = Convert.ToInt32(dr[0]);
                    objAcreditaciones.Dependencia = Convert.ToString(dr[1]);
                    objAcreditaciones.Carrera = Convert.ToString(dr[2]);
                    objAcreditaciones.Organismo = Convert.ToString(dr[3]);
                    objAcreditaciones.FechaInicial = Convert.ToString(dr[4]);
                    objAcreditaciones.FechaFinal = Convert.ToString(dr[5]);
                    objAcreditaciones.Status = Convert.ToString(dr[6]);
                    objAcreditaciones.Observaciones = Convert.ToString(dr[6]);

                    listarAcreditaciones.Add(objAcreditaciones);
                }
                return listarAcreditaciones;

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


        public static List<AreasAtencion> ObtenerAreasAtencion()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_AreasAtencion", ref dr);
                List<AreasAtencion> listarAreasAtencion = new List<AreasAtencion>();
                while (dr.Read())
                {
                    AreasAtencion objAreasAtencion = new AreasAtencion();
                    objAreasAtencion.Id = Convert.ToInt32(dr[0]);
                    objAreasAtencion.Dependencia = Convert.ToString(dr[1]);
                    objAreasAtencion.Clave = Convert.ToString(dr[2]);
                    objAreasAtencion.Descripcion = Convert.ToString(dr[3]);
                    objAreasAtencion.Status = Convert.ToString(dr[4]);

                    listarAreasAtencion.Add(objAreasAtencion);
                }
                return listarAreasAtencion;

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
        public static List<AreasAtencion> ObtenerUnidades()
        {
            OracleCommand cmd = null;
            ExeProcedimiento exeProc = new ExeProcedimiento();

            try
            {
                OracleDataReader dr = null;
                cmd = exeProc.GenerarOracleCommandCursor("PKG_PLANEACION.Obt_Grid_Unidades", ref dr);
                List<AreasAtencion> listarAreasAtencion = new List<AreasAtencion>();
                while (dr.Read())
                {
                    AreasAtencion objAreasAtencion = new AreasAtencion();
                    objAreasAtencion.Id = Convert.ToInt32(dr[0]);
                    objAreasAtencion.Dependencia = Convert.ToString(dr[1]);
                    objAreasAtencion.Clave = Convert.ToString(dr[2]);
                    objAreasAtencion.Descripcion = Convert.ToString(dr[3]);
                    objAreasAtencion.Status = Convert.ToString(dr[4]);

                    listarAreasAtencion.Add(objAreasAtencion);
                }
                return listarAreasAtencion;

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

    }
}
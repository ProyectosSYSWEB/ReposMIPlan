using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Actividades
    {
        public int Id { get; set; }
        public int Id_Meta { get; set; }
        public string Clave { get; set; }
        public string Descripcion { get; set; }
        public string Status { get; set; }
        public string Impacto { get; set; }
        public string Fecha_Inicio { get; set; }
        public string Fecha_Fin { get; set; }
        public string Fecha_Termino { get; set; }
        public string Resultados { get; set; }
        public string Observaciones { get; set; }
        public string Alta_Fecha { get; set; }
        public string Alta_Usario { get; set; }
        public string Modificacion_Fecha { get; set; }
        public string Modificacion_Usuario { get; set; }
        public int Id_Programa { get; set; }
        public string Desc_Programa { get; set; }
        public string Desc_Accion { get; set; }
        public string Prioritaria { get; set; }
        public int Id_Padre { get; set; }
    }

    public class ResultadoActividades
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Actividades> Resultado { get; set; }

    }
}
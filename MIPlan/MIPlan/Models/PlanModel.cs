using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class PlanModel
    {
        public int Id_Coordinacion { get; set; }
        public string Status { get; set; }
        public string Ejercicio { get; set; }
        public string Dependencia { get; set; }
        public string Descripcion { get; set; }
        public string Fecha { get; set; }
        public string Usuario { get; set; }

    }

    public class ResultadoPlanModel
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Acreditaciones> Resultado { get; set; }

    }
}
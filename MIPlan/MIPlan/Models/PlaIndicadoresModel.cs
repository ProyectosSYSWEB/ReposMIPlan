using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class PlaIndicadoresModel
    {
        public int Id { get; set; }
        public string Descripcion1 { get; set; }
        public string Descripcion2 { get; set; }        
        public string Etiqueta1 { get; set; }
        public string Etiqueta2 { get; set; }
        public string ValorProgramado1 { get; set; }
        public string ValorProgramado2 { get; set; }
        public string ValorAlcanzado1 { get; set; }
        public string ValorAlcanzado2 { get; set; }




        public string IdActividad { get; set; }
        public string IdIndicadr { get; set; }
        public string FechaAlcanzado { get; set; }
        public string Usuario { get; set; }
        public string Ejercicio { get; set; }
        public string PeriodoLectivo { get; set; }
    }

    public class ResultadoPlaIndicadores
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<PlaIndicadoresModel> Resultado { get; set; }
    }
}
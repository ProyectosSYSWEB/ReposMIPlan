using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class AreasAtencion
    {
        public int Id { get; set; }
        public string Dependencia { get; set; }
        public string Clave { get; set; }
        public string Descripcion { get; set; }
        public string Status { get; set; }
        public string Categoria { get; set; }
    }

    public class ResultadoAreasAtencion
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<AreasAtencion> Resultado { get; set; }

    }
}
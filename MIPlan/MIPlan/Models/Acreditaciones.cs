using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Acreditaciones
    {
        public int Id { get; set; }
        public string Dependencia { get; set; }
        public string Carrera { get; set; }
        public string Organismo { get; set; }
        public string FechaInicial { get; set; }
        public string FechaFinal { get; set; }
        public string Status { get; set; }
        public string Observaciones { get; set; }

    }
}
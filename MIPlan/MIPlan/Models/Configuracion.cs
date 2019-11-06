using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Configuracion
    {
        public string Dependencia { get; set; }
        public string Clave_911 { get; set; }
        public string Clave_DES { get; set; }
        public int Id_Municipio { get; set; }
        public string Region { get; set; }
        public string Antecedentes { get; set; }
    }
}
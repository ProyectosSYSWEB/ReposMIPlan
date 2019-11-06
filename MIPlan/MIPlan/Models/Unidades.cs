using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Unidades
    {
        public int Id { get; set; }
        public string Dependencia { get; set; }
        public string Clave { get; set; }
        public string Descripcion { get; set; }
        public string Status { get; set; }
        public string Coordinador { get; set; }
    }
}
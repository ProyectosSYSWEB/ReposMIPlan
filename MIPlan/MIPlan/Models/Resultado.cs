using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Resultado
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Comun> LstComun {get; set;}
        public List<Acreditaciones> LstAcreditaciones { get; set; }

    }
}
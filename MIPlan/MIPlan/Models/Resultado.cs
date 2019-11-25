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
        public List<Basicos> LstBasicos { get; set; }
        public List<Acreditaciones> ListAcreditaciones { get; set; }
        public List<AreasAtencion> ListAreasAtencion { get; set; }
        public List<Unidades> ListUnidades { get; set; }
    }
}
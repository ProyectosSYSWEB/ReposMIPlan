using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class ResponsableModel
    {
        public int Id { get; set; }
        public int Id_Actividades { get; set; }
        public int Id_Unidad { get; set; }
        public string Descripcion { get; set; }
        public string Contacto { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }


    }
    public class ResultadoResponsable
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<ResponsableModel> Resultado { get; set; }

    }
}
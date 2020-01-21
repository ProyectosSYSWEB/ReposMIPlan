using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Sesion
    {
        public string Usuario { get; set; }
        public string Nombre { get; set; }
        public string Contrasena { get; set; }
        public string Correo { get; set; }
        public int Ejercicio { get; set; }

    }

    public class ResultadoSesion
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Sesion> Resultado { get; set; }

    }

}
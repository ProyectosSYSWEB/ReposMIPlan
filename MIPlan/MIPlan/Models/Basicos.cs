﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIPlan.Models
{
    public class Basicos
    {

        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Clave { get; set; }
        public string ClavePadre { get; set; }
        public string Status { get; set; }
        public string Descripcion { get; set; }
        public string DescripcionPadre { get; set; }
        public string Valor { get; set; }
        public string Orden { get; set; }

    }

    public class ResultadoBasicos
    {
        public bool Error { get; set; }
        public string MensajeError { get; set; }
        public List<Basicos> Resultado { get; set; }

    }
}
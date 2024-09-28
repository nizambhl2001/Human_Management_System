using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiCore.Models.HR.Employee
{
    public class ImageAndSignatureModel
    {
        public byte[] Picture { get; set; }
        public byte[] Signature { get; set; }
    }
}

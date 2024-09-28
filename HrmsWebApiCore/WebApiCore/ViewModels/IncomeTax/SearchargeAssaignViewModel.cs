using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.IncomeTax;

namespace WebApiCore.ViewModels.IncomeTax
{
    public class SearchargeAssaignViewModel: SearchargeAssainModel
    {
        public string SlabName { get; set; }
        public string SlabAmount { get; set; }
        public decimal Persentage { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models.HR.Employee;

namespace WebApiCore.ViewModels.HR.Employee
{
    public class EmpTrainingInfoVM :EmpTrainingModel
    {
        public string TrainingTypeName { get; set; }
        public string TrainingNatureName { get; set; }
        public string TrainingSponsorType { get; set; }
        public string TrainingInstitutionName { get; set; }
        public string TrainingCountryName { get; set; }
        public string trainingDescription { get; set; }



    }
}

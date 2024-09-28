namespace WebApiCore.Models.HR.Employee
{
    public class EmpTrainingModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public int? TrainingType { get; set; }
        public string TrainingName { get; set; }
        public int? TrainingNature { get; set; }
        public string Description { get; set; }
        public int? Institution { get; set; }
        public string TrainingPlace { get; set; }
        public int? Country { get; set; }
        public string Achievement { get; set; }
        public int? SponsorType { get; set; }
        public decimal? TrainingFees { get; set; }
        public decimal? OtherCost { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? CompanyID { get; set; }
    }
}
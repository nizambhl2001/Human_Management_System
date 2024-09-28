namespace WebApiCore.Models.HR.Employee
{
    public class EmpPublicationModel
    {
        public int ID { get; set; }
        public string EmpCode { get; set; }
        public string PublicationTitle { get; set; }
        public string WherePublished { get; set; }
        public int SingleMultiple { get; set; }
        public int LocalOrIntl { get; set; }
        public decimal Contribution { get; set; }
        public string Remarks { get; set; }
        public string PublicationDate { get; set; }
        public int CompanyID { get; set; }
        public int PublicationType { get; set; }
        public string URL { get; set; }
        public byte[] Photo { get; set; }
        public int Numberofauthor { get; set; }
        public int DesignationId { get; set; }
        public string Description { get; set; }
    }
}


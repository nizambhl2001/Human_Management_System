using System;

namespace WebApiCore.Helper
{
  public static class DateManipulate
  {
    public static string DateDiff(DateTime fromDate, DateTime toDate)
    {
      int Years = new DateTime(DateTime.Now.Subtract(fromDate).Ticks).Year - 1;
      DateTime PastYearDate = fromDate.AddYears(Years);
      int Months = 0;
      for (int i = 1; i <= 12; i++)
      {
        if (PastYearDate.AddMonths(i) == toDate)
        {
          Months = i;
          break;
        }
        else if (PastYearDate.AddMonths(i) >= toDate)
        {
          Months = i - 1;
          break;
        }
      }
      int Days = toDate.Subtract(PastYearDate.AddMonths(Months)).Days;
      int Hours = toDate.Subtract(PastYearDate).Hours;
      int Minutes = toDate.Subtract(PastYearDate).Minutes;
      int Seconds = toDate.Subtract(PastYearDate).Seconds;
      return String.Format(" {0} Years {1} Month {2} Days",
      Years, Months, Days);
    }
  }
}

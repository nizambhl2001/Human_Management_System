using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using Syncfusion.XlsIO;
using System.Dynamic;
using WebApiCore.Models.SalaryProcess;
using Microsoft.Office.Interop.Excel;

namespace WebApiCore.Helper
{
    public class FileOperation
    {
        private ExcelEngine _xlEngine;
        private IApplication _application;
        public FileOperation()
        {
            _xlEngine = new ExcelEngine();
            _application = _xlEngine.Excel;
        }

        public List<object> UploadExcelFile(List<IFormFile> files, string rootPath, int startRow, int startCol)
        {
            List<string> uploadedPathList = new List<string>();
            try
            {
                foreach (var file in files)
                {
                    string extension = Path.GetExtension(file.FileName);
                    if (extension == ".xls" || extension == ".xlsx")
                    {
                        string fileName = DateTime.Now.ToString("yyMMddhhmmssfff") + "_" + file.FileName.Replace(" ", "_");
                        string path = rootPath + @"\ImportedFiles\ExcelFile\" + fileName;

                        using (var stream = new FileStream(path, FileMode.CreateNew, FileAccess.ReadWrite))
                        {
                            file.CopyTo(stream);
                            uploadedPathList.Add(path);
                        }
                    }
                    else
                    {
                        throw new Exception("Unsupported file format!");
                    }
                }
                List<Syncfusion.XlsIO.IRange> xlRanges = GetXlDataRange(uploadedPathList);
                List<object> xlRows = GetExcelRows(xlRanges, startRow, startCol);
                foreach (string path in uploadedPathList)
                {
                    File.Delete(path);
                }
                return xlRows;
            }
            catch (Exception err)
            {
                foreach (var path in uploadedPathList)
                {
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                    }
                }
                throw new Exception(err.Message);
            }
        }

        public string CreateExcelFile(List<ConformationIncrementModel> data)
        {
            Microsoft.Office.Interop.Excel.Application Excel;
            Microsoft.Office.Interop.Excel.Workbook excelworkBook;
            Microsoft.Office.Interop.Excel.Worksheet excelSheet;
            string createdPath = "";
            try
            {

                Excel = new Application
                {
                    Visible = false,
                    DisplayAlerts = false
                };
                excelworkBook = Excel.Workbooks.Add(Type.Missing);
                excelSheet = (Microsoft.Office.Interop.Excel.Worksheet)excelworkBook.ActiveSheet;
                excelSheet.Name = "SalaryIncrementData";
                excelSheet.Cells[1, 1] = "Employee Increment Information";
                excelSheet.Cells[3, 1] = "Code";
                excelSheet.Cells[3, 2] = "Name";
                excelSheet.Cells[3, 3] = "CurrentPayScale";
                excelSheet.Cells[3, 4] = "Incr_PayScale";
                excelSheet.Cells[3, 5] = "Prov_Fund";

                int rowNum = 4;
                foreach (var model in data)
                {
                    excelSheet.Cells[rowNum,1] = model.EmpCode;
                    excelSheet.Cells[rowNum,2] = model.EmpName;
                    excelSheet.Cells[rowNum,3] = model.PrePayScaleName;
                    excelSheet.Cells[rowNum,4] = model.IncrementPayScaleName;
                    excelSheet.Cells[rowNum,5] = model.ProvidentFund;
                    rowNum++;
                }
                //excelCellrange = excelSheet.Range[excelSheet.Cells[1, 1], excelSheet.Cells[data.Count, 5]];
                //excelCellrange.EntireColumn.AutoFit();
                createdPath = @"ExportedFile\" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xls";
                //using (Stream stream = new FileStream(createdPath, FileMode.Create, FileAccess.ReadWrite))
                //{
                //    excelworkBook.Save();
                //}
                excelworkBook.SaveAs(@"E:\Ashiq\HRMS\HrmsWebApiCore\WebApiCore\" + createdPath);
                excelworkBook.Close();
                Excel.Quit();

                return createdPath;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private List<Syncfusion.XlsIO.IRange> GetXlDataRange(List<string> uploadedPathList)
        {
            List<Syncfusion.XlsIO.IRange> dataRangeList = new List<Syncfusion.XlsIO.IRange>();
            foreach (var path in uploadedPathList)
            {
                FileStream stream = new FileStream(path, FileMode.Open);
                IWorkbook workBook = _application.Workbooks.Open(stream);
                IWorksheet worksheet = workBook.Worksheets[0];
                var range = worksheet.UsedRange;
                dataRangeList.Add(range);
                stream.Close();
            }
            return dataRangeList;
        }

        private List<object> GetExcelRows(List<Syncfusion.XlsIO.IRange> excelDataRangeList, int startRow, int startCol)
        {
            List<object> xlRows = new List<object>();
            foreach (var dataRange in excelDataRangeList)
            {
                int headerRow = startRow;
                for (int dataRow = startRow + 1; dataRow <= dataRange.LastRow; dataRow++)
                {
                    IDictionary<string, object> myObj = new ExpandoObject();
                    for (int col = startCol; col <= dataRange.LastColumn; col++)
                    {
                        myObj.Add(dataRange[headerRow, col].Value, dataRange[dataRow, col].Value);
                    }
                    xlRows.Add(myObj);
                }
                dataRange.Worksheet.Workbook.Close(true);
            }
            return xlRows;
        }

    }

}

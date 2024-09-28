using System.IO;

namespace WebApiCore.Models
{
    public class StreamFile
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public MemoryStream Stream { get; set; }

        public StreamFile(string filePath)
        {
            var bytes = File.ReadAllBytes(filePath);
            Stream = new MemoryStream(bytes);
            FilePath = filePath;
            FileName = Path.GetFileName(filePath);
        }

    }
}
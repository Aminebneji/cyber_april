using System.ComponentModel.DataAnnotations;
#pragma warning disable
namespace AstronCyberCoffeeBack.Models
{
    public class PC
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Serial { get; set; }
        public string pcImage { get; set; }
        public componentClass Cpu { get; set; }
        public int RamCapacity { get; set; }
        public componentClass Gpu { get; set; }
        public ScreenResolution Screen { get; set; }
        public int ScreenAmount { get; set; }
        public decimal Price { get; set; }
    }

    public enum componentClass
    {
        low,
        mid,
        high,
        ultra
    }
    public enum ScreenResolution
    {
        HD720p60,
        FHD1080p60,
        FHD1080p144,
        QHD1440p60,
        QHD1440p144,
        UHD4K60,
        UHD4k144
    }
}

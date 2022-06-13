using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AstronCyberCoffeeBack.Models
{
    #pragma warning disable
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        public int? IdUser{ get; set; }
        public int? IdPC { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }

        [ForeignKey("IdUser")]
        public virtual User? User { get; set; }
        [ForeignKey("IdPC")]
        public virtual PC? PC { get; set; }

        public Reservation()
        {
        }




    }
}

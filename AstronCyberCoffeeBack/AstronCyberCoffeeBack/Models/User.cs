using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
#pragma warning disable
namespace AstronCyberCoffeeBack.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        [JsonIgnore]
        public string HashPass { get; set; }
        [JsonIgnore]
        public string SaltPass { get; set; }
        public UserRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public User()
        {
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
    public enum UserRole
    {
        Admin,
        Manager,
        Employee,
        User
    }
}

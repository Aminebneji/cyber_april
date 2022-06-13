using AstronCyberCoffeeBack.Data;
using AstronCyberCoffeeBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using AstronCyberCoffeeBack.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
#pragma warning disable
namespace AstronCyberCoffeeBack.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("allConnections")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;


        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Method use to login a user , will return a JWT Token
        /// </summary>
        /// <param name="credential">Email and Password</param>
        /// <returns></returns>
        [HttpPost("authenticate")] // On se sert d'un string pour modifier la route par défaut en une route personnalisée 
        public async Task<IActionResult> Authenticate([FromBody] Credential credential)
        {
            if (credential.Password != null && credential.Email != null)
            {
                var temp = await _context.Users.FirstOrDefaultAsync(x => x.Email == credential.Email);
                if (temp == null)
                {
                    return NotFound();
                }
                else
                {
                    if (PasswordHasher.VerifyPasswordWithSalt(temp.HashPass, temp.SaltPass, credential.Password))
                    {
                        List<Claim> claims = new List<Claim>()
                        {
                            new Claim(ClaimTypes.Email, temp.Email),
                            new Claim("UserId",temp.Id.ToString()),
                        };
                        switch (temp.Role)
                        {
                            case UserRole.Admin:
                                {
                                    claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                                    break;
                                }
                            case UserRole.Manager:
                                {
                                    claims.Add(new Claim(ClaimTypes.Role, "Manager"));
                                    break;
                                }
                            case UserRole.Employee:
                                {
                                    claims.Add(new Claim(ClaimTypes.Role, "Employee"));
                                    break;
                                }
                            case UserRole.User:
                                {
                                    claims.Add(new Claim(ClaimTypes.Role, "User"));
                                    break;
                                }
                        }
                        var expiresAt = DateTime.UtcNow.AddYears(1);
                        return Ok(new
                        {
                            token = CreateToken(claims, expiresAt),
                            expiresAt = expiresAt,
                        });
                    }
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Register and create a new user with base role of client
        /// </summary>
        /// <param name="register">Model containing necessary information</param>
        /// <returns></returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterData register)
        {
            if (register != null)
            {

                var userFromDB = await _context.Users.FirstOrDefaultAsync(x => x.Email == register.Email);
                if (userFromDB == null)
                {
                    var user = new User();
                    byte[] saltTemp = PasswordHasher.GenerateSalt();
                    user.SaltPass = Convert.ToBase64String(saltTemp);
                    user.HashPass = Convert.ToBase64String(PasswordHasher.HashPasswordWithSalt(Encoding.UTF8.GetBytes(register.Password), saltTemp));
                    user.Email = register.Email;
                    user.LastName = register.LastName;
                    user.FirstName = register.FirstName;
                    user.PhoneNumber = register.PhoneNumber;
                    user.Username = register.UserName;
                    user.Role = UserRole.User;
                    _context.Users.Add(user);
                    _context.SaveChangesAsync();
                    return Ok();
                }
            }
            return NoContent();

        }

        /// <summary>
        /// Create a JWT Token
        /// </summary>
        /// <param name="claims">Claims to include in the token</param>
        /// <param name="expiresAt">Expiration Date of the token</param>
        /// <returns></returns>
        private string CreateToken(IEnumerable<Claim> claims, DateTime expiresAt)
        {
            var secretKey = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);

            var jwt = new JwtSecurityToken(
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expiresAt,
                audience: _configuration["JWT:ValidAudience"],
                issuer: _configuration["JWT:ValidIssuer"],
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(secretKey),
                    SecurityAlgorithms.HmacSha256Signature));
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }

    public class Credential
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
    }
}

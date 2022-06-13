#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AstronCyberCoffeeBack.Data;
using AstronCyberCoffeeBack.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors;

namespace AstronCyberCoffeeBack.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("allConnections")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /*
___________________ ____ ___________   
\_   ___ \______   \    |   \______ \  
/    \  \/|       _/    |   /|    |  \ 
\     \___|    |   \    |  / |    `   \
 \______  /____|_  /______/ /_______  /
        \/       \/                 \/ 
*/

        /// <summary>
        /// Get all User
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        /// <summary>
        /// Get a specific User with its Id
        /// </summary>
        /// <param name="id">Id of the user</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            user.HashPass = null;
            user.SaltPass = null;
            return user;
        }
        /// <summary>
        /// Get a specific User by the token of the connected user
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetUserByTokenId")]
        [Authorize]
        public async Task<ActionResult<User>> GetUserByTokenId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return NotFound();
            }
            var id = identity.FindFirst("UserId")?.Value;
            var user = await _context.Users.FindAsync(Int32.Parse(id));
            if (user == null)
            {
                return NotFound();
            }
            user.HashPass = null;
            user.SaltPass = null;
            return user;
        }

        /// <summary>
        /// Modify a user , verify if the user is the same as the connected user
        /// </summary>
        /// <param name="id">Id of the user to modify</param>
        /// <param name="user">Content of the modification</param>
        /// <returns></returns>
        [HttpPut("{id}/token")]
        [Authorize]
        public async Task<IActionResult> PutUserToken(int id, User user)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return BadRequest();
            }
            var userId = identity.FindFirst("UserId")?.Value;
            if (id != user.Id || id.ToString() != userId || user.Id.ToString() != userId)
            {
                return BadRequest();
            }
            var oldUser = await _context.Users.FindAsync(Int32.Parse(userId));
            user.HashPass = oldUser.HashPass;
            user.SaltPass = oldUser.SaltPass;
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Modify a user
        /// </summary>
        /// <param name="id">Id of the user to modify</param>
        /// <param name="user">Content of the modification</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            var temp = await _context.Users.FindAsync(id);
            if (temp == null)
            {
                return NotFound();
            }
            user.CreatedAt = temp.CreatedAt;
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        /// <summary>
        /// Delete a specific user
        /// </summary>
        /// <param name="id">Id of the user to delete</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}

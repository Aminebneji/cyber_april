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
    public class ReservationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReservationsController(ApplicationDbContext context)
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
        /// Return all reservation with User and PCs included
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations.Include(x => x.User).Include(x => x.PC).ToListAsync();
        }

        /// <summary>
        /// Return a specific reservation without include
        /// </summary>
        /// <param name="id">Id of the reservation</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        /// <summary>
        /// Modify a specific reservation
        /// </summary>
        /// <param name="id">Id of the reservation to modify</param>
        /// <param name="reservation">Content of the modification</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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
        /// Create a new reservation 
        /// </summary>
        /// <param name="reservation">New reservation</param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<ActionResult<Reservation>> PostReservationAdmin(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }

        /// <summary>
        /// Create a new reservation , and verify that the user Id in it is the one connected
        /// </summary>
        /// <param name="reservation"></param>
        /// <returns></returns>
        [HttpPost("usermade")]
        [Authorize]
        public async Task<ActionResult<Reservation>> PostReservationUser(Reservation reservation)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return NotFound();
            }
            var userId = identity.FindFirst("UserId")?.Value;
            if (userId != reservation.IdUser.ToString())
            {
                return BadRequest();
            }
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }
        /// <summary>
        /// Delete a reservation
        /// </summary>
        /// <param name="id">Id of reservation to delete</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        /// <summary>
        /// Delete a reservation , only if its the users in it that delete it
        /// </summary>
        /// <param name="id">Id of the reservation to delete</param>
        /// <returns></returns>
        [HttpDelete("usermade/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReservationUser(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return NotFound();
            }
            var userId = identity.FindFirst("UserId")?.Value;
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }
            if (userId != reservation.IdUser.ToString())
            {
                return BadRequest();
            }
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /*
_________                 __                   _________                                           .___
\_   ___ \ __ __  _______/  |_  ____   _____   \_   ___ \  ____   _____   _____ _____    ____    __| _/
/    \  \/|  |  \/  ___/\   __\/  _ \ /     \  /    \  \/ /  _ \ /     \ /     \\__  \  /    \  / __ | 
\     \___|  |  /\___ \  |  | (  <_> )  Y Y  \ \     \___(  <_> )  Y Y  \  Y Y  \/ __ \|   |  \/ /_/ | 
 \______  /____//____  > |__|  \____/|__|_|  /  \______  /\____/|__|_|  /__|_|  (____  /___|  /\____ | 
        \/           \/                    \/          \/             \/      \/     \/     \/      \/ 
*/
        /// <summary>
        /// Get all reservations of a specific pc
        /// </summary>
        /// <param name="id">Id of the pc search</param>
        /// <returns></returns>
        [HttpGet("PC/{id}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationWithPC(int id)
        {
            var reservation = await _context.Reservations.Where(r => r.IdPC == id).Include(x => x.User).Include(x => x.PC).ToListAsync();

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }
        /// <summary>
        /// Get all reservations of a specific user
        /// </summary>
        /// <param name="id">Id of the user to search</param>
        /// <returns></returns>
        [HttpGet("User/{id}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationWithUser(int id)
        {
            var reservation = await _context.Reservations.Where(r => r.IdUser == id).Include(x => x.PC).Include(x => x.User).ToListAsync();

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }
        /// <summary>
        /// Get all reservation that start at a specific date
        /// </summary>
        /// <param name="date">Date to search</param>
        /// <returns></returns>
        [HttpGet("StartDate/{date}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationWithDate(DateTime date)
        {
            var reservation = await _context.Reservations.Where(r => r.DateDebut.Date == date.Date).Include(x => x.User).Include(x => x.PC).ToListAsync();

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        /// <summary>
        /// Get all reservation that end at a specific date
        /// </summary>
        /// <param name="date">Date to search</param>
        /// <returns></returns>
        [HttpGet("EndDate/{date}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationWithEndDate(DateTime date)
        {
            var reservation = await _context.Reservations.Where(r => r.DateFin == date).Include(x => x.User).Include(x => x.PC).ToListAsync();

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        /// <summary>
        /// Get all reservation between two date
        /// </summary>
        /// <param name="start">Starting date</param>
        /// <param name="end">Ending date</param>
        /// <returns></returns>
        [HttpGet("BetweenDates/{start}/{end}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationBetweenDates(DateTime start, DateTime end)
        {
            var reservation = await _context.Reservations.Where(r => r.DateDebut >= start && r.DateFin <= end).Include(x => x.User).Include(x => x.PC).ToListAsync();

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }





        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }
    }
}

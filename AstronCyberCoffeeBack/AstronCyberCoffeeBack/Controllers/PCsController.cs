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
using Microsoft.AspNetCore.Cors;

namespace AstronCyberCoffeeBack.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("allConnections")]
    [ApiController]
    public class PCsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PCsController(ApplicationDbContext context)
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
        /// Get all the PCs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCs()
        {
            return await _context.PCs.ToListAsync();
        }
        /// <summary>
        /// Get a PC by id
        /// </summary>
        /// <param name="id">Id of the PC</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<PC>> GetPC(int id)
        {
            var pC = await _context.PCs.FindAsync(id);

            if (pC == null)
            {
                return NotFound();
            }

            return pC;
        }

        /// <summary>
        /// Modify a PC
        /// </summary>
        /// <param name="id">Id of the pc to modify</param>
        /// <param name="pC">Content of the modification</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> PutPC(int id, PC pC)
        {
            if (id != pC.Id)
            {
                return BadRequest();
            }

            _context.Entry(pC).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PCExists(id))
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
        /// Create a new PC
        /// </summary>
        /// <param name="pC">Info of the PC to add</param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<PC>> PostPC(PC pC)
        {
            _context.PCs.Add(pC);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPC", new { id = pC.Id }, pC);
        }

        /// <summary>
        /// Delete a PC
        /// </summary>
        /// <param name="id">Id of the pc to delete</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePC(int id)
        {
            var pC = await _context.PCs.FindAsync(id);
            if (pC == null)
            {
                return NotFound();
            }

            _context.PCs.Remove(pC);
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
        /// Get all PC's with a specific GPU
        /// </summary>
        /// <param name="gpu">GPU to search</param>
        /// <returns></returns>
        [HttpGet("gpu/{gpu}")]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCByGPU(int gpu)
        {
            //Verify that gpu is contained in the componentClass Enum
            if (!Enum.IsDefined(typeof(componentClass), gpu))
            {
                return BadRequest();
            }
            var temp = (componentClass)Enum.Parse(typeof(componentClass), gpu.ToString());
            var pC = await _context.PCs.Where(p => p.Gpu == temp).ToListAsync();
            if (pC == null)
            {
                return NotFound();
            }
            return pC;
        }
        /// <summary>
        /// Get all PC's with a specific CPU
        /// </summary>
        /// <param name="cpu">CPU to search</param>
        /// <returns></returns>
        [HttpGet("cpu/{cpu}")]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCByCPU(int cpu)
        {
            //Verify that cpu is contained in the componentClass Enum
            if (!Enum.IsDefined(typeof(componentClass), cpu.ToString()))
            {
                return BadRequest();
            }
            var temp = (componentClass)Enum.Parse(typeof(componentClass), cpu.ToString());
            var pC = await _context.PCs.Where(p => p.Cpu == temp).ToListAsync();
            if (pC == null)
            {
                return NotFound();
            }
            return pC;
        }
        /// <summary>
        /// Get all PC's with a specific RAM
        /// </summary>
        /// <param name="ram">RAM to search</param>
        /// <returns></returns>
        [HttpGet("ram/{ram}")]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCByRAM(int ram)
        {
            var pC = await _context.PCs.Where(p => p.RamCapacity == ram).ToListAsync();
            if (pC == null)
            {
                return NotFound();
            }
            return pC;
        }
        /// <summary>
        /// Get all PC's with a specific screen Resolution
        /// </summary>
        /// <param name="screen">Screen Resolution to search</param>
        /// <returns></returns>
        [HttpGet("screen/{screen}")]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCByScreen(int screen)
        {
            //Verify that screen is contained in the screenResolution Enum
            if (!Enum.IsDefined(typeof(ScreenResolution), screen))
            {
                return BadRequest();
            }
            var temp = (ScreenResolution)Enum.Parse(typeof(ScreenResolution), screen.ToString());
            var pC = await _context.PCs.Where(p => p.Screen == temp).ToListAsync();
            if (pC == null)
            {
                return NotFound();
            }
            return pC;
        }
        /// <summary>
        /// Get all PC's with a specific amount of screen
        /// </summary>
        /// <param name="screenAmount">Amount of screen to search</param>
        /// <returns></returns>
        [HttpGet("screenNb/{screenAmount}")]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCByScreenAmount(int screenAmount)
        {
            var pC = await _context.PCs.Where(p => p.ScreenAmount == screenAmount).ToListAsync();
            if (pC == null)
            {
                return NotFound();
            }
            return pC;
        }
        /// <summary>
        /// Get all PC's with a specific amount of screen , and a specific screen resolution
        /// </summary>
        /// <param name="screenAmount">Amount of screen</param>
        /// <param name="screen">Resolution of the screen</param>
        /// <returns></returns>
        [HttpGet("screenDetails/{screenAmount}/{screen}")]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCByScreenAmountAndScreen(int screenAmount, int screen)
        {
            //Verify that screen is contained in the screenResolution Enum
            if (!Enum.IsDefined(typeof(ScreenResolution), screen))
            {
                return BadRequest();
            }
            var temp = (ScreenResolution)Enum.Parse(typeof(ScreenResolution), screen.ToString());
            var pC = await _context.PCs.Where(p => p.Screen == temp && p.ScreenAmount == screenAmount).ToListAsync();
            if (pC == null)
            {
                return NotFound();
            }
            return pC;
        }
        /// <summary>
        /// Get all PC's with a specific configuration
        /// </summary>
        /// <param name="screenAmount">Number of screen</param>
        /// <param name="screen">Resolution of the screen</param>
        /// <param name="ram">Amount of RAM</param>
        /// <param name="gpu">GPU to search</param>
        /// <param name="cpu">GPU to search</param>
        /// <returns></returns>
        [HttpGet("fullDetails/{cpu}/{ram}/{gpu}/{screen}/{screenAmount}")]
        public async Task<ActionResult<IEnumerable<PC>>> GetPCByScreenAmountAndScreenAndRAMAndGPUAndCPU(int screenAmount, int screen, int ram, int gpu, int cpu)
        {
            //Verify that screen is contained in the screenResolution Enum
            if (!Enum.IsDefined(typeof(ScreenResolution), screen))
            {
                return BadRequest();
            }
            var temp = (ScreenResolution)Enum.Parse(typeof(ScreenResolution), screen.ToString());
            //Verify that gpu is contained in the componentClass Enum
            if (!Enum.IsDefined(typeof(componentClass), gpu))
            {
                return BadRequest();
            }
            var temp2 = (componentClass)Enum.Parse(typeof(componentClass), gpu.ToString());
            //Verify that cpu is contained in the componentClass Enum
            if (!Enum.IsDefined(typeof(componentClass), cpu))
            {
                return BadRequest();
            }
            var temp3 = (componentClass)Enum.Parse(typeof(componentClass), cpu.ToString());
            var pC = await _context.PCs.Where(p => p.Screen == temp && p.ScreenAmount == screenAmount && p.RamCapacity == ram && p.Gpu == temp2 && p.Cpu == temp3).ToListAsync();
            if (pC == null)
            {
                return NotFound();
            }
            return pC;
        }
        private bool PCExists(int id)
        {
            return _context.PCs.Any(e => e.Id == id);
        }
    }
}

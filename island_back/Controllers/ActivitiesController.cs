using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using island_back.Models;

namespace island_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("types")]
        public IEnumerable<ActivityType> GetTypes() {
            return _context.ActivityTypes;
            /*
            return Enumerable.Range(1, Types.Length).Select(type => new ActivityType {
                ActivityTypeID = type,
                ActivityTypeDescription = Types[type - 1],
                IsActive = true
            });
            //*/
        }

        // GET: api/Activities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            var r = new Random();
            var Types = await  _context.ActivityTypes.ToListAsync();
            var res= Enumerable.Range(1, 5).Select(index => new Activity {
                ActivityID = index,
                ActivityTypeID = r.Next(Types.Count-1),
                ActivityCreationDate = DateTime.Now.Add(TimeSpan.FromHours(r.Next(48))),
                ActivityDueTime = DateTime.Now.Add(TimeSpan.FromDays(14)),
                ActivityDoneTime = DateTime.MaxValue,
                ActivityNotes = $"Annotazione del {DateTime.Now}",
                ActivityCreatorName = $"utente {index}",
                IsDone = r.Next(100) % 2 == 0,
                IsDeleted = false
            });
            var lst = await _context.Activities.ToListAsync();
            //lst.Concat(res)
            return Ok((lst.Count>0)? lst: res);

        }

        // GET: api/Activities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
        }

        // PUT: api/Activities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(int id, Activity activity)
        {
            if (id != activity.ActivityID){
                return BadRequest();
            }

            var tkt = _context.ActivityTypes.FirstOrDefault(t => t.ActivityTypeID == activity.ActivityTypeID);
            if (tkt == null)
                return NotFound("No Type");

            activity.ActivityType = tkt;

            _context.Entry(activity).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!ActivityExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Activities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Activity>> PostActivity(Activity activity)
        {
            var tkt= _context.ActivityTypes.FirstOrDefault(t => t.ActivityTypeID == activity.ActivityTypeID);
            if (tkt == null)
                return NotFound("No Type");

            activity.ActivityType = tkt;

            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivity", new { id = activity.ActivityID }, activity);
        }

        // DELETE: api/Activities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null){
                return NotFound();
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityExists(int id)
        {
            return _context.Activities.Any(e => e.ActivityID == id);
        }
    }
}

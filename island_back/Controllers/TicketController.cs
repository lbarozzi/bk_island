using Microsoft.AspNetCore.Mvc;
using island_back.Models;

namespace island_back.Controllers;

[ApiController]
[Route("[controller]")]
public class TicketController : ControllerBase
{
    private static readonly string[] Types = new[]
    {
        "Missing Answer", "Technical Issue", "Change EMail", "Password Reset ", "Generic"
    };

    private readonly ILogger<TicketController> _logger;

    public TicketController(ILogger<TicketController> logger)
    {
        _logger = logger;
    }


    [HttpGet]
    public IEnumerable<Activity> Get()
    {
        var r=new Random();
        return Enumerable.Range(1, 5).Select(index => new Activity {
            ActivityID = index,
            ActivityTypeID = r.Next(Types.Length),
            ActivityCreationDate = DateTime.Now,
            ActivityDueTime = DateTime.Now.Add(TimeSpan.FromDays(14)),
            ActivityDoneTime = DateTime.MaxValue,
            ActivityNotes = $"Annotazione del {DateTime.Now}",
            ActivityCreatorName = $"utente {index}",
            IsDone = r.Next(100) % 2 == 0,
            IsDeleted = false
        });
    }
    [HttpGet("types")]
    public IEnumerable<ActivityType> GetTypes()
    {
        return Enumerable.Range(1, Types.Length).Select(type => new ActivityType{
            ActivityTypeID=type,
            ActivityTypeDescription= Types[type-1],
            IsActive=true
        });

    }

}

//using Microsoft.EntityFrameworkCore;

namespace island_back.Models;

public record class ActivityType {
    public int ActivityTypeID { get; set; }
    public string ActivityTypeDescription { get; set; }

    public bool IsActive { get; set; }

    public ActivityType() => 
        this.ActivityTypeDescription= string.Empty;
}

public class Activity {
    public int ActivityID { get; set;}  
    public int ActivityTypeID { get; set; }
    public ActivityType ActivityType { get; set; }
    public DateTime ActivityCreationDate { get; set; }
    public DateTime ActivityDueTime { get; set; }
    public DateTime ActivityDoneTime { get; set; }
    public bool IsDeleted { get; set; }
    public bool IsDone { get; set; }

    public int ActivityTargetID { get; set; }
    public string ActivityTargetName { get; set; } 
    public int ActivityCreatorID { get; set; }
    public string ActivityCreatorName { get; set; }
    public int ActivityAssigneeID { get; set; }
    public string ActivityAssigneeName { get; set; } 

    public Activity(){
        this.ActivityCreationDate= DateTime.Now;
        this.ActivityCreatorName= string.Empty;
        this.ActivityAssigneeName=string.Empty;
        this.ActivityTargetName=string.Empty;
        this.ActivityType= new ActivityType();
    }
}
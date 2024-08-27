using Microsoft.EntityFrameworkCore;

namespace island_back.Models;
    public class DataContext : DbContext{
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

    public DbSet<Activity> Activities { get; set; }
    public DbSet<ActivityType> ActivityTypes { get; set; }
    
}


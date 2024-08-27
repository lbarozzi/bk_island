using Microsoft.EntityFrameworkCore;
using island_back.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

// Bearer
//builder.Services.AddAuthentication("Bearer").AddJwtBearer();

// Add services to the container.

builder.Services.AddControllersWithViews();

/*
builder.Services.AddSwaggerGen(
    o => {
        o.SwaggerDoc("v1", new OpenApiInfo { Title = "dotnet-user-jwts", Version = "v1" });
        // Don't use in prod: fail push in azure 
        var sec1 = new OpenApiSecurityScheme {
            BearerFormat = "JWT",
            Description = "dotnet-user-jwts",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = JwtBearerDefaults.AuthenticationScheme,
            Reference = new OpenApiReference {
                Id = JwtBearerDefaults.AuthenticationScheme,
                Type = ReferenceType.SecurityScheme
            }
        };
        o.AddSecurityDefinition(sec1.Reference.Id, sec1);
        //o.AddSecurityRequirement(securityReq);
        o.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {sec1,Array.Empty<string>() }
        });
    }
);
//*/

string cnstring = builder.Configuration.GetConnectionString("maindb")??String.Empty;
if (cnstring == string.Empty)
    throw new KeyNotFoundException("Missing maindb connection string");

builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(cnstring));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

//app.UseCors("ReactPolicy");
//*
app.UseCors(x => x.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
   );
//*/
//.WithOrigins();

app.UseAuthorization();

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();

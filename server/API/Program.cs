using DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<UncleSamContext>(options =>
{
    options.UseNpgsql(
        $"Host={Environment.GetEnvironmentVariable("DB_Host")};" +
        $"Database={Environment.GetEnvironmentVariable("DB_Database")};" +
        $"User Id={Environment.GetEnvironmentVariable("DB_Username")};" +
        $"Password={Environment.GetEnvironmentVariable("DB_Password")};"
        );
});
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.UseCors(options =>
{
    options.SetIsOriginAllowed(_ => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});
app.Run();
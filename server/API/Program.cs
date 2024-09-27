using Application.Interfaces;
using Application.Services;
using DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IPaperService, PaperService>();

builder.Services.AddDbContext<UncleSamContext>(options =>
{
    var host = Environment.GetEnvironmentVariable("DB_Host") ?? throw new ArgumentNullException("DB_Host");
    var database = Environment.GetEnvironmentVariable("DB_Database") ?? throw new ArgumentNullException("DB_Database");
    var username = Environment.GetEnvironmentVariable("DB_Username") ?? throw new ArgumentNullException("DB_Username");
    var password = Environment.GetEnvironmentVariable("DB_Password") ?? throw new ArgumentNullException("DB_Password");
    
    options.UseNpgsql(
        $"Host={host};" +
        $"Database={database};" +
        $"User Id={username};" +
        $"Password={password};"
    );
});

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();

var app = builder.Build();

app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();

app.UseCors(options =>
{
    options.SetIsOriginAllowed(_ => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

app.Run();
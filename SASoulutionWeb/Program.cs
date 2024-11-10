using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SAAssignment.ExceptionMiddleware;
using SAContact_Layer;
using SADataAcessLayer.Models;
using SAServiceLayer;
using SAUnitofWork;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IContactDetails, ContactDetails>();
builder.Services.AddScoped<IContactUnitofWork, ContactUnitofWork>();
builder.Services.AddDbContext<SadataContext>();
builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(5);  
    options.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(5); 
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .SetPreflightMaxAge(TimeSpan.FromSeconds(2000));
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<ExceptionHandler>();
app.UseRouting();
app.UseCors("AllowAll"); 
app.UseAuthorization();

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Referrer-Policy", "no-referrer-when-downgrade");
    await next();
});


app.MapControllers();

app.Run();



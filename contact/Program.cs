using Microsoft.OpenApi.Models;
using SAAssignment.ExceptionMiddleware;
using SAContactLayer;
using SADataAcessLayer.Models;
using SAServiceLayer;
using SAUnitofWork;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IContactDetails, ContactDetails>();
builder.Services.AddScoped<IContactUnitofWork, ContactUnitofWork>();
builder.Services.AddDbContext<SadataContext>();
builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseSwaggerUI(options =>
    //{
    //    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    //    options.RoutePrefix = string.Empty;
    //});
}

app.UseHttpsRedirection();
app.UseMiddleware<ExceptionHandler>();
app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors(options =>
           options.WithOrigins("http://localhost:4200")
           .AllowAnyMethod()
           .AllowAnyHeader());
// app.MapControllers();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
//app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters;
using Newtonsoft.Json;
using System.Net;
using System.Net.Mime;


namespace SAAssignment.ExceptionMiddleware
{
    public class ExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandler> _logger;

        public ExceptionHandler(ILogger<ExceptionHandler> loger, RequestDelegate next)
        {
            _next = next;
            _logger = loger;
        }

        public async Task Invoke(HttpContext httpContext)
        {

            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = MediaTypeNames.Application.Json;
            int statuscode = (int)HttpStatusCode.InternalServerError;
            //(context.Response.StatusCode, ex.Message, "InternalServerError");
            var response = JsonConvert.SerializeObject(new
            {
                StatusCode = statuscode,
                ErrorMessage = exception.Message
            });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statuscode;
            await (context.Response.WriteAsync(response));

        }
        // Extension method used to add the middleware to the HTTP request pipeline.
        public static class ExceptionHandlerExtensions
        {
        }

    }
}

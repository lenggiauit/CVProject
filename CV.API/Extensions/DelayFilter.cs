using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

namespace CV.API.Extensions
{
    public class DelayFilter : IAsyncActionFilter
    {
        private int _delayInMs;
        public DelayFilter(IConfiguration configuration)
        {
            _delayInMs = configuration.GetValue<int>("ApiDelayDuration", 0);
        }

        async Task IAsyncActionFilter.OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            await Task.Delay(_delayInMs);
            await next();
        }
    }
}
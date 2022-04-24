using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using CV.API.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Resume API",
                    Version = "v1",
                    Description = "Resume API",
                    Contact = new OpenApiContact
                    {
                        Name = "Giau Le",
                        Email = "lenggiauit@gmail.com"
                    }

                });

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    Description = "Input your access token",
                    In = ParameterLocation.Header,
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer" }
                        }, new List<string>() }
                });


            });
            return services;
        }

        public static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder app, AppSettings appSettings)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"{appSettings.SubFolder}/swagger/v1/swagger.json", "Resume API V1");
                c.RoutePrefix = string.Empty;
            });

            return app;
        }
    }
}
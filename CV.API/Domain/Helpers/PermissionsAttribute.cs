using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using CV.API.Domain.Entities;
using CV.API.Domain.Services.Communication.Response;
using CV.API.Resources;
using System; 
using System.Linq;
using System.Security.Claims; 

namespace CV.API.Domain.Helpers
{
    [AttributeUsage(AttributeTargets.Method)]
    public class PermissionsAttribute : Attribute, IAuthorizationFilter 
    {
        public readonly string[] _permissions;
        public PermissionsAttribute(params string[] permissions)
        {
            _permissions = permissions;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var claimUser = context.HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.UserData).FirstOrDefault();
            if (claimUser == null)
            {
                context.Result = new JsonResult( new CommonResponse("UnAuthorized",  ResultCode.UnAuthorized)); 
            }
            else
            {
                try
                {
                    User userResource = JsonConvert.DeserializeObject<User>(claimUser.Value);
                    if (!userResource.Permissions.Select(p => p.Code).AsEnumerable().Intersect(_permissions.AsEnumerable()).Any())
                    {
                        context.Result = new JsonResult(new CommonResponse("Do not permission", ResultCode.DoNotPermission));
                    }
                }
                catch
                {
                    context.Result = new JsonResult(new CommonResponse("Unknown error", ResultCode.Unknown));
                }
            }
        }
    }
}

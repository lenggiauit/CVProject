using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CV.API.Domain.Helpers;
using CV.API.Domain.Models;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Domain.Services.Communication.Response;
using CV.API.Infrastructure;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Controllers
{
    [Authorize]
    [Route("Ref")]
    public class RefController : PMBaseController
    {
        private readonly IRefService _refServices;
        private readonly ILogger<RefController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public RefController(
            ILogger<RefController> logger,
            IMapper mapper,
            IRefService refServices,
            IOptions<AppSettings> appSettings)
        {
            _refServices = refServices;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
         
        [HttpPost("GetProjectStatus")]
        public async Task<RefResponseList> GetProjectStatus([FromBody] BaseRequest<RefRequest> request)
        {
            if (ModelState.IsValid)
            {
                var status = await _refServices.GetProjectStatus(GetCurrentUserId(), request.Payload);
                var resources = _mapper.Map<List<RefModel>, List<RefResource>>(status);
                return new RefResponseList(resources);
            }
            else
            {
                return new RefResponseList(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetPriorities")]
        public async Task<RefResponseList> GetPriorities([FromBody] BaseRequest<RefRequest> request)
        {
            if (ModelState.IsValid)
            {
                var priorities = await _refServices.GetPriorities(GetCurrentUserId(), request.Payload);
                var resources = _mapper.Map<List<RefModel>, List<RefResource>>(priorities);
                return new RefResponseList(resources);
            }
            else
            {
                return new RefResponseList(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetTodoStatus")]
        public async Task<RefResponseList> GetTodoStatus([FromBody] BaseRequest<RefRequest> request)
        {
            if (ModelState.IsValid)
            {
                var status = await _refServices.GetTodoStatus(GetCurrentUserId(), request.Payload);
                var resources = _mapper.Map<List<RefModel>, List<RefResource>>(status);
                return new RefResponseList(resources);
            }
            else
            {
                return new RefResponseList(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetTodoType")]
        public async Task<RefResponseList> GetTodoType([FromBody] BaseRequest<RefRequest> request)
        {
            if (ModelState.IsValid)
            {
                var types = await _refServices.GetTodoType(GetCurrentUserId(), request.Payload);
                var resources = _mapper.Map<List<RefModel>, List<RefResource>>(types);
                return new RefResponseList(resources);
            }
            else
            {
                return new RefResponseList(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


    }
}

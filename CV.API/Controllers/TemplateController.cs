using AutoMapper;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Domain.Services.Communication.Response;
using CV.API.Infrastructure;
using CV.API.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Controllers
{
    [Authorize]
    [Route("Template")]
    public class TemplateController : PMBaseController
    {
        private readonly ITemplateService _cvtemplateServices;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<TemplateController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public TemplateController(
            ILogger<TemplateController> logger,
            IMapper mapper,
            ITemplateService cvtemplateServices,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _cvtemplateServices = cvtemplateServices;
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [Permissions(PermissionConstant.CreateEditTemplateType)]
        [HttpPost("CreateEditTemplateType")]
        public async Task<CreateEditTemplateTypeResponse> CreateEditTemplateType([FromBody] BaseRequest<CreateEditTemplateTypeRequest> request)
        {
            if (ModelState.IsValid)
            {
                var cvTemplateType = await _cvtemplateServices.CreateEditTemplateType(GetCurrentUserId(), request.Payload);
                if (cvTemplateType != null)
                {
                    var resources = _mapper.Map<TemplateType, TemplateTypeResource>(cvTemplateType);
                    return new CreateEditTemplateTypeResponse(resources);
                }
                else
                {
                    return new CreateEditTemplateTypeResponse(Constants.ErrorMsg, ResultCode.Error);
                } 
            }
            else
            {
                return new CreateEditTemplateTypeResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.GetTemplateType)]
        [HttpPost("GetTemplateTypes")]
        public async Task<GetTemplateTypeResponse> GetTemplateTypes([FromBody] BaseRequest<GetTemplateTypesRequest> request)
        {
            if (ModelState.IsValid)
            {
                var templateTypesList = await _cvtemplateServices.GetTemplateTypes(GetCurrentUserId(), request);
                var resources = _mapper.Map<List<TemplateType>, List<TemplateTypeResource>>(templateTypesList);
                return new GetTemplateTypeResponse(resources); 
            }
            else
            {
                return new GetTemplateTypeResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }
          
        [Permissions(PermissionConstant.UploadTemplate)]
        [HttpPost("CreateEditTemplate")]
        public async Task<CreateEditTemplateResponse> CreateEditTemplate([FromBody] BaseRequest<CreateEditTemplateRequest> request)
        {
            if (ModelState.IsValid)
            {
                var cvTemplate = await _cvtemplateServices.CreateEditTemplate(GetCurrentUserId(), request.Payload);
                if (cvTemplate != null)
                {
                    var resources = _mapper.Map<Template, TemplateResource>(cvTemplate);
                    return new CreateEditTemplateResponse(resources);
                }
                else
                {
                    return new CreateEditTemplateResponse(Constants.ErrorMsg, ResultCode.Error);
                }

            }
            else
            {
                return new CreateEditTemplateResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.GetTemplate)]
        [HttpPost("GetTemplates")]
        public async Task<GetTemplatesResponse> GetTemplates([FromBody] BaseRequest<GetTemplatesRequest> request)
        {
            if (ModelState.IsValid)
            {
                var templatesList = await _cvtemplateServices.GetTemplates(GetCurrentUserId(), request);
                var resources = _mapper.Map<List<Template>, List<TemplateResource>>(templatesList);
                return new GetTemplatesResponse(resources);
            }
            else
            {
                return new GetTemplatesResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        } 

        [HttpPost("GetTemplatesByFilter")]
        public async Task<GetTemplatesResponse> GetTemplatesByFilter([FromBody] BaseRequest<GetTemplatesByFilterRequest> request)
        {
            if (ModelState.IsValid)
            {
                var templatesList = await _cvtemplateServices.GetTemplatesByFilter(GetCurrentUserId(), request);
                var resources = _mapper.Map<List<Template>, List<TemplateResource>>(templatesList);
                return new GetTemplatesResponse(resources);
            }
            else
            {
                return new GetTemplatesResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetTemplatesById")]
        public async Task<GetTemplateResponse> GetTemplatesById([FromBody] BaseRequest<GetTemplatesByIdRequest> request)
        {
            if (ModelState.IsValid)
            {
                var templatesList = await _cvtemplateServices.GetTemplatesById(GetCurrentUserId(), request);
                var resources = _mapper.Map<Template, TemplateResource>(templatesList);
                return new GetTemplateResponse(resources);
            }
            else
            {
                return new GetTemplateResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


        






    }
}

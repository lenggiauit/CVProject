using CV.API.Domain.Entities;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services
{
    public interface ITemplateService
    {
        Task<TemplateType> CreateEditTemplateType(Guid userId, CreateEditTemplateTypeRequest payload);
        Task<Template> CreateEditTemplate(Guid userId, CreateEditTemplateRequest payload);
        Task<List<TemplateType>> GetTemplateTypes(Guid userId, BaseRequest<GetTemplateTypesRequest> request);
        Task<List<Template>> GetTemplates(Guid userId, BaseRequest<GetTemplatesRequest> request);
        Task<List<Template>> GetTemplatesByFilter(Guid userId, BaseRequest<GetTemplatesByFilterRequest> request);
        Task<Template> GetTemplatesById(Guid guid, BaseRequest<GetTemplatesByIdRequest> request);
    }
}

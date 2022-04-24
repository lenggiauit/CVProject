using CV.API.Domain.Entities;
using CV.API.Domain.Models;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Repositories
{
    public interface ITemplateRepository
    {
        Task<List<TemplateType>> GetTemplateTypes(Guid userId, BaseRequest<GetTemplateTypesRequest> request);
        Task<TemplateType> CreateEditTemplateType(Guid userId, CreateEditTemplateTypeRequest request);
        Task<List<Template>> GetTemplates(Guid userId, BaseRequest<GetTemplatesRequest> request);
        Task<Template> CreateEditTemplate(Guid userId, CreateEditTemplateRequest payload, List<CSSContentTemplate> cssStrings, List<LanguageTemplate> languagesStrings, List<Models.ControlTemplate> layout);
        Task<List<Template>> GetTemplatesByFilter(Guid userId, BaseRequest<GetTemplatesByFilterRequest> request);
        Task<Template> GetTemplatesById(Guid userId, BaseRequest<GetTemplatesByIdRequest> request);
    }
}

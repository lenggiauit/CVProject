using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Models;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Services
{
    public class TemplateService : ITemplateService
    {
        private readonly ITemplateRepository _cvTemplateServiceRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<TemplateService> _logger;

        public TemplateService(ITemplateRepository cvtemplateServiceRepository,
            ILogger<TemplateService> logger,
            IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _cvTemplateServiceRepository = cvtemplateServiceRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<Template> CreateEditTemplate(Guid userId, CreateEditTemplateRequest payload)
        {
            // todo 
            if (!string.IsNullOrEmpty(payload.Package))
            {
                string fileName = Path.Combine(_appSettings.TemplateFolderPath, Path.GetFileName(payload.Package));

                List<string> cssStrings = new List<string>();
                List<string> languagesStrings = new List<string>();
                string layoutString = string.Empty;

                try
                {
                    using (ZipArchive archive = ZipFile.OpenRead(fileName))
                    {
                        foreach (var entry in archive.Entries)
                        {
                            if (WriterHelper.ValidateExtension(entry, ".language"))
                            {
                                languagesStrings.Add(WriterHelper.ExtractFileStrings(entry));
                            }
                            if (entry.Name.Equals("layout.json", StringComparison.OrdinalIgnoreCase))
                            {
                                layoutString = WriterHelper.ExtractFileStrings(entry);
                            }
                            if (WriterHelper.ValidateExtension(entry, ".csscontent"))
                            {
                                cssStrings.Add(WriterHelper.ExtractFileStrings(entry));
                            }
                        }
                    }
                    if (cssStrings.Count > 0 && !string.IsNullOrEmpty(layoutString))
                    {
                        JObject data = JObject.Parse(layoutString);
                        List<ControlTemplate> layout = JsonConvert.DeserializeObject<List<ControlTemplate>>(data["layout"].ToString());
                        List<LanguageTemplate> languageTemplates = new List<LanguageTemplate>();
                        List<CSSContentTemplate> cssContentTemplates = new List<CSSContentTemplate>();
                        foreach (var str in languagesStrings)
                        {
                            LanguageTemplate language = JsonConvert.DeserializeObject<LanguageTemplate>(str);
                            languageTemplates.Add(language);
                        }

                        foreach (var str in cssStrings)
                        {
                            CSSContentTemplate css = JsonConvert.DeserializeObject<CSSContentTemplate>(str);
                            cssContentTemplates.Add(css);
                        }

                        return await _cvTemplateServiceRepository.CreateEditTemplate(userId, payload, cssContentTemplates, languageTemplates, layout);

                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.Message);
                    return null;
                }
            }
            else
            {
                return await _cvTemplateServiceRepository.CreateEditTemplate(userId, payload, null, null, null);
            }

        }

        public async Task<TemplateType> CreateEditTemplateType(Guid userId, CreateEditTemplateTypeRequest payload)
        {
            return await _cvTemplateServiceRepository.CreateEditTemplateType(userId, payload);
        }

        public async Task<List<Template>> GetTemplates(Guid userId, BaseRequest<GetTemplatesRequest> request)
        {
            return await _cvTemplateServiceRepository.GetTemplates(userId, request);
        }

        public async Task<List<Template>> GetTemplatesByFilter(Guid userId, BaseRequest<GetTemplatesByFilterRequest> request)
        {
            return await _cvTemplateServiceRepository.GetTemplatesByFilter(userId, request);
        }

        public async Task<Template> GetTemplatesById(Guid userId, BaseRequest<GetTemplatesByIdRequest> request)
        {
            return await _cvTemplateServiceRepository.GetTemplatesById(userId, request);
        }

        public async Task<List<TemplateType>> GetTemplateTypes(Guid userId, BaseRequest<GetTemplateTypesRequest> request)
        {
            return await _cvTemplateServiceRepository.GetTemplateTypes(userId, request);
        }


    }
}

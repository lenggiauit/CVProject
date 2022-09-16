using CV.API.Domain.Entities;
using CV.API.Domain.Models;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Persistence.Repositories
{
    public class TemplateRepository : BaseRepository, ITemplateRepository
    {
        private readonly ILogger<TemplateRepository> _logger;
        public TemplateRepository(PMContext context, ILogger<TemplateRepository> logger) : base(context)
        {
            _logger = logger;
        }

        List<Control> GennerateControl(Guid templateId, Guid parentId, List<ControlTemplate> controlsList)
        {
            List<Control> controls = new List<Control>();
            if (controlsList != null) {
                foreach (var item in controlsList)
                {
                    Guid controlId = Guid.NewGuid();
                    Control control = new Control();
                    control.Id = controlId;
                    control.Name = item.Name;
                    control.Order = item.Order;
                    control.ParentId = parentId;
                    control.TemplateId = templateId;
                    control.Type = item.Type;
                    control.EditType = item.EditType;
                    control.CssClass = item.CssClass;
                    control.Placeholder = item.Placeholder;
                    control.Text = item.Text;
                    control.Value = item.Value;
                    control.Childs = GennerateControl(templateId, controlId, item.Childs);
                controls.Add(control);
                }
            }

            return controls;
        }

        void AddTemplateRelatedTables(Guid templateId, List<CSSContentTemplate> cssStrings, List<LanguageTemplate> languagesStrings, List<ControlTemplate> layout)
        {
            foreach (var item in cssStrings)
            {
                CSSContent cSSContent = new CSSContent();
                cSSContent.Id = Guid.NewGuid();
                cSSContent.TemplateId = templateId;
                cSSContent.Name = item.Name;
                cSSContent.Content = item.Content;
                _context.CSSContent.AddAsync(cSSContent);
            }

            foreach (var item in languagesStrings)
            {
                Language lang = new Language();
                lang.Id = Guid.NewGuid();
                lang.TemplateId = templateId;
                lang.Name = item.Name;
                lang.Content = item.Content.ToString();
                _context.Language.AddAsync(lang);
            }
             
            _context.AddRangeAsync(GennerateControl(templateId, templateId, layout) );
        
        }

        void RemoveTemplateRelatedTables(Guid templateId)
        {
            _context.CSSContent.RemoveRange(_context.CSSContent.Where(c => c.TemplateId.Equals(templateId)));
            _context.Language.RemoveRange(_context.Language.Where(l => l.TemplateId.Equals(templateId)));
            _context.Control.RemoveRange(_context.Control.Where(c => c.TemplateId.Equals(templateId)));
        }

        public async Task<Template> CreateEditTemplate(Guid userId, CreateEditTemplateRequest payload, List<CSSContentTemplate>? cssStrings, List<LanguageTemplate>? languagesStrings, List<ControlTemplate>? layout)
        {
            try
            {
                if (payload.Id == Guid.Empty)
                {
                    Guid templateId = Guid.NewGuid();
                    Template newTemp = new Template()
                    {
                        Id = templateId,
                        Name = payload.Name,
                        Image = payload.Image,
                        TemplateTypeId = payload.TemplateTypeId,
                        Description = payload.Description,
                        Package = payload.Package,
                        CreatedDate = DateTime.Now,
                        CreatedBy = userId,
                        UpdatedDate = DateTime.Now,
                        IsArchived = payload.IsArchived,
                    };
                    await _context.Template.AddAsync(newTemp);

                    AddTemplateRelatedTables(templateId, cssStrings, languagesStrings, layout);
                     
                    await _context.SaveChangesAsync();
                    return newTemp;
                }
                else
                {
                    Template editTemp = _context.Template.Where(t => t.Id.Equals(payload.Id)).FirstOrDefault();
                    if (editTemp != null)
                    {
                        editTemp.Name = payload.Name;
                        editTemp.Description = payload.Description;
                        editTemp.TemplateTypeId = payload.TemplateTypeId;
                        editTemp.Package = string.IsNullOrEmpty( payload.Package) ? editTemp.Package : payload.Package;
                        editTemp.Image = payload.Image;
                        editTemp.UpdatedDate = DateTime.Now;
                        editTemp.UpdatedBy = userId;
                        editTemp.IsArchived = payload.IsArchived;
                        _context.Template.Update(editTemp);
                        
                        if (cssStrings != null && languagesStrings != null && layout != null)
                        {
                            RemoveTemplateRelatedTables(editTemp.Id);
                            AddTemplateRelatedTables(editTemp.Id, cssStrings, languagesStrings, layout);
                        }
                        await _context.SaveChangesAsync();
                        return editTemp;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<TemplateType> CreateEditTemplateType(Guid userId, CreateEditTemplateTypeRequest request)
        {
            try
            {
                if (request.Id == Guid.Empty)
                {
                    TemplateType newType = new TemplateType()
                    {
                        Id = Guid.NewGuid(),
                        Name = request.Name,
                        Description = request.Description,
                        CreatedDate = DateTime.Now,
                        CreatedBy = userId,
                        UpdatedDate = DateTime.Now,
                        IsArchived = request.IsArchived,
                    };
                    await _context.TemplateType.AddAsync(newType);
                    await _context.SaveChangesAsync();
                    return newType;
                }
                else
                {
                    TemplateType editType = _context.TemplateType.Where(t => t.Id.Equals(request.Id)).FirstOrDefault();
                    if (editType != null)
                    {
                        editType.Name = request.Name;
                        editType.Description = request.Description;
                        editType.UpdatedDate = DateTime.Now;
                        editType.UpdatedBy = userId;
                        editType.IsArchived = request.IsArchived;
                        _context.TemplateType.Update(editType);
                        await _context.SaveChangesAsync();
                        return editType;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<Template>> GetTemplates(Guid userId, BaseRequest<GetTemplatesRequest> request)
        {
            try
            {
                return await _context.Template
                    .Where(p => p.IsArchived == request.Payload.IsArchived)
                    .Select(p => new Template()
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Author = p.Author,
                        Image = p.Image,
                        TemplateTypeId = p.TemplateTypeId,
                        TemplateType = _context.TemplateType.Where(t => t.Id.Equals(p.TemplateTypeId)).FirstOrDefault(),
                        Version = p.Version, 
                        Package = p.Package,
                        Description = p.Description,
                        CreatedDate = p.CreatedDate,
                        CreatedBy = p.CreatedBy,
                        UpdatedBy = p.UpdatedBy,
                        UpdatedDate = p.UpdatedDate,
                        IsArchived = p.IsArchived,
                        TotalRows = _context.Template
                        .Where(p => p.IsArchived == request.Payload.IsArchived)
                        .Count()
                    })
                    .AsNoTracking()
                    .OrderByDescending(x => x.UpdatedDate)
                    .GetPagingQueryable(request.MetaData)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<Template>> GetTemplatesByFilter(Guid userId, BaseRequest<GetTemplatesByFilterRequest> request)
        {
            try
            {
                var query = _context.Template
                    .Where(p => !p.IsArchived).AsQueryable();
                if (request.Payload.TypeId != null || request.Payload.TypeId == Guid.Empty)
                {
                    query = query.Where(p => p.TemplateTypeId.Equals(request.Payload.TypeId));
                }
                
                return await query
                .Select(p => new Template()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Author = p.Author,
                    Image = p.Image,
                    TemplateTypeId = p.TemplateTypeId,
                    TemplateType = _context.TemplateType.Where(t => t.Id.Equals(p.TemplateTypeId)).FirstOrDefault(),
                    Version = p.Version, 
                    Package = p.Package,
                    Description = p.Description,
                    CreatedDate = p.CreatedDate,
                    CreatedBy = p.CreatedBy,
                    UpdatedBy = p.UpdatedBy,
                    UpdatedDate = p.UpdatedDate,
                    IsArchived = p.IsArchived,
                    TotalRows = _context.Template
                    .Where(p => !p.IsArchived)
                    .Count()
                })
                .AsNoTracking()
                .OrderByDescending(x => x.UpdatedDate)
                .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<TemplateType>> GetTemplateTypes(Guid userId, BaseRequest<GetTemplateTypesRequest> request)
        {
            try
            {
                return await _context.TemplateType
                    .Where(p => p.IsArchived == request.Payload.IsArchived)
                    .Select(p => new TemplateType()
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        CreatedDate = p.CreatedDate,
                        CreatedBy = p.CreatedBy,
                        UpdatedBy = p.UpdatedBy,
                        UpdatedDate = p.UpdatedDate,
                        IsArchived = p.IsArchived,
                        TotalRows = _context.TemplateType
                        .Where(p => p.IsArchived == request.Payload.IsArchived)
                        .Count()
                    })
                    .AsNoTracking()
                    .OrderByDescending(x => x.UpdatedDate)
                    .GetPagingQueryable(request.MetaData)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<Template> GetTemplatesById(Guid userId, BaseRequest<GetTemplatesByIdRequest> request)
        {
            try
            { 
                return await _context.Template.Where(t => t.Id.Equals(request.Payload.Id))
                .Select(p => new Template()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Author = p.Author,
                    Image = p.Image,
                    TemplateTypeId = p.TemplateTypeId,
                    TemplateType = _context.TemplateType.Where(t => t.Id.Equals(p.TemplateTypeId)).FirstOrDefault(),
                    Version = p.Version,
                    Package = p.Package,
                    Description = p.Description,
                    CreatedDate = p.CreatedDate,
                    CreatedBy = p.CreatedBy,
                    UpdatedBy = p.UpdatedBy,
                    UpdatedDate = p.UpdatedDate,
                    IsArchived = p.IsArchived,
                    CSSContents = _context.CSSContent.Where( c => c.TemplateId.Equals(request.Payload.Id)).ToList(),
                    Controls = _context.Control.Where(c => c.TemplateId.Equals(request.Payload.Id)).ToList(),
                    Languages = _context.Language.Where(l => l.TemplateId.Equals(request.Payload.Id)).ToList() 
                })
                .AsNoTracking() 
                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }
    }
}

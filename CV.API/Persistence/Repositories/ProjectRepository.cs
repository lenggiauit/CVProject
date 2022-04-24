using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CV.API.Domain.Entities;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Persistence.Repositories
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        private readonly ILogger<ProjectRepository> _logger;
        public ProjectRepository(PMContext context, ILogger<ProjectRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<Project> CreateProject(Guid userId, CreateProjectRequest request)
        {
            try
            {
                Project newProject = new Project()
                {
                    Id = Guid.NewGuid(),
                    Name = request.Name,
                    Description = request.Description,
                    CreatedDate = DateTime.Now,
                    CreatedBy = userId,
                    UpdatedDate  = DateTime.Now,
                    StatusId = request.StatusId,
                    IsArchived = false,
                };
                await _context.Project.AddAsync(newProject);
                await _context.SaveChangesAsync();
                return newProject;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<Project> GetById(Guid id)
        {
            try
            {
                return await _context.Project.AsNoTracking().Where(t => t.Id.Equals(id)).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<Project> GetProjectDetailById(object userId, BaseRequest<Guid> request)
        {
            try
            {
                return await _context.Project
                    .Where(p => p.Id.Equals(request.Payload))
                    .Select(p => new Project()
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        CreatedDate = p.CreatedDate,
                        CreatedBy = p.CreatedBy,
                        UpdatedBy = p.UpdatedBy,
                        UpdatedDate = p.UpdatedDate,
                        IsArchived = p.IsArchived,
                        Status = _context.ProjectStatus.Where(s => s.Id.Equals(p.StatusId)).FirstOrDefault(),
                        Members = _context.UserOnProject.Where(up => up.ProjectId.Equals(p.Id))
                            .Join(_context.User, UoP => UoP.UserId, U => U.Id, (UoP, U) => new User() { 
                                Id = U.Id,
                                UserName = U.UserName,
                                Email = U.Email,
                                FullName = U.FullName,
                                JobTitle = U.JobTitle,
                                Avatar = U.Avatar,
                                Address = U.Address,
                                Phone = U.Phone,
                                Role = _context.Role.Where(r => r.Id.Equals(UoP.RoleId)).FirstOrDefault()                            
                            } ).ToList() 
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

        public async Task<List<Project>> GetProjectList(Guid userId, BaseRequest<GetProjectListRequest> request)
        {
            try
            {
                return await _context.Project.AsNoTracking().GetPagingQueryable(request.MetaData).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }
         
        public async Task<List<Project>> GetProjectListByUser(Guid userId, BaseRequest<GetProjectListRequest> request)
        {
            try
            {
                return await _context.Project
                    .Where(p => p.IsArchived == request.Payload.IsArchived)
                    .Select(p => new Project()
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        CreatedDate = p.CreatedDate,
                        CreatedBy = p.CreatedBy,
                        UpdatedBy = p.UpdatedBy,
                        UpdatedDate = p.UpdatedDate,
                        IsArchived = p.IsArchived,
                        Status = _context.ProjectStatus.Where(s => s.Id.Equals(p.StatusId)).FirstOrDefault(),
                        TotalRows = _context.Project.Count()
                    })
                    .AsNoTracking()
                    .OrderByDescending(x => x.CreatedDate)
                    .GetPagingQueryable(request.MetaData)
                    
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<bool> Update(Guid userId, UpdateProjectRequest request)
        {
            try
            {
                var project = await _context.Project.Where(u => u.Id.Equals(request.Id)).FirstOrDefaultAsync();
                if (project != null)
                {
                    project.Name = request.Name;
                    project.Description = request.Description;
                    project.StatusId = request.StatusId;
                    project.UpdatedBy = userId;
                    project.UpdatedDate = DateTime.Now;
                    _context.Update(project);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
    }
}
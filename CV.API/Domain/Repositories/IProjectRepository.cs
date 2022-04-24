using CV.API.Domain.Entities;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Repositories
{
    public interface IProjectRepository
    {
        Task<Project> GetById(Guid id);
        Task<Project> CreateProject(Guid userId, CreateProjectRequest request);
        Task<bool> Update(Guid userId, UpdateProjectRequest request);
        Task<List<Project>> GetProjectList(Guid userId, BaseRequest<GetProjectListRequest> request);
        Task<List<Project>> GetProjectListByUser(Guid userId, BaseRequest<GetProjectListRequest> request);
        Task<Project> GetProjectDetailById(object userId, BaseRequest<Guid> request);
    }
}

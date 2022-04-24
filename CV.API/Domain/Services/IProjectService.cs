using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services
{
    public interface IProjectService
    {
        Task<Project> GetById(Guid id);
        Task<Project> CreateProject(Guid userId, CreateProjectRequest createProjectRequest);
        Task<ResultCode> Update(Guid userId, UpdateProjectRequest updateProjectRequest);
        Task<List<Project>> GetProjectList(Guid userId, BaseRequest<GetProjectListRequest> getProjectListRequest);
        Task<List<Project>> GetProjectListByUser(Guid userId, BaseRequest<GetProjectListRequest> getProjectListRequest);
        Task<Project> GetProjectDetailById(Guid guid, BaseRequest<Guid> request);
    }
}

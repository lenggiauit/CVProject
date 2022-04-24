using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Repositories
{
     public interface ITeamRepository
    {
        Task<Team> GetById(Guid id);
        Task<bool> CreateTeam(CreateTeamRequest createTeamRequest);
        Task<bool> Update(UpdateTeamRequest updateTeamRequest);
        Task<List<Team>> GetTeamList(BaseRequest<GetTeamListRequest> teamListRequest);
        Task<List<Team>> GetTeamListByUser(BaseRequest<GetTeamListRequest> teamListRequest);
        Task<List<Team>> GetTeamListByProject(BaseRequest<GetTeamListRequest> teamListRequest);
    }
}

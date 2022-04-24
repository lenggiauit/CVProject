using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Services
{
    public interface ITeamService
    {
        Task<Team> GetById(Guid id);
        Task<ResultCode> CreateTeam(CreateTeamRequest createTeamRequest);
        Task<ResultCode> Update(UpdateTeamRequest updateTeamRequest);
        Task<List<Team>> GetTeamList(BaseRequest<GetTeamListRequest> getTeamListRequest);
        Task<List<Team>> GetTeamListByUser(BaseRequest<GetTeamListRequest> getTeamListRequest);
        Task<List<Team>> GetTeamListByProject(BaseRequest<GetTeamListRequest> getTeamListRequest);
    }
}

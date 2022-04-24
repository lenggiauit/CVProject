using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository; 
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<TeamService> _logger;

        public TeamService(ITeamRepository teamRepository,  ILogger<TeamService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _teamRepository = teamRepository; 
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<ResultCode> CreateTeam(CreateTeamRequest createTeamRequest)
        {
            await _teamRepository.CreateTeam(createTeamRequest);
            await _unitOfWork.CompleteAsync();
            return ResultCode.Success;
        }

        public async Task<Team> GetById(Guid id)
        {
            return await _teamRepository.GetById(id);
        }

        public async Task<List<Team>> GetTeamList(BaseRequest<GetTeamListRequest> getTeamListRequest)
        {
            return await _teamRepository.GetTeamList(getTeamListRequest);
        }

        public async Task<List<Team>> GetTeamListByProject(BaseRequest<GetTeamListRequest> getTeamListRequest)
        {
            return await _teamRepository.GetTeamListByProject(getTeamListRequest);
        }

        public async Task<List<Team>> GetTeamListByUser(BaseRequest<GetTeamListRequest> getTeamListRequest)
        {
            return await _teamRepository.GetTeamListByUser(getTeamListRequest);
        }

        public async Task<ResultCode> Update(UpdateTeamRequest updateTeamRequest)
        {
            await _teamRepository.Update(updateTeamRequest);
            await _unitOfWork.CompleteAsync();
            return ResultCode.Success;
        }
    }
}

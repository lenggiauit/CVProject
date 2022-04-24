using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Persistence.Repositories
{
    public class TeamRepository : BaseRepository, ITeamRepository
    {
        private readonly ILogger<TeamRepository> _logger;
        public TeamRepository(PMContext context, ILogger<TeamRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<bool> CreateTeam(CreateTeamRequest createTeamRequest)
        {
            try
            {
                Team newTeam = new Team()
                {
                    Id = Guid.NewGuid(),
                    Name = createTeamRequest.Name,
                    Description = createTeamRequest.Description,
                    IsPublic = createTeamRequest.IsPublic,
                    CreatedDate = DateTime.Now,
                    CreatedBy = Guid.Empty,
                };
                await _context.Team.AddAsync(newTeam);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<Team> GetById(Guid id)
        {
            try
            {
                return await _context.Team.AsNoTracking().Where(t => t.Id.Equals(id)).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<Team>> GetTeamList(BaseRequest<GetTeamListRequest> teamListRequest)
        {
            try
            {
                return await _context.Team.AsNoTracking().GetPagingQueryable(teamListRequest.MetaData).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<Team>> GetTeamListByProject(BaseRequest<GetTeamListRequest> teamListRequest)
        {
            try
            {
                return await _context.Team.AsNoTracking().GetPagingQueryable(teamListRequest.MetaData).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<Team>> GetTeamListByUser(BaseRequest<GetTeamListRequest> teamListRequest)
        {
            try
            {
                return await _context.Team.AsNoTracking().GetPagingQueryable(teamListRequest.MetaData).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<bool> Update(UpdateTeamRequest updateTeamRequest)
        {
            try
            {
                var team = await _context.Team.Where(u => u.Id.Equals(updateTeamRequest.Id)).FirstOrDefaultAsync();
                if (team != null)
                {
                    team.Name = updateTeamRequest.Name;
                    team.Description = updateTeamRequest.Description;
                    _context.Update(team);
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

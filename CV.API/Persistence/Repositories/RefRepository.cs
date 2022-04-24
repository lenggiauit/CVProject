using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CV.API.Domain.Entities;
using CV.API.Domain.Models;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Persistence.Repositories
{
    public class RefRepository : BaseRepository, IRefRepository
    {
        private readonly ILogger<RefRepository> _logger;
        public RefRepository(PMContext context, ILogger<RefRepository> logger) : base(context)
        {
            _logger = logger;
        }
        
        public async Task<List<RefModel>> GetProjectStatus(Guid guid, RefRequest payload)
        {
            try
            {
                return await _context.ProjectStatus.AsNoTracking().Where(s => s.IsActive == true)
                    .Select(ps => new RefModel()
                    {
                        Id = ps.Id,
                        Name = ps.Name,
                        Description = ps.Description,
                        IsDefault = ps.IsDefault,
                    })
                    .ToListAsync();
            }
            catch(Exception ex)
            { 
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<List<RefModel>> GetPriorities(Guid guid, RefRequest payload)
        {
            return await _context.Priority.AsNoTracking().Where(s => s.IsActive == true)
                .Select(ps => new RefModel()
                {
                    Id = ps.Id,
                    Name = ps.Name, 
                    Color = ps.Color,
                    Order = ps.Order,
                    IsDefault = ps.IsDefault,
                })
                .ToListAsync();
        }

        public async Task<List<RefModel>> GetTodoStatus(Guid guid, RefRequest payload)
        {
            return await _context.TodoStatus.AsNoTracking().Where(s => s.IsActive == true)
                .Select(ps => new RefModel()
                {
                    Id = ps.Id,
                    Name = ps.Name, 
                    Description = ps.Description
                })
                .ToListAsync();
        }

        public async Task<List<RefModel>> GetTodoType(Guid guid, RefRequest payload)
        {
            return await _context.TodoType.AsNoTracking().Where(s => s.IsActive == true)
                .Select(ps => new RefModel()
                {
                    Id = ps.Id,
                    Name = ps.Name,
                    Description = ps.Description,
                    Color = ps.Color,
                    Order = ps.Order,
                })
                .ToListAsync();
        }


    }
}

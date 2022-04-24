using CV.API.Domain.Models;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Repositories
{
    public interface IRefRepository
    {
        Task<List<RefModel>> GetProjectStatus(Guid guid, RefRequest payload);
        Task<List<RefModel>> GetPriorities(Guid guid, RefRequest payload);
        Task<List<RefModel>> GetTodoStatus(Guid guid, RefRequest payload);
        Task<List<RefModel>> GetTodoType(Guid guid, RefRequest payload);
    }
}

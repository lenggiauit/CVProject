using CV.API.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Persistence.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly PMContext _context;

        protected BaseRepository(PMContext context)
        {
            _context = context;
        }
    }
}
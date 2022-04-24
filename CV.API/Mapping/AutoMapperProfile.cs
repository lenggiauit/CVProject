using AutoMapper;
using CV.API.Domain.Entities;
using CV.API.Domain.Models;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        { 
            CreateMap<User, UserResource>(); 
            CreateMap<Role, RoleResource>();
            CreateMap<Permission, PermissionResource>();
            CreateMap<Team, TeamResource>();
            // projects
            CreateMap<Project, ProjectResource>();
            CreateMap<Project, ProjectDetailResource>(); 
            CreateMap<ProjectStatus, ProjectStatusResource>(); 
            // Ref
            CreateMap<RefModel, RefResource>(); 
            CreateMap<Conversation,ConversationResource>();
            CreateMap<User, ConversationerResource>();
            CreateMap<ConversationMessage, ConversationMessageResource>(); 
            CreateMap<Todo, TodoResource>();
            //
            CreateMap<TemplateType, TemplateTypeResource>();
            CreateMap<Template, TemplateResource>();
            CreateMap<Control, ControlResource>();
            CreateMap<CSSContent, CSSContentResource>();
            CreateMap<Language, LanguageResource>();
            //
        }
    }
}
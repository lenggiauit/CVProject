using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Domain.Helpers
{
    public static class PermissionConstant
    {
        public const string GetProjectListByUser = "GetProjectListByUser";
        public const string GetProjectDetail = "GetProjectDetail";
        public const string AddNewProject = "AddNewProject";
        public const string UpdateProject = "UpdateProject";
        public const string DeleteProject = "DeleteProject";

        // Template permissions
        public const string CreateEditTemplateType = "CreateTemplateType";
        public const string UploadTemplate = "UploadTemplate";
        public const string GetTemplateType = "GetTemplateType";
        public const string GetTemplate = "GetTemplate";


    }
}

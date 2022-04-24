import { CreatedBy } from "./createdBy";
import { ProjectRole } from "./projectRole";
import { ProjectStatus } from "./projectStatus";

export type Member =
    {
        id: any,
        name: any,
        fullName?: any,
        jobTitle?: any,
        avatar?: any,
        phone?: any,
        address?: any,
        role: ProjectRole,
    }
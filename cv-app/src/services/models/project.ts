import { CreatedBy } from "./createdBy";
import { ProjectStatus } from "./projectStatus";

export type Project =
    {
        id: any,
        name: any,
        description: any,
        isArchived: boolean,
        status: ProjectStatus,
        createdDate: any,
        createdByUser: CreatedBy,
        totalRows: number
    }
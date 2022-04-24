import { CreatedBy } from "./createdBy";
import { Member } from "./member";
import { Priority } from "./priority";
import { TodoStatus } from "./todoStatus";
import { TodoType } from "./todoType";

export type Todo =
    {
        id: any,
        name: any,
        description: any,
        createdDate: any,
        createdByUser: CreatedBy,
        startDate: any,
        endDate: any,
        dueDate: any,
        assignee: Member,
        todoType: TodoType,
        todoStatus: TodoStatus,
        projectId: any,
        priotity: Priority,
        positionX: any,
        positionY: any,
        positionW: any,
        positionH: any,
        updatedBy: CreatedBy,
        updatedDate: any,
        isArchived: boolean
    }
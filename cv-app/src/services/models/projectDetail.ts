import { TemplateLiteral } from "typescript";
import { CreatedBy } from "./createdBy";
import { Member } from "./member";
import { Project } from "./project";
import { ProjectStatus } from "./projectStatus";
import { Todo } from "./todo";

export type ProjectDetail = Project &
{
    members: Member[],
    todos?: Todo[]
}

import { Control } from "./control";
import { CreatedBy } from "./createdBy";
import { CSSContent } from "./cssContent";
import { Language } from "./language";
import { TemplateType } from "./templateType";

export type Template =
    {
        id: any,
        templateTypeId: any,
        name: any,
        image: any,
        description: any,
        package: any,
        isArchived: boolean,
        totalRows: number,
        templateType: TemplateType,
        version: any,
        author: any,
        controls: Control[],
        cssContents: CSSContent[]
        languages: Language[]
    }
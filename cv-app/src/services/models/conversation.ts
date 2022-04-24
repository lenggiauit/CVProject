import { type } from "os";
import { Messenger } from "./messenger";
import { User } from "./user";

export type Conversation = {
    id: any;
    title: any;
    lastMessage: any;
    lastMessageDate: any;
    createdBy: any;
    updatedBy: any;
    createdDate: any;
    conversationers: Messenger[];
};
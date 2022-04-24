import { type } from "os";
import { User } from "../../models/user";

export type GetConversationListRequest = {
    userId: any,
};

export type GetMessagesRequest = {
    conversationId: any,
};
export type SearchRequest = {
    keyword: any,
}

export type MessengeSearchRequest = {
    keyword: any,
    currentIds: any[]
}

export type CreateConversationRequest = {
    id: any,
    users: string[],
}

export type InviteToConversationRequest = {
    conversationId: any,
    users: any[]
}


export type RemoveFromConversationRequest = {
    conversationId: any,
    users: any[]
}
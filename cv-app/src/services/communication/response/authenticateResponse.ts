import { User } from "../../models/user";

export type AuthenticateResponse = {
    messages: any;
    errorCode: any;
    resource: User;
};
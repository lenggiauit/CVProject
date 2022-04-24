import { Permission } from "./permission";
import { Role } from "./role";

export type User = {
    id: any,
    name: any,
    fullName?: any,
    jobTitle?: any,
    avatar?: any,
    phone?: any,
    address?: any,
    role: Role,
    accessToken: any,
    email: any,
    isActive: any,
    permissions: Permission[],
    teams: any
};

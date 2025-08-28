import { SetMetadata } from "@nestjs/common";
import { RoleType } from "../types/role.types";

export const ROLES_KEY = "roles";
export const Roles = (roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);

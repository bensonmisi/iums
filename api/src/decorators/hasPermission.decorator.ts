import { SetMetadata } from "@nestjs/common";

export const HasPermission = (...hasPermission:string[])=>SetMetadata('permission',hasPermission)
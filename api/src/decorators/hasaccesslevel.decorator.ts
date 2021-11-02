import { SetMetadata } from "@nestjs/common";

export const HasAccesslevel = (...hasAccesslevel:string[])=>SetMetadata('accesslevel',hasAccesslevel)
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminmenusService } from 'src/adminmenus/adminmenus.service';


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector,private adminmenuService:AdminmenusService) {}

 async canActivate(context: ExecutionContext):Promise<boolean> {
    const permission = this.reflector.get<string[]>('permission', context.getHandler());
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
  // const value = await this.adminmenuService.checkPermission(user.roleId,permission[0])
    //  return value
    
    return true
  }
}
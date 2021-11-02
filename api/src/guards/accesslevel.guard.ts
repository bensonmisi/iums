import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const accesslevel = this.reflector.get<string[]>('accesslevel', context.getHandler());
    if (!accesslevel) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(user.level === accesslevel[0])
     {
    return true
     }
     return false
  }
}
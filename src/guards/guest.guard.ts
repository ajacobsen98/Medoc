import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GuestGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return !request.user; // Allow access if user is not authenticated
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'


import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        
        const authHeader = request.headers.authorization;
    
          if (!authHeader) {
            throw new UnauthorizedException('No authorization header')
        }

        const token = authHeader.replace('Bearer ', '')

        try {
            const decoded = jwt.decode(token) as any

            if (!decoded?.sub) {
                throw new UnauthorizedException('Invalid token')
            }

             // attach user to request
            (request as any).user = {
                id: decoded.sub,
                email: decoded.email,
            };

            return true
        } catch (err) {
            throw new UnauthorizedException('Invalid token')
        }
    }
}
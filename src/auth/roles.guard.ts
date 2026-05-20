import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException(
        'Unauthorized',
      );
    }

     const supabase =
      this.supabaseService.getClient();

    const { data } = await supabase
      .from('users')
      .select('role,is_suspended')
      .eq('id', user.id)
      .single();

       if (!data) {
      throw new ForbiddenException(
        'User not found',
      );
    }

    if (data.is_suspended) {
      throw new ForbiddenException(
        'Account suspended',
      );
    }

    if (
      data.role !== 'admin' &&
      data.role !== 'moderator'
    ) {
      throw new ForbiddenException(
        'Insufficient permissions',
      );
    }

    request.currentRole = data.role;

    return true;
  }
}
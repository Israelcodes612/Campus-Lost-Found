import { SupabaseService } from '../supabase/supabase.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    getProfile(userId: string): Promise<any>;
    updateProfile(userId: string, dto: UpdateUserDto): Promise<any>;
}

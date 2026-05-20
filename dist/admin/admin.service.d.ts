import { SupabaseService } from '../supabase/supabase.service';
export declare class AdminService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    getAllUsers(): Promise<any[]>;
    suspendUser(userId: string): Promise<{
        message: string;
        user: any;
    }>;
    unsuspendUser(userId: string): Promise<{
        message: string;
        user: any;
    }>;
    deleteItem(itemId: string): Promise<{
        message: string;
    }>;
    updateRole(userId: string, role: string): Promise<{
        message: string;
        user: any;
    }>;
}

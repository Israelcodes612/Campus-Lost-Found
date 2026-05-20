import { SupabaseService } from '../supabase/supabase.service';
export declare class UploadsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    uploadItemImage(file: Express.Multer.File): Promise<{
        message: string;
        image_url: string;
    }>;
}

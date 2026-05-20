import { SupabaseService } from '../supabase/supabase.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(userId: string, dto: CreateItemDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(itemId: string, userId: string, dto: UpdateItemDto): Promise<any>;
    remove(itemId: string, userId: string): Promise<{
        message: string;
    }>;
}

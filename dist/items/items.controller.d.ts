import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(user: any, dto: CreateItemDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, user: any, dto: UpdateItemDto): Promise<any>;
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}

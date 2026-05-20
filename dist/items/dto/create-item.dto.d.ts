export declare enum ItemStatus {
    LOST = "lost",
    FOUND = "found"
}
export declare class CreateItemDto {
    title: string;
    description: string;
    category: string;
    image_url?: string;
    location_id?: string;
    item_status: ItemStatus;
    date_lost_or_found: string;
}

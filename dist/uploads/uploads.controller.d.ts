import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadItemImage(file: Express.Multer.File): Promise<{
        message: string;
        image_url: string;
    }>;
}

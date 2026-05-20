"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const supabase_service_1 = require("../supabase/supabase.service");
let UploadsService = class UploadsService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async uploadItemImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type');
        }
        const supabase = this.supabaseService.getClient();
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${(0, crypto_1.randomUUID)()}.${fileExtension}`;
        const filePath = `items/${fileName}`;
        const { error } = await supabase.storage
            .from('items')
            .upload(filePath, file.buffer, {
            contentType: file.mimetype,
        });
        if (error) {
            throw new common_1.BadRequestException(error.message);
        }
        const { data: { publicUrl }, } = supabase.storage
            .from('items')
            .getPublicUrl(filePath);
        return {
            message: 'Image uploaded successfully',
            image_url: publicUrl,
        };
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map
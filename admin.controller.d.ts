import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    suspendUser(id: string): Promise<{
        message: string;
        user: any;
    }>;
    unsuspendUser(id: string): Promise<{
        message: string;
        user: any;
    }>;
    deleteItem(id: string): Promise<{
        message: string;
    }>;
    updateRole(id: string, role: string): Promise<{
        message: string;
        user: any;
    }>;
}

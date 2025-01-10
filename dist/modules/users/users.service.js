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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const client_1 = require("@prisma/client");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllUsers() {
        return this.prisma.user.findMany(); // Example Prisma query
    }
    async createUser(email, password, role, name, phone, userType) {
        if (!Object.values(client_1.UserType).includes(userType)) {
            throw new common_3.BadRequestException(`Invalid user type: ${userType}`);
        }
        return this.prisma.user.create({
            data: {
                email,
                password,
                role,
                name,
                phone,
                user_type: userType, // Cast to enum
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async getUserById(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_2.NotFoundException(`User with ID ${userId} not found.`);
        }
        return user; // The user is guaranteed to be non-null here.
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async updateUserRole(id, role) {
        return this.prisma.user.update({
            where: { id },
            data: { role },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);

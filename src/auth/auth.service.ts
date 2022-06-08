import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(
        private prismaService: PrismaService
    ) {

    }

    login() { 
        return { msg: 'I am signed in' };
    }
    signup() { 
        return { mgs: 'I am signed up' };
    }
 }
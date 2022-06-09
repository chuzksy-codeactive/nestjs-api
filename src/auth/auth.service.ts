import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
    constructor(
        private prismaService: PrismaService
    ) {

    }

    async login(dto: AuthDto) { 
        console.log(dto);
        const user = await this.prismaService.user.findFirst({
            where: {
                email: dto.email
            },
        });

        if (!user)
            throw new ForbiddenException("Credential incorrect");
        
        const pwdMatches = await argon.verify(user.hash, dto.password);
        if (!pwdMatches)
            throw new ForbiddenException("Credentials incorrect");
        
        delete user.hash;
        return user;
    }
    async signup(dto: AuthDto) { 
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prismaService.user.create({
              data: {
                email: dto.email,
                hash,
              },
            });
            delete user.hash;

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            }
            throw error;
        }
    }
 }
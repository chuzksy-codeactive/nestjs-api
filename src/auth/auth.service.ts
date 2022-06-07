import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    login() { 
        return { msg: 'I am signed in' };
    }
    signup() { 
        return { mgs: 'I am signed up' };
    }
 }
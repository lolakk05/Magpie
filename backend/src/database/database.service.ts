import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        const connectionString = `${process.env.DATABASE_URL}`;

        if(!connectionString || typeof connectionString != 'string' || !connectionString.trim()) {
            throw new Error("DATABASE_URL env is not set or empty");
        }

        try {
            const pool = new Pool({connectionString});
            const adapter = new PrismaPg(pool);
            super({adapter});
        } catch (error) {
            throw error;    
        }
    }
    async onModuleInit() {
        await this.$connect();
    }
}

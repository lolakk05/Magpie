import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        const connectionString = `${process.env.DATABASE_URL}`;

        console.log('🔌 Próba połączenia z bazą. URL dostępny:', connectionString);

        const pool = new Pool({connectionString});

        const adapter =new PrismaPg(pool);

        super({adapter})
    }
    async onModuleInit() {
        await this.$connect;
    }
}

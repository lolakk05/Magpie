import { DatabaseService } from "./database.service";
import { Controller } from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Product } from "@prisma/client";

@Controller("database")
export class DatabaseController {
    constructor (private prisma: DatabaseService) {}

    @Get('/')
    async testRead(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    @Post('/')
    async testCreate(): Promise<void> {
        await this.prisma.product.create({
            data: {
                url: "https:/sigma",
                name: "sigma",

                currentPrice: 10.2,
                targetPrice: 10,

                priceSelector: ".price",

                isActive: true,
            }
        })
    }
}
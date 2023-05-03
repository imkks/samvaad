import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormconfig:TypeOrmModuleOptions={
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: 'krishna',
    password: '1234',
    database: 'samvaaddb',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    logging:["error","query"]
}
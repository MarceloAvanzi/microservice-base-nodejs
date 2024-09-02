import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG_SCHEMA_TYPE } from '../config/config.module';
import { CategorySchema } from 'src/@core/domain/category/category.schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const dbVendor = configService.get('DB_VENDOR');

        if (dbVendor === 'sqlite') {
          return {
            type: 'sqlite',
            database: configService.get('DB_HOST'),
            entities: [CategorySchema],
            logging: configService.get('DB_LOGGING'),
            synchronize: configService.get('DB_SYNCHRONIZE'),
            autoLoadEntities: configService.get('DB_AUTO_LOAD_MODELS'),
          };
        }

        if (dbVendor === 'postgres') {
          return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities: [__dirname + '/**/*.schema{.ts,.js}'],
            synchronize: configService.get('DB_SYNCHRONIZE'),
            autoLoadEntities: configService.get('DB_AUTO_LOAD_MODELS'),
            logging: configService.get('DB_LOGGING'),
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        throw new Error(`Unsupported database configuration: ${dbVendor}`);
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

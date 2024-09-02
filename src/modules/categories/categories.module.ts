import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySchema } from 'src/@core/domain/category/category.schema';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './categories.providers';

@Module({
  imports: [TypeOrmModule.forFeature([CategorySchema])],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}

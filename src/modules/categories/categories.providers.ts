import { CreateCategoryUseCase } from 'src/@core/application/use-cases/create-category/create-category.use-case';
import { ListCategoryUseCase } from 'src/@core/application/use-cases/list-category/list-category.use-case';
import { ICategoryRepository } from 'src/@core/domain/category/category.repository';
import { CategorySchema } from 'src/@core/domain/category/category.schema';
import { CategoryInMemoryRepository } from 'src/@core/infra/db/in-memory/category-in-memory.repository';
import { CategoryTypeOrmRepository } from 'src/@core/infra/db/typeorm/category-typeorm.repository';
import { DataSource } from 'typeorm';

export const REPOSITORIES = {
  CATEGORY_REPOSITORY: {
    provide: 'CategoryRepository',
    useExisting: CategoryTypeOrmRepository,
  },
  CATEGORY_IN_MEMORY_REPOSITORY: {
    provide: CategoryInMemoryRepository,
    useClass: CategoryInMemoryRepository,
  },
  CATEGORY_TYPEORM_REPOSITORY: {
    provide: CategoryTypeOrmRepository,
    useFactory: (dataSource: DataSource) =>
      new CategoryTypeOrmRepository(dataSource.getRepository(CategorySchema)),
    inject: [DataSource],
  },
};

export const USE_CASES = {
  CREATE_CATEGORY_USE_CASE: {
    provide: CreateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new CreateCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  LIST_CATEGORY_USE_CASE: {
    provide: ListCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new ListCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
};

export const CATEGORY_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};

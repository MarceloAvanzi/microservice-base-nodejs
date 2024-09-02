import { IRepository } from 'src/infra/repository/repository-interface';
import { Category } from './category.entity';

export interface ICategoryRepository extends IRepository<Category> {}

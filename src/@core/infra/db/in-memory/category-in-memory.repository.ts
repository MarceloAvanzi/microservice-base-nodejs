import { Category } from 'src/@core/domain/category/category.entity';
import { ICategoryRepository } from 'src/@core/domain/category/category.repository';
import { InMemoryRepository } from 'src/infra/database/in-memory/in-memory.repository';

export class CategoryInMemoryRepository
  extends InMemoryRepository<Category>
  implements ICategoryRepository
{
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}

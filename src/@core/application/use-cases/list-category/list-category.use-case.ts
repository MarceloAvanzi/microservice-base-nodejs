import { Category } from 'src/@core/domain/category/category.entity';
import { ICategoryRepository } from 'src/@core/domain/category/category.repository';

export class ListCategoryUseCase {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute() {
    const categories = await this.categoryRepo.findAll();

    return categories.map((entity) => new Category(entity).toJSON());
  }
}

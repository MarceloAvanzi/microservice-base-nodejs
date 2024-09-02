import { Category } from 'src/@core/domain/category/category.entity';
import { ICategoryRepository } from 'src/@core/domain/category/category.repository';
import { CreateCategoryInput } from './create-category.input';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: CreateCategoryInput) {
    const entity = Category.create(input);

    await this.categoryRepo.insert(entity);

    return new Category(entity).toJSON();
  }
}

import { CategoryInMemoryRepository } from 'src/@core/infra/db/in-memory/category-in-memory.repository';
import { ListCategoryUseCase } from '../../list-category.use-case';
import { Category } from 'src/@core/domain/category/category.entity';

describe('ListCategoryUseCase Unit Tests', () => {
  let useCase: ListCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoryUseCase(repository);
  });

  it('should list categories', async () => {
    const items = [
      Category.fake().aCategory().withName('a').build(),
      Category.fake().aCategory().withName('AAA').build(),
      Category.fake().aCategory().withName('AaA').build(),
      Category.fake().aCategory().withName('b').build(),
      Category.fake().aCategory().withName('c').build(),
    ];

    repository.items = items;

    const categories = await useCase.execute();

    expect(categories).toHaveLength(5);
  });
});

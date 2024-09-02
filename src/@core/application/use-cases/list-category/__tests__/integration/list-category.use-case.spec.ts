import { CategorySchema } from 'src/@core/domain/category/category.schema';
import { CategoryTypeOrmRepository } from 'src/@core/infra/db/typeorm/category-typeorm.repository';
import { DataSource } from 'typeorm';
import { ListCategoryUseCase } from '../../list-category.use-case';
import { Category } from 'src/@core/domain/category/category.entity';

describe('ListCategoryUseCase Integration Tests', () => {
  let useCase: ListCategoryUseCase;
  let repository: CategoryTypeOrmRepository;
  let _dataSource: DataSource;

  beforeAll(async () => {
    _dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      synchronize: true,
      entities: [CategorySchema],
    });

    await _dataSource.initialize();
  });

  beforeEach(async () => {
    await _dataSource.synchronize(true);

    repository = new CategoryTypeOrmRepository(
      _dataSource.getRepository(CategorySchema),
    );

    useCase = new ListCategoryUseCase(repository);
  });

  afterAll(async () => await _dataSource.destroy());

  it('should list categories', async () => {
    const items = Category.fake()
      .theCategories(5)
      .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
      .build();

    await repository.bulkInsert(items);

    const categories = await useCase.execute();

    expect(categories).toHaveLength(5);
  });
});

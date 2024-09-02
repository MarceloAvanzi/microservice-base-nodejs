import { CategorySchema } from 'src/@core/domain/category/category.schema';
import { CategoryTypeOrmRepository } from 'src/@core/infra/db/typeorm/category-typeorm.repository';
import { DataSource } from 'typeorm';
import { CreateCategoryUseCase } from '../../create-category.use-case';

describe('CreateCategoryUseCase Integration Tests', () => {
  let useCase: CreateCategoryUseCase;
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

    useCase = new CreateCategoryUseCase(repository);
  });

  afterAll(async () => await _dataSource.destroy());

  it('should create a category', async () => {
    let output = await useCase.execute({ name: 'test' });
    let entity = await repository.findById(output.category_id);

    expect(output).toStrictEqual({
      category_id: entity.category_id.id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

    output = await useCase.execute({
      name: 'test',
      description: 'some description',
      is_active: false,
    });

    entity = await repository.findById(output.category_id);

    expect(output).toStrictEqual({
      category_id: entity.category_id.id,
      name: 'test',
      description: 'some description',
      is_active: false,
      created_at: entity.created_at,
    });
  });
});

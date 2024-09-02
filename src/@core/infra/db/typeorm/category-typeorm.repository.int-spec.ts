import { Category } from 'src/@core/domain/category/category.entity';
import { CategorySchema } from 'src/@core/domain/category/category.schema';
import { DataSource } from 'typeorm';
import { CategoryTypeOrmRepository } from './category-typeorm.repository';
import { Uuid } from 'src/infra/value-objects/uuid.vo';
import { NotFoundEntityError } from 'src/infra/errors/not-found-entity.error';

describe('CategoryTypeOrmRepository Integration Test', () => {
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
  });

  afterAll(async () => await _dataSource.destroy());

  it('should inserts a new entity', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);

    const model = await repository.findById(category.category_id.id);

    expect(model.toJSON()).toMatchObject({
      category_id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    });
  });

  it('should return an entity by id', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);

    const model = await repository.findById(category.category_id.id);

    expect(model.toJSON()).toMatchObject({
      category_id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    });
  });

  it('should return an entity by field', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);

    const model = await repository.findByField('name', category.name);

    expect(model.toJSON()).toMatchObject({
      category_id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    });
  });

  it('should return null if entity field does not exist', async () => {
    const model = await repository.findByField('name', 'not exists');

    expect(model).toBeNull();
  });

  it('should return all entities', async () => {
    const categories = Category.fake().theCategories(3).build();

    await repository.bulkInsert(categories);

    const models = await repository.findAll();

    expect(models).toHaveLength(3);
  });

  it('should update an entity', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);

    category.changeName('new name');
    category.changeDescription('new description');
    category.activate();

    await repository.update(category);

    const model = await repository.findById(category.category_id.id);

    expect(model.toJSON()).toMatchObject({
      category_id: category.category_id.id,
      name: 'new name',
      description: 'new description',
      is_active: true,
      created_at: category.created_at,
    });
  });

  it('should not update an entity if it does not exist', async () => {
    const noExistsCategory = Category.fake().aCategory().build();

    expect(repository.update(noExistsCategory)).rejects.toThrow();
  });

  it('should delete an entity', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);

    await repository.delete(category.category_id.id);

    const model = await repository.findById(category.category_id.id);

    expect(model).toBeNull();
  });

  it('should not delete an entity if it does not exist', async () => {
    const categoryId = new Uuid();

    await expect(repository.delete(categoryId.id)).rejects.toThrow(
      new NotFoundEntityError(categoryId.id, Category),
    );
  });

  it('should return getEntity', async () => {
    const entity = repository.getEntity();
    expect(entity).toBe(Category);
  });
});

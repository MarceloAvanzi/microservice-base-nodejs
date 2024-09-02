import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/@core/domain/category/category.entity';
import { ICategoryRepository } from 'src/@core/domain/category/category.repository';
import { CategorySchema } from 'src/@core/domain/category/category.schema';
import { Repository } from 'typeorm';
import { CategoryModelMapper } from './category-model-mapper';
import { NotFoundEntityError } from 'src/infra/errors/not-found-entity.error';

export class CategoryTypeOrmRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<CategorySchema>,
  ) {}

  private async _get(id: string) {
    return await this.repository.findOneBy({ category_id: id });
  }

  async insert(entity: Category): Promise<void> {
    const model = CategoryModelMapper.toModel(entity);

    await this.repository.save(model);
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    const models = entities.map((entity) =>
      CategoryModelMapper.toModel(entity),
    );

    await this.repository.save(models);
  }

  async update(entity: Category): Promise<void> {
    const id = entity.category_id.id;
    const model = await this._get(id);

    if (!model) {
      throw new NotFoundEntityError(id, Category);
    }

    const updatedModel = CategoryModelMapper.toModel(entity);

    await this.repository.update(model, updatedModel);
  }
  async delete(entity_id: string): Promise<void> {
    const model = await this._get(entity_id);

    if (!model) {
      throw new NotFoundEntityError(entity_id, Category);
    }

    await this.repository.delete(model);
  }

  async findById(entity_id: string): Promise<Category | null> {
    const model = await this._get(entity_id);

    if (!model) {
      return null;
    }

    return CategoryModelMapper.toEntity(model);
  }

  async findByField(field: string, value: any): Promise<Category | null> {
    const model = await this.repository.findOneBy({ [field]: value });

    if (!model) {
      return null;
    }

    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.repository.find();

    return models.map((model) => CategoryModelMapper.toEntity(model));
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}

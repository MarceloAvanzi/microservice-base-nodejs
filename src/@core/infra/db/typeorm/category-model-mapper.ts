import { CategorySchema } from 'src/@core/domain/category/category.schema';
import { Category } from 'src/@core/domain/category/category.entity';
import { Uuid } from 'src/infra/value-objects/uuid.vo';

export class CategoryModelMapper {
  static toModel(entity: Category): CategorySchema {
    const category = new CategorySchema();
    category.category_id = entity.category_id.id;
    category.name = entity.name;
    category.description = entity.description;
    category.is_active = entity.is_active;
    category.created_at = entity.created_at;

    return category;
  }

  static toEntity(model: CategorySchema): Category {
    const entity = new Category({
      category_id: new Uuid(model.category_id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at,
    });

    // Category.validate(entity);

    return entity;
  }
}

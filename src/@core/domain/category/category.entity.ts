import { ValueObject } from 'src/infra/value-object';
import { Uuid } from 'src/infra/value-objects/uuid.vo';
import { Entity as EntityInterface } from '../../../infra/entity';
import { CategoryFakeBuilder } from './category-fake.builder';

export type CategoryConstructorProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends EntityInterface {
  category_id: Uuid;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: Date;

  get entity_id(): ValueObject {
    return this.category_id;
  }

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: CategoryConstructorProps): Category {
    return new Category(props);
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }

  changeName(name: string) {
    this.name = name;
  }

  changeDescription(description: string) {
    this.description = description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  static fake() {
    return CategoryFakeBuilder;
  }
}

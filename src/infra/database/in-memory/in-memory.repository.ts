import { Entity } from 'src/infra/entity';
import { NotFoundEntityError } from 'src/infra/errors/not-found-entity.error';
import { IRepository } from 'src/infra/repository/repository-interface';
import { Uuid } from 'src/infra/value-objects/uuid.vo';

export abstract class InMemoryRepository<E extends Entity>
  implements IRepository<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entity_id.equals(entity.entity_id),
    );

    if (indexFound === -1) {
      throw new NotFoundEntityError(entity.entity_id, this.getEntity());
    }

    this.items[indexFound] = entity;
  }

  async delete(entity_id: string): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entity_id.equals(new Uuid(entity_id)),
    );

    if (indexFound === -1) {
      throw new NotFoundEntityError(entity_id, this.getEntity());
    }

    this.items.splice(indexFound, 1);
  }

  async findById(entity_id: string): Promise<E> {
    const item = this.items.find((item) =>
      item.entity_id.equals(new Uuid(entity_id)),
    );
    return typeof item === 'undefined' ? null : item;
  }

  async findByField(field: string, value: any): Promise<E | null> {
    const item = this.items.find((item) => item[field] === value);
    return typeof item === 'undefined' ? null : item;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;
}

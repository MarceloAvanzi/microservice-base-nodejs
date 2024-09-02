import { Entity } from '../entity';

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: string): Promise<void>;

  findById(entity_id: string): Promise<E | null>;
  findByField(field: string, value: any): Promise<E | null>;
  findAll(): Promise<E[]>;

  getEntity(): new (...args: any[]) => E;
}

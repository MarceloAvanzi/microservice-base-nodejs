import { Uuid } from 'src/infra/value-objects/uuid.vo';
import { InMemoryRepository } from './in-memory.repository';
import { Entity } from 'src/infra/entity';
import { NotFoundEntityError } from 'src/infra/errors/not-found-entity.error';

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it('should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 100,
    });

    await repo.insert(entity);

    expect(repo.items).toHaveLength(1);
    expect(repo.items[0]).toBe(entity);
  });

  it('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({ name: 'Test 1', price: 100 }),
      new StubEntity({ name: 'Test 2', price: 200 }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items).toHaveLength(2);
    expect(repo.items).toEqual(entities);
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });

    await repo.insert(entity);

    entity.name = 'Updated Test';
    entity.price = 200;

    await repo.update(entity);

    expect(repo.items).toHaveLength(1);
    expect(repo.items[0]).toBe(entity);
  });

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });

    await repo.insert(entity);

    await repo.delete(entity.entity_id.id);

    expect(repo.items).toHaveLength(0);
  });

  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });

    await repo.insert(entity);

    const foundEntity = await repo.findById(entity.entity_id.id);

    expect(foundEntity).toBe(entity);
  });

  it('should find an entity by field', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });

    await repo.insert(entity);

    const foundEntity = await repo.findByField('name', 'Test');

    expect(foundEntity).toBe(entity);
  });

  it('should find all entities', async () => {
    const entities = [
      new StubEntity({ name: 'Test 1', price: 100 }),
      new StubEntity({ name: 'Test 2', price: 200 }),
    ];

    await repo.bulkInsert(entities);

    const foundEntities = await repo.findAll();

    expect(foundEntities).toHaveLength(2);
    expect(foundEntities).toEqual(entities);
  });

  it('should return null when entity is not found by id', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });

    await repo.insert(entity);

    const foundEntity = await repo.findById(new Uuid().id);

    expect(foundEntity).toBeNull();
  });

  it('should throws errors on delete when entity is not found', async () => {
    const uuid = new Uuid();

    await expect(repo.delete(uuid.id)).rejects.toThrow(
      new NotFoundEntityError(uuid, StubEntity),
    );
  });

  it('should throws errors on update when entity is not found', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundEntityError(entity.entity_id, StubEntity),
    );
  });
});

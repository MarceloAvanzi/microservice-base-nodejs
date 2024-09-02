import { CategoryInMemoryRepository } from './category-in-memory.repository';

describe('CategoryInMemoryRepository', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should return a new instance of Category', () => {
    expect(repository.getEntity()).toBeInstanceOf(Function);
  });
});

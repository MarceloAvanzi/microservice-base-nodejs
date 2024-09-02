import { Uuid } from 'src/infra/value-objects/uuid.vo';
import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  it('should create a category entity', () => {
    const category = new Category({
      name: 'Movie',
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it('should create a category entity with description', () => {
    const created_at = new Date();

    const category = new Category({
      name: 'Movie',
      description: 'Movie description',
      is_active: false,
      created_at,
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBe(created_at);
  });

  it('should change category name', () => {
    const category = Category.create({
      name: 'Movie',
    });

    category.changeName('Anime');
    expect(category.name).toBe('Anime');
  });

  it('should change category description', () => {
    const category = Category.create({
      name: 'Movie',
    });

    category.changeDescription('Movie description');

    expect(category.description).toBe('Movie description');
  });

  it('should activate category', () => {
    const category = Category.create({
      name: 'Movie',
      is_active: false,
    });

    expect(category.is_active).toBeFalsy();

    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  it('should deactivate category', () => {
    const category = Category.create({
      name: 'Movie',
    });

    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });

  it('should return category JSON', () => {
    const created_at = new Date();

    const category = Category.create({
      name: 'Movie',
      description: 'Movie description',
      is_active: false,
      created_at,
    });

    expect(category.toJSON()).toEqual({
      category_id: category.category_id.id,
      name: 'Movie',
      description: 'Movie description',
      is_active: false,
      created_at,
    });
  });

  it('should create a category using static method', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'Movie description',
      is_active: false,
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it('should create a category using static method without description', () => {
    const category = Category.create({
      name: 'Movie',
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it('should create a category using static method without is_active', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'Movie description',
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it('should create a category using static method without created_at', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'Movie description',
      is_active: false,
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('Movie description');
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  describe('category_id field', () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        category_id: category_id as any,
        name: 'Movie',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id.id).toBe(category_id.id);
      }
    });
  });
});

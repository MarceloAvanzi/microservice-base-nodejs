import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { ConfigModule } from 'src/infra/config/config.module';
import { EntityManager } from 'typeorm';

describe('DatabaseModule Unit Tests', () => {
  describe('sqlite connection', () => {
    const connOptions = {
      DB_VENDOR: 'sqlite',
      DB_HOST: ':memory:',
      DB_LOGGING: false,
      DB_AUTO_LOAD_MODELS: true,
    };

    it.only('should be a sqlite connection', async () => {
      const module = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            validationSchema: null,
            load: [() => connOptions],
          }),
        ],
      }).compile();

      const app = module.createNestApplication();

      await app.init();

      const entityManager = app.get<EntityManager>(getEntityManagerToken());
      expect(entityManager).toBeDefined();
      expect(entityManager.connection.options.type).toBe('sqlite');
      expect(entityManager.connection.options.database).toBe(':memory:');
      await entityManager.connection.destroy();
    });
  });

  it.todo('should be a postgres connection');
});

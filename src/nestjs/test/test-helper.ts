import InMemoryGenreRepository from '../../infra/genre/repositories/in-memory/in-memory-genre.repository';
import { GenreService } from '../domain/genre/services/genre.service';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const genreServiceMockFactory: () => MockType<GenreService> = jest.fn(
  () => ({
    create: jest.fn((entity) => entity),
    findAll: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    remove: jest.fn((entity) => entity),
    findByName: jest.fn((entity) => entity),
  }),
);

export const genreRepositoryMockFactory: () => MockType<InMemoryGenreRepository> =
  jest.fn(() => ({
    create: jest.fn((entity) => entity),
    findAll: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    findByName: jest.fn((entity) => entity),
  }));

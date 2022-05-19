import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Genre } from '../../../../domain/genre/entities/genre.entity';
import InMemoryGenreRepository from '../../../../infra/genre/repositories/in-memory/in-memory-genre.repository';
import { GenreService } from './genre.service';

describe('GenreService', () => {
  let service: GenreService;
  let repository: InMemoryGenreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreService, InMemoryGenreRepository],
    }).compile();

    service = module.get<GenreService>(GenreService);
    repository = module.get<InMemoryGenreRepository>(InMemoryGenreRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not create a genre if name already exists', () => {
      expect(() => {
        const genre = new Genre({ id: '1', name: 'Genre 1' });
        jest.spyOn(repository, 'findByName').mockReturnValue(genre);

        service.create({ name: 'Genre 1' });
      }).toThrow(new BadRequestException('This genre already exists'));
    });

    it('should create a genre', () => {
      expect(repository.findAll()).toHaveLength(0);
      jest.spyOn(service, 'create');
      service.create({ name: 'Genre 1' });
      expect(service.create).toBeCalledTimes(1);
      expect(repository.findAll()).toHaveLength(1);
    });
  });

  describe('findAll', () => {
    it('should return an empty list if no one genre exists', () => {
      const genres = [] as Genre[];

      jest.spyOn(repository, 'findAll').mockReturnValue(genres);
      expect(service.findAll()).toStrictEqual(genres);
    });

    it('should find all genres', () => {
      const genres = [
        { id: '1', name: 'Genre 1' },
        { id: '2', name: 'Genre 2' },
        { id: '3', name: 'Genre 3' },
      ] as Genre[];

      jest.spyOn(repository, 'findAll').mockReturnValue(genres);
      expect(service.findAll()).toStrictEqual(genres);
    });
  });

  describe('findById', () => {
    it('should return undefined if genre does not exists', () => {
      jest.spyOn(repository, 'findById').mockReturnValue(undefined);
      expect(service.findOne('1')).toStrictEqual(undefined);
    });

    it('should find a genre by id', () => {
      const genre = new Genre({ id: '1', name: 'Genre 1' });

      jest.spyOn(repository, 'findById').mockReturnValue(genre);

      expect(service.findOne('1')).toStrictEqual(genre);
    });
  });

  describe('update', () => {
    it('should not update a genre if id is invalid', () => {
      jest.spyOn(repository, 'findById').mockReturnValue(undefined);

      expect(() => {
        service.update('1', { name: 'Genre 2' });
      }).toThrow(new BadRequestException('This genre does not exists'));
    });

    it('should update a genre', () => {
      const id = '1';
      const genre1 = new Genre({ id, name: 'Genre 1' });
      const genre2 = new Genre({ id, name: 'Genre 2' });
      jest.clearAllMocks();
      jest.spyOn(repository, 'findById').mockReturnValue(genre1);

      service.update(id, { name: 'Genre 2' });

      expect(service.findOne(id)).toStrictEqual(genre2);
    });
  });

  describe('remove', () => {
    it('should not delete a genre if id is invalid', () => {
      jest.spyOn(repository, 'findById').mockReturnValue(undefined);

      expect(() => {
        service.remove('1');
      }).toThrow(new BadRequestException('This genre does not exists'));
    });

    it('should delete a genre', () => {
      expect(repository.findAll()).toHaveLength(0);
      repository.create({ name: 'Genre 1' });
      const genres = repository.findAll();
      expect(genres).toHaveLength(1);

      jest.spyOn(repository, 'findById').mockReturnValue(genres[0]);

      repository.delete(genres[0].id);

      const updatedGenres = repository.findAll();
      expect(updatedGenres).toHaveLength(0);
    });
  });

  describe('findByName', () => {
    it('should find a genre by name', () => {
      expect(repository.findAll()).toHaveLength(0);
      repository.create({ name: 'Genre 1' });
      expect(repository.findAll()).toHaveLength(1);
      const genres = repository.findAll();

      expect(service.findByName('Genre 1')).toStrictEqual(genres[0]);
    });
  });
});

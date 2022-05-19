import { Genre } from '../../../../domain/genre/entities/genre.entity';
import InMemoryGenreRepository from './in-memory-genre.repository';

describe('InMemoryGenreRepository Unit Tests', () => {
  let genreRepository: InMemoryGenreRepository;
  beforeEach(() => {
    genreRepository = new InMemoryGenreRepository();
  });

  describe('create', () => {
    it('should create a genre', () => {
      expect(genreRepository.findAll()).toHaveLength(0);

      jest.spyOn(genreRepository, 'create');
      genreRepository.create({ name: 'Genre 1' });

      expect(genreRepository.create).toBeCalledTimes(1);
      expect(genreRepository.findAll()).toHaveLength(1);
    });
  });

  describe('findAll', () => {
    it('should return an empty list if no one genre exists', () => {
      expect(genreRepository.findAll()).toHaveLength(0);
      expect(genreRepository.findAll()).toStrictEqual([] as Genre[]);
    });

    it('should find all genres', () => {
      genreRepository.create({ name: 'Genre 1' });
      genreRepository.create({ name: 'Genre 2' });
      genreRepository.create({ name: 'Genre 3' });

      expect(genreRepository.findAll()).toHaveLength(3);
    });
  });

  describe('findById', () => {
    it('should return undefined if genre does not exists', () => {
      expect(genreRepository.findAll()).toHaveLength(0);

      genreRepository.create({ name: 'Genre 1' });
      expect(genreRepository.findAll()).toHaveLength(1);

      expect(genreRepository.findById('1')).toStrictEqual(undefined);
    });

    it('should find a genre by id', () => {
      expect(genreRepository.findAll()).toHaveLength(0);
      genreRepository.create({ name: 'Genre 1' });
      expect(genreRepository.findAll()).toHaveLength(1);
      const genres = genreRepository.findAll();

      expect(genreRepository.findById(genres[0].id)).toStrictEqual(genres[0]);
    });
  });

  describe('update', () => {
    it('should not update a genre if id is invalid', () => {
      expect(genreRepository.findAll()).toHaveLength(0);
      genreRepository.create({ name: 'Genre 1' });
      const genres = genreRepository.findAll();
      expect(genres).toHaveLength(1);

      jest.spyOn(genreRepository, 'update');
      genreRepository.update('1', { name: 'Genre 2' });
      expect(genreRepository.update).toBeCalledTimes(1);

      const updatedGenres = genreRepository.findAll();
      expect(updatedGenres[0].name).toBe('Genre 1');
    });

    it('should update a genre', () => {
      expect(genreRepository.findAll()).toHaveLength(0);
      genreRepository.create({ name: 'Genre 1' });
      const genres = genreRepository.findAll();
      expect(genres).toHaveLength(1);

      jest.spyOn(genreRepository, 'update');
      genreRepository.update(genres[0].id, { name: 'Genre 2' });
      expect(genreRepository.update).toBeCalledTimes(1);

      const updatedGenres = genreRepository.findAll();
      expect(updatedGenres[0].name).toBe('Genre 2');
    });
  });

  describe('delete', () => {
    it('should not delete a genre if id is invalid', () => {
      expect(genreRepository.findAll()).toHaveLength(0);
      genreRepository.create({ name: 'Genre 1' });
      const genres = genreRepository.findAll();
      expect(genres).toHaveLength(1);

      genreRepository.delete('1');

      const updatedGenres = genreRepository.findAll();
      expect(updatedGenres).toHaveLength(1);
    });

    it('should delete a genre', () => {
      expect(genreRepository.findAll()).toHaveLength(0);
      genreRepository.create({ name: 'Genre 1' });
      const genres = genreRepository.findAll();
      expect(genres).toHaveLength(1);

      genreRepository.delete(genres[0].id);

      const updatedGenres = genreRepository.findAll();
      expect(updatedGenres).toHaveLength(0);
    });
  });

  describe('findByName', () => {
    it('should return undefined if genre does not exists', () => {
      expect(genreRepository.findAll()).toHaveLength(0);

      genreRepository.create({ name: 'Genre 1' });
      expect(genreRepository.findAll()).toHaveLength(1);

      expect(genreRepository.findByName('Genre 2')).toStrictEqual(undefined);
    });

    it('should find a genre by name', () => {
      expect(genreRepository.findAll()).toHaveLength(0);
      genreRepository.create({ name: 'Genre 1' });
      expect(genreRepository.findAll()).toHaveLength(1);
      const genres = genreRepository.findAll();

      expect(genreRepository.findByName('Genre 1')).toStrictEqual(genres[0]);
    });
  });
});

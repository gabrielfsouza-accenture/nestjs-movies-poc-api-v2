import { Genre } from '../../../../domain/genre/entities/genre.entity';
import InMemoryGenreRepository from './in-memory-genre.repository';

describe('InMemoryGenreRepository Unit Tests', () => {
  let genreRepository: InMemoryGenreRepository;
  beforeEach(() => {
    genreRepository = new InMemoryGenreRepository();
  });

  describe('create', () => {
    it('should create a genre', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);

      jest.spyOn(genreRepository, 'create');
      await genreRepository.create({ name: 'Genre 1' });

      expect(genreRepository.create).toBeCalledTimes(1);
      expect(await genreRepository.findAll()).toHaveLength(1);
    });
  });

  describe('findAll', () => {
    it('should return an empty list if no one genre exists', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);
      expect(await genreRepository.findAll()).toStrictEqual([] as Genre[]);
    });

    it('should find all genres', async () => {
      await genreRepository.create({ name: 'Genre 1' });
      await genreRepository.create({ name: 'Genre 2' });
      await genreRepository.create({ name: 'Genre 3' });

      expect(await genreRepository.findAll()).toHaveLength(3);
    });
  });

  describe('findById', () => {
    it('should return undefined if genre does not exists', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);

      await genreRepository.create({ name: 'Genre 1' });
      expect(await genreRepository.findAll()).toHaveLength(1);

      expect(await genreRepository.findById('1')).toStrictEqual(undefined);
    });

    it('should find a genre by id', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);
      await genreRepository.create({ name: 'Genre 1' });
      expect(await genreRepository.findAll()).toHaveLength(1);
      const genres = await genreRepository.findAll();

      expect(await genreRepository.findById(genres[0].id)).toStrictEqual(
        genres[0],
      );
    });
  });

  describe('update', () => {
    it('should not update a genre if id is invalid', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);
      await genreRepository.create({ name: 'Genre 1' });
      const genres = await genreRepository.findAll();
      expect(genres).toHaveLength(1);

      jest.spyOn(genreRepository, 'update');
      await genreRepository.update('1', { name: 'Genre 2' });
      expect(genreRepository.update).toBeCalledTimes(1);

      const updatedGenres = await genreRepository.findAll();
      expect(updatedGenres[0].name).toBe('Genre 1');
    });

    it('should update a genre', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);
      await genreRepository.create({ name: 'Genre 1' });
      const genres = await genreRepository.findAll();
      expect(genres).toHaveLength(1);

      jest.spyOn(genreRepository, 'update');
      await genreRepository.update(genres[0].id, { name: 'Genre 2' });
      expect(genreRepository.update).toBeCalledTimes(1);

      const updatedGenres = await genreRepository.findAll();
      expect(updatedGenres[0].name).toBe('Genre 2');
    });
  });

  describe('delete', () => {
    it('should not delete a genre if id is invalid', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);
      await genreRepository.create({ name: 'Genre 1' });
      const genres = await genreRepository.findAll();
      expect(genres).toHaveLength(1);

      await genreRepository.delete('1');

      const updatedGenres = await genreRepository.findAll();
      expect(updatedGenres).toHaveLength(1);
    });

    it('should delete a genre', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);
      await genreRepository.create({ name: 'Genre 1' });
      const genres = await genreRepository.findAll();
      expect(genres).toHaveLength(1);

      await genreRepository.delete(genres[0].id);

      const updatedGenres = await genreRepository.findAll();
      expect(updatedGenres).toHaveLength(0);
    });
  });

  describe('findByName', () => {
    it('should return undefined if genre does not exists', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);

      await genreRepository.create({ name: 'Genre 1' });
      expect(await genreRepository.findAll()).toHaveLength(1);

      expect(await genreRepository.findByName('Genre 2')).toStrictEqual(
        undefined,
      );
    });

    it('should find a genre by name', async () => {
      expect(await genreRepository.findAll()).toHaveLength(0);
      await genreRepository.create({ name: 'Genre 1' });
      expect(await genreRepository.findAll()).toHaveLength(1);
      const genres = await genreRepository.findAll();

      expect(await genreRepository.findByName('Genre 1')).toStrictEqual(
        genres[0],
      );
    });
  });
});

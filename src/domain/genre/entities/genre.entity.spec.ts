import { BadRequestException } from '@nestjs/common';
import { Genre } from './genre.entity';

describe('Genre Unit Tests', () => {
  it('should trhow an error when name is not provided', () => {
    expect(() => {
      new Genre({
        name: '',
      });
    }).toThrowError(new BadRequestException('Name is required'));
  });

  it('should create a genre', () => {
    const genre = new Genre({
      name: 'Genre 1',
    });

    expect(genre.id).toBeDefined();
    expect(genre.name).toBe('Genre 1');
  });
});

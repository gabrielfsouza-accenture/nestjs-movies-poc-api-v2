import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Genre } from 'src/domain/genre/entities/genre.entity';
import InMemoryGenreRepository from 'src/infra/genre/repositories/in-memory/in-memory-genre.repository';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { UpdateGenreDto } from '../dtos/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @Inject(InMemoryGenreRepository)
    private genreRepository: InMemoryGenreRepository,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<void> {
    const genreFound = await this.genreRepository.findByName(
      createGenreDto.name,
    );

    if (genreFound) throw new BadRequestException('This genre already exists');

    return this.genreRepository.create(createGenreDto);
  }

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.findAll();
  }

  async findOne(id: string): Promise<Genre | undefined> {
    return this.genreRepository.findById(id);
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<void> {
    const genreFound = await this.genreRepository.findById(id);

    if (!genreFound)
      throw new BadRequestException('This genre does not exists');

    await this.genreRepository.update(id, updateGenreDto);
  }

  async remove(id: string): Promise<void> {
    const genreFound = await this.genreRepository.findById(id);

    if (!genreFound)
      throw new BadRequestException('This genre does not exists');

    return this.genreRepository.delete(id);
  }

  async findByName(name: string): Promise<Genre | undefined> {
    return this.genreRepository.findByName(name);
  }
}

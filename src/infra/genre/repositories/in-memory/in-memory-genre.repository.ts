import RepositoryInterface from 'src/domain/@shared/repositories/repository.interface';
import { CreateGenreDto } from 'src/nestjs/genre/dtos/create-genre.dto';
import { UpdateGenreDto } from 'src/nestjs/genre/dtos/update-genre.dto';
import { Genre } from 'src/domain/genre/entities/genre.entity';

export default class InMemoryGenreRepository
  implements RepositoryInterface<Genre, CreateGenreDto, UpdateGenreDto>
{
  private genres: Genre[];

  constructor() {
    this.genres = [];
  }

  async create(props: CreateGenreDto): Promise<void> {
    const genre = new Genre({ name: props.name });

    this.genres.push(genre);
  }

  async findAll(): Promise<Genre[]> {
    return this.genres;
  }

  async findById(id: string): Promise<Genre> {
    return this.genres.find((genre) => genre.id === id);
  }

  async update(id: string, props: UpdateGenreDto): Promise<void> {
    const genreFound = await this.findById(id);

    if (genreFound) {
      genreFound.name = props.name;
    }
  }

  async delete(id: string): Promise<void> {
    const genreIndexFound = this.genres.findIndex((genre) => genre.id === id);
    if (genreIndexFound !== -1) this.genres.splice(genreIndexFound, 1);
  }

  async findByName(name: string): Promise<Genre | undefined> {
    return this.genres.find((genre) => genre.name === name);
  }
}

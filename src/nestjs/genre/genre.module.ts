import { Module } from '@nestjs/common';
import InMemoryGenreRepository from '../../infra/genre/repositories/in-memory/in-memory-genre.repository';
import { GenreController } from './controllers/genre.controller';
import { GenreService } from './services/genre.service';

@Module({
  controllers: [GenreController],
  providers: [GenreService, InMemoryGenreRepository],
  exports: [GenreService],
})
export class GenreModule {}

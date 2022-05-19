import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenreModule } from './domain/genre/genre.module';

@Module({
  imports: [GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

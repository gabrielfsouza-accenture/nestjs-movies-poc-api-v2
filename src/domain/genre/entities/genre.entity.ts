import { BadRequestException } from '@nestjs/common';
import Entity from 'src/domain/@shared/entities/entity';

interface GenreProps {
  id?: string;
  name: string;
}

export class Genre extends Entity {
  name: string;

  constructor(props: GenreProps) {
    super(props.id);
    this.name = props.name;

    this.validate();
  }

  private validate() {
    if (!this.name) throw new BadRequestException('Name is required');
  }
}

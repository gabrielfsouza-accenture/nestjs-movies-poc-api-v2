import { v4 as uuidv4 } from 'uuid';

export default class Entity {
  id: string;

  constructor(id?: string) {
    this.id = id ?? uuidv4();
  }
}

import { validate } from 'uuid';

export class ID {
  private readonly id: string;

    constructor(id: string) {
    if (!id) {
      throw new Error("ID is required and cannot be empty.");
    }

    if (!validate(id)) {
      throw new Error("Invalid ID.");
    }

    this.id = id;
  }

  getValue(): string {
    return this.id;
  }
}
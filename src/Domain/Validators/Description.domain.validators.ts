export class Description {
  private readonly description: string;

    constructor(description: string) {
    if (!description) {
      throw new Error("Description is required and cannot be empty.");
    }

    this.description = description;
  }

  getValue(): string {
    return this.description;
  }
}
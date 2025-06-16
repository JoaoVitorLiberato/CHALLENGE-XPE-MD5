export class Name {
  private readonly name: string;

  constructor(name: string) {
    if (!name) {
      throw new Error("Name is required and cannot be empty.");
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
      throw new Error("Name can only contain letters and spaces");
    }

    this.name = name;
  }

  getValue(): string {
    return this.name;
  }
}
export class CategoryEntity {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly id?: string,
  ) {}
}

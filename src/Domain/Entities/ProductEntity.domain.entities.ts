export class ProductEntity {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
    public readonly categoryId: string,
    public readonly image?: string,
    public readonly id?: string,
  ) {}
}

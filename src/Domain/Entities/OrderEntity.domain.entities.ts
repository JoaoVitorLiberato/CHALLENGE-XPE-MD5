export class OrderEntity {
  constructor(
    public readonly clientId: string,
    public readonly status: string,
    public readonly total: number,
    public readonly items: Array<{
      id: string,
      name: string,
      quantity: number,
      price: number,
    }>,
    public readonly id?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}

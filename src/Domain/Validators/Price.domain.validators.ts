export class Price {
  private readonly price: number;

  constructor(price: number) {
    if (!price) {
      throw new Error("Price is required and cannot be empty.");
    }

    if (typeof price !== "number") {
      throw new Error("Price must be a integer number.");
    }

    this.price = price;
  }

  getValue(): number {
    return this.price;
  }
}
export class Quantity {
  private readonly quantity: number;

  constructor(quantity: number) {
    if (!quantity) {
      throw new Error("Quantity is required and cannot be empty.");
    }

    if (typeof quantity !== "number") {
      throw new Error("Quantity must be a integer number.");
    }

    if (quantity === 0) {
      throw new Error("Quantity must be greater than 0.");
    }

    this.quantity = quantity;
  }

  getValue(): number {
    return this.quantity;
  }
}
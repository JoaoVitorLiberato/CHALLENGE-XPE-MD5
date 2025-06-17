export class Status {
  private readonly status: string;

  constructor(status: string) {
    if (!status) {
      throw new Error("Status is required and cannot be empty.");
    }

    if (!["pending", "paid", "canceled"].includes(status)) {
      throw new Error("Status is invalid.");
    }

    this.status = status;
  }

  getValue(): string {
    return this.status;
  }
}

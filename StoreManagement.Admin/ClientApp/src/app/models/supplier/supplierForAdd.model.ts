export class SupplierForAdd {
  public name: string;
  public description: string;
  public phoneNumber: number;
  public address: string;

  constructor(
    name?: string,
    description?: string,
    phoneNumber?: number,
    address?: string
  ) {
    this.name = name;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}

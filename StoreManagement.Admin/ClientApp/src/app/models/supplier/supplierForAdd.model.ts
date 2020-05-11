export class SupplierForAdd {
  public name: string;
  public description: string;
  public phoneNumber: string;
  public address: string;

  constructor(
    name?: string,
    description?: string,
    phonenumber?: string,
    address?: string
  ) {
    this.name = name;
    this.description = description;
    this.phoneNumber = phonenumber;
    this.address = address;
  }
}

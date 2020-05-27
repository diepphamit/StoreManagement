export class SupplierForEdit {
  public id: number;
  public name: string;
  public description: string;
  public phoneNumber: number;
  public address: string;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    phoneNumber?: number,
    address?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}

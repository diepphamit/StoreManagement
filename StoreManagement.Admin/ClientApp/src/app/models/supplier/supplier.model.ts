export class Supplier {
    public id: number;
    public name: string;
    public description: string;
    public phoneNumber: string;
    public address: string;


    constructor(id?: number, name?: string, description?: string, phonenumber?: string, address?: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.phoneNumber = phonenumber;
      this.address = address;

    }
  }

  export class SupplierForList {
    public id: number;
    public name: string;
    public description: string;
    public phoneNumber: string;
    public address: string;

    constructor(id?: number, name?: string, description?: string, phoneNumber?: string, address?: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.phoneNumber = phoneNumber;
      this.address = address;
    }
  }

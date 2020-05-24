export class BranchForEdit {
    public id: number;
    public description: string;
    public phoneNumber: number;
    public address: string;


    constructor(id?: number, description?: string, phoneNumber?: number, address?: string) {
      this.id = id;
      this.description = description;
      this.phoneNumber = phoneNumber;
      this.address = address;

    }
  }

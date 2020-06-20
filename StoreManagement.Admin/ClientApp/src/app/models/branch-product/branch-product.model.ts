export class BranchProduct {
    public id: number;
    public quantity: number;
    public productName: string;
    public branchDescription: string;

    constructor(id?: number, quantity?: number, productName?: string, branchDescription?: string) {
      this.id = id;
      this.quantity = quantity;
      this.productName = productName;
      this.branchDescription = branchDescription;

    }
  }

  export class BranchProductForList {
    public id: number;
    public quantity: number;
    public productName: string;
    public branchDescription: string;

    constructor(id?: number, quantity?: number, productName?: string, branchDescription?: string) {
      this.id = id;
      this.quantity = quantity;
      this.productName = productName;
      this.branchDescription = branchDescription;

    }
  }



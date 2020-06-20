export class BranchProductForAdd {

    public quantity: number;
    public productId: number;
    public brachId: number;

    constructor( quantity?: number, productId?: number, branchId?: number) {

      this.quantity = quantity;
      this.productId = productId;
      this.brachId = branchId;

    }
  }

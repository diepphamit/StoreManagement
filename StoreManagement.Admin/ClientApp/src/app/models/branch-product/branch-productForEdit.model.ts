export class BranchProductForEdit {

    public quantity: number;
    public productId: number;
    public brachId: number;

    constructor( quantity?: number, productId?: number, brachId?: number) {

      this.quantity = quantity;
      this.productId = productId;
      this.brachId = brachId;

    }
  }

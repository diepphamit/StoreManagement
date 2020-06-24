export class OrderAdd {
  public staffId: number;
  public customerId: number;
  public status: boolean;
  public code: number;
  public orderDetail: ProductOrder[];
  public branchId: number;

  constructor(staffId?: number, customerId?: number, branchId?: number, status?: boolean, code?: number, orderDetail?: ProductOrder[]) {
    this.staffId = staffId;
    this.customerId = customerId;
    this.branchId = branchId;
    this.status = status;
    this.code = code;
    this.orderDetail = orderDetail;

  }
}

export class ProductOrder {
  public productId: number;
  public quantity: number;

  constructor(producId?: number, quantity?: number){
    this.productId = producId;
    this.quantity = quantity;
  }
}
